import { Slider, Flex, Typography, Radio, Collapse, Tabs, Button } from "antd";
import type { SliderSingleProps } from "antd";
import Search from "antd/es/transfer/search";
import { useEffect, useState } from "react";

const { Title, Link } = Typography;

const experience: SliderSingleProps["marks"] = {
  1: "1 год",
  7: "7 лет",
  25: "25+ лет",
};

const category: SliderSingleProps["marks"] = {
  0: "Рабочий",
  1: "Специалист",
  2: "Руководитель",
};

const age: SliderSingleProps["marks"] = {
  0: "0",
  18: "18",
  24: "24",
  35: "35",
  50: "50",
  65: "65+",
};

const Form1 = ({
  setSex,
  sex,
  setAge,
  setExperience,
}: {
  setSex(e: number): void;
  setAge(e: number): void;
  setExperience(e: number): void;
  sex: number;
}) => {
  return (
    <>
      <Title level={3}>Стаж</Title>
      <Slider
        marks={experience}
        step={1}
        defaultValue={0}
        max={25}
        onChange={(e) => {
          setExperience(e);
        }}
      />
      <Title level={3}>Категория</Title>
      <Slider
        marks={category}
        step={1}
        defaultValue={0}
        max={2}
        tooltip={{ open: false }}
      />
      <Title level={3}>Возраст</Title>
      <Slider
        marks={age}
        step={1}
        defaultValue={0}
        max={65}
        onChange={(e) => {
          setAge(e);
        }}
      />
      <Title level={3}>Пол</Title>
      <Radio.Group
        value={sex}
        onChange={(e) => {
          setSex(e.target.value);
        }}
      >
        <Radio value={1}>Мужчина</Radio>
        <Radio value={2}>Женщина</Radio>
      </Radio.Group>
    </>
  );
};

const App = () => {
  const [sex, setSex] = useState(1);
  const [experience, setExperience] = useState(0);
  const [age, setAge] = useState(0);
  const [selectedTab, setSelectedTab] = useState("1");
  const [value, setValue] = useState("");
  const [data, setData] = useState<
    {
      title: string;
      binefits: {
        id: number;
        title: string;
        description: string;
        sex_id: null | 1 | 2;
        sex_name: string | null;
        age: { id: number; from_age: number; to_age: number }[];
        experience: {
          id: number;
          from_experience: number;
          to_experience: number;
        }[];
      }[];
    }[]
  >([]);

  useEffect(() => {
    const get = async () => {
      const response = await fetch("https://tn.iva.nov.ru/categories");

      const result = await response.json();

      setData(result);
    };

    get();
  }, []);

  return (
    <Flex justify="center">
      <div style={{ maxWidth: "1240px", width: "100%", padding: "40px" }}>
        <Flex justify="flex-end">
          <Link href="https://forms.yandex.ru/" target="_blank">
            <Button color="primary" variant="dashed">
              Отзывы(актуальная ссылка будет добавлена позже)
            </Button>
          </Link>
        </Flex>
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: "1",
              label: "Фильтры",
              children: (
                <Form1
                  sex={sex}
                  setSex={setSex}
                  setAge={setAge}
                  setExperience={setExperience}
                />
              ),
            },
            {
              key: "2",
              label: "Поиск",
              children: (
                <>
                  <Title level={3}>Поиск</Title>{" "}
                  <Search
                    placeholder="Поиск"
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                  />
                </>
              ),
            },
          ]}
          onChange={(key) => {
            setSelectedTab(key);
          }}
        />

        {data
          .map((item) => {
            if (selectedTab === "2") {
              return {
                title: item.title,
                binefits: item.binefits.filter((item) => {
                  return (
                    item.title
                      .toLocaleLowerCase()
                      .includes(value.toLocaleLowerCase()) ||
                    item.description
                      .toLocaleLowerCase()
                      .includes(value.toLocaleLowerCase())
                  );
                }),
              };
            }

            return {
              title: item.title,
              binefits: item.binefits
                .filter((item) => {
                  return item.sex_id === sex || item.sex_id === null;
                })
                .filter((item) => {
                  return (
                    item.experience.length === 0 ||
                    item.experience.find((item) => {
                      return (
                        item.from_experience <= experience &&
                        item.to_experience >= experience
                      );
                    })
                  );
                })
                .filter((item) => {
                  return (
                    item.age.length === 0 ||
                    item.age.find((item) => {
                      return item.from_age <= age && item.to_age >= age;
                    })
                  );
                }),
            };
          })
          .filter((item) => {
            return item.binefits.length !== 0;
          })
          .map((item) => {
            return (
              <div key={item.title}>
                <Title level={3}>{item.title}</Title>
                <Collapse
                  items={item.binefits.map((binefit) => {
                    return {
                      key: binefit.title + binefit.description,
                      label: binefit.title,
                      children: <p>{binefit.description}</p>,
                    };
                  })}
                />
              </div>
            );
          })}
      </div>
    </Flex>
  );
};

export default App;
