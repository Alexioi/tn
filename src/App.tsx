import { Slider, Flex, Typography, Radio, Collapse, Tabs, Button } from "antd";
import type { SliderSingleProps } from "antd";
import Search from "antd/es/transfer/search";
import { useState } from "react";

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

const data: {
  title: string;
  binefits: { title: string; description: string; sex?: 0 | 1 }[];
}[] = [
  {
    title: "Здоровье и забота",
    binefits: [
      {
        title: "ДМС от первого дня",
        sex: 0,
        description:
          "Полный пакет добровольного медицинского страхования для вас и вашей семьи с момента трудоустройства",
      },
      {
        title: "Фитнес-компенсация",
        sex: 1,
        description:
          "Возмещение расходов на абонементы в спортзалы, бассейны и йога-студии",
      },
      {
        title: "Здоровое питание",
        sex: 0,
        description:
          "Бесплатные обеды в офисе, фрукты и снеки, доставка полезных продуктов",
      },
    ],
  },
  {
    title: "Баланс работы и жизни",
    binefits: [
      {
        title: "Гибкий график",
        sex: 0,
        description:
          "Возможность выбирать удобное время начала и окончания рабочего дня",
      },
      {
        title: "Удалённая работа",
        sex: 0,
        description: "До 3 дней в неделю можно работать из любого места",
      },
      {
        title: "Дополнительные выходные",
        sex: 0,
        description:
          "5 оплачиваемых личных дней в год помимо основного отпуска",
      },
    ],
  },
  {
    title: "Развитие и рост",
    binefits: [
      {
        title: "Образовательный бюджет",
        description:
          "Ежегодная сумма на курсы, конференции, сертификации и профессиональное развитие",
      },
      {
        title: "Карьерные консультации",
        description:
          "Регулярные встречи с HR и руководителями для планирования карьерного роста",
      },
      {
        title: "Внутренние стажировки",
        description:
          "Возможность временно поработать в других отделах для расширения компетенций",
      },
    ],
  },
  {
    title: "Финансовое благополучие",
    binefits: [
      {
        title: "Премии за результаты",
        description: "Ежеквартальные бонусы за достижение KPI и годовая премия",
      },
      {
        title: "Реферальная программа",
        description:
          "Вознаграждение за рекомендацию кандидатов, которые успешно пройдут отбор",
      },
      {
        title: "Скидки от партнёров",
        description:
          "Специальные предложения на продукты и услуги компаний-партнёров",
      },
    ],
  },
  {
    title: "Корпоративная культура",
    binefits: [
      {
        title: "Командные мероприятия",
        description:
          "Регулярные тимбилдинги, корпоративы, спортивные турниры и культурные события",
      },
      {
        title: "Курортный отдых",
        description:
          "Частичная компенсация путёвок в санатории и дома отдыха для сотрудников и их семей",
      },
      {
        title: "Волонтёрские дни",
        description:
          "2 оплачиваемых дня в год для участия в социальных и благотворительных проектах",
      },
    ],
  },
];

const Form1 = ({ setSex, sex }: { setSex(e: number): void; sex: number }) => {
  return (
    <>
      <Title level={3}>Стаж</Title>
      <Slider marks={experience} step={1} defaultValue={0} max={25} />
      <Title level={3}>Категория</Title>
      <Slider
        marks={category}
        step={1}
        defaultValue={0}
        max={2}
        tooltip={{ open: false }}
      />
      <Title level={3}>Возраст</Title>
      <Slider marks={age} step={1} defaultValue={0} max={65} />
      <Title level={3}>Пол</Title>
      <Radio.Group
        value={sex}
        onChange={(e) => {
          setSex(e.target.value);
        }}
      >
        <Radio value={0}>Мужчина</Radio>
        <Radio value={1}>Женщина</Radio>
      </Radio.Group>
    </>
  );
};

const App = () => {
  const [sex, setSex] = useState(0);
  const [selectedTab, setSelectedTab] = useState("1");
  const [value, setValue] = useState("");

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
              children: <Form1 sex={sex} setSex={setSex} />,
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
              binefits: item.binefits.filter((item) => {
                return item.sex === sex || item.sex === undefined;
              }),
            };
          })
          .filter((item) => {
            return item.binefits.length !== 0;
          })
          .map((item) => {
            return (
              <>
                <Title level={3}>{item.title}</Title>
                <Collapse
                  items={item.binefits.map((binefit) => {
                    return {
                      key: binefit.title,
                      label: binefit.title,
                      children: <p>{binefit.description}</p>,
                    };
                  })}
                />
              </>
            );
          })}
      </div>
    </Flex>
  );
};

export default App;
