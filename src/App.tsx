import React from 'react';
import './App.css';
import heroImage from './assets/hero-book-flag.jpg';
import StudioMap from './components/StudioMap';
import Gallery from './components/Gallery';
import ProfileCard from './components/ProfileCard';

const PROGRESS_STEPS = [
  { label: '2 класс' },
  { label: '9 класс' },
  { label: 'ОГЭ' },
];

const ABOUT_PARAGRAPHS = [
  'Я репетитор английского языка и работаю с детьми со 2 по 9 класс. Моя задача — не просто «пройти темы», а дать знания системно и уверенно: я вооружаю ребёнка всем необходимым, чтобы он спокойно справлялся с английским в школе и на экзаменах.',
  'При этом я не ограничиваюсь только школьной программой: даю материал расширенно и углублённо, развивая все языковые навыки — чтение, говорение, аудирование и письмо. Для этого использую не только учебник, но и разнообразные дополнительные материалы: современные обучающие интернет-ресурсы, сайты и приложения, специально подобранные для детей. Такой подход помогает ребёнку видеть английский живым, а не набором правил.',
  'Для младших классов и учеников среднего звена делаю упор на интерес и отсутствие страха: много практики, игровых заданий, простых диалогов. Для 9 класса выстраиваю подготовку к ОГЭ: тренируем устную часть, письмо, типовые задания и тайминг, чтобы на экзамене ребёнок не растерялся.',
  'Если запрос родителей на занятия строго по школьной программе: никаких «лишних» тем, только то, что реально пригодится на уроках и контрольных — в таком формате тоже работаем. При этом каждый навык прокачиваем отдельно и в связке — чтобы ребёнок умел и понимать, и говорить, и писать.',
];

const PROGRAM_STAGES = [
  {
    grades: '2–5 классы',
    text: 'Мягкое погружение в язык, обучение чтению, разбор первых страниц школьного учебника, закрепление грамматики через игру и диалоги. В сентябре ребёнок пойдёт на уроки без страха — он уже будет знать, чего ожидать.',
  },
  {
    grades: '6–8 классы',
    text: 'Систематизация знаний, проработка сложных тем, развитие навыков чтения, письма и аудирования. Убираем пробелы и делаем английский понятным.',
  },
  {
    grades: '9 класс',
    text: 'Подготовка к ОГЭ — разбор всех типов заданий, практика устной части, написание письма, работа над типичными ошибками, снятие экзаменационного стресса.',
  },
];

const SCHEDULE_ROWS = [
  {
    days: 'Пн — Чт',
    text: 'Утренние и дневные группы, время — с утра до 14:00',
  },
  {
    days: 'Пт — Вс',
    text: 'Группы полного дня — с утра и до вечера',
  },
];

const FORMATS = [
  { title: 'Групповые занятия', text: '60 минут, группа 2–5 человек' },
  { title: 'Индивидуальные занятия', text: '60 минут' },
  {
    title: 'Онлайн-уроки',
    text: 'Подходят, если ребёнок умеет читать и владеет базовым уровнем грамматики',
  },
];

const ONLINE_USE_CASES = [
  'повторить и отработать материал',
  'не потерять темп из-за пропуска занятия',
  'позаниматься, если ребёнок живёт далеко, уехал на каникулы или чувствует себя неважно',
  'не зависеть от погоды — например, когда на улице мороз и снег (мы в Сибири)',
];

const PRICING_ITEMS = [
  {
    title: 'Групповое занятие',
    price: '500 ₽',
    unit: '60 минут, группа 2–5 человек',
  },
  {
    title: 'Индивидуальное занятие',
    price: '1100 ₽',
    unit: '60 минут',
  },
  {
    title: 'Пробное занятие',
    price: 'Бесплатно',
    unit: 'проводится в августе',
  },
];

const PAYMENT_NOTE =
  'Оплата услуг производится безналичным переводом на карту Тинькофф. Исполнитель является самозанятым — после оплаты вы получите электронный чек.';

function App() {
  return (
    <div className="page">
      <section className="hero">
        <div
          className="hero-media"
          style={{ backgroundImage: `url(${heroImage})` }}
          role="img"
          aria-label="Ноутбук, флаг Великобритании и книга «Do you speak English?»"
        />

        <div className="hero-content">
        <p className="eyebrow">Репетитор английского языка · Новосибирск</p>

        <h1 className="headline">
          Английский для школьников<br/>2–9&nbsp;классов
          <span className="headline-accent"> — от первых слов до ОГЭ!</span>
        </h1>

        <div className="progress" aria-hidden="true">
          {PROGRESS_STEPS.map((step, i) => (
            <React.Fragment key={step.label}>
              <div className="progress-step">
                <span className="progress-dot" />
                <span className="progress-label">{step.label}</span>
              </div>
              {i < PROGRESS_STEPS.length - 1 && <span className="progress-line" />}
            </React.Fragment>
          ))}
        </div>

        <div className="details">
          <p className="detail-line">
            <span className="detail-label">Где</span>
            <span>Новосибирск, мкр. Дивногорский, ул. Романтиков, 18</span>
          </p>
          <p className="detail-line">
            <span className="detail-label">Когда</span>
            <span>Старт занятий — с 18 августа</span>
          </p>
          <p className="detail-line">
            <span className="detail-label">Первый шаг</span>
            <span>Пробное занятие — без стресса: нужно только хорошее настроение!</span>
          </p>
        </div>

        <a className="cta" href="#contact">
          Записаться на пробное занятие
        </a>
        </div>
      </section>

      <section className="info">
        <div className="info-inner">
          <div className="info-col">
            <p className="eyebrow eyebrow-center">О себе</p>
            <h2 className="section-heading">Мой подход</h2>
            {ABOUT_PARAGRAPHS.map((paragraph, i) => (
              <p className="section-paragraph" key={i}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="info-col">
            <p className="eyebrow eyebrow-center">Программа по классам</p>
            <h2 className="section-heading">Что получит ребёнок</h2>

            <div className="program-list">
              {PROGRAM_STAGES.map((stage) => (
                <div className="program-item" key={stage.grades}>
                  <p className="program-grades">{stage.grades}</p>
                  <p className="program-text">{stage.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pricing">
        <div className="pricing-inner">
          <p className="eyebrow eyebrow-center">Цены и условия</p>
          <h2 className="section-heading">Стоимость занятий</h2>

          <div className="pricing-grid">
            {PRICING_ITEMS.map((item) => (
              <div className="pricing-card" key={item.title}>
                <p className="pricing-price">{item.price}</p>
                <p className="pricing-title">{item.title}</p>
                <p className="pricing-unit">{item.unit}</p>
              </div>
            ))}
          </div>

          <p className="pricing-note">{PAYMENT_NOTE}</p>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-inner">
          <p className="eyebrow eyebrow-center">Расписание и запись</p>
          <h2 className="section-heading">Когда и как проходят занятия</h2>
          <p className="contact-lead">Занятия стартуют с 18 августа.</p>

          <div className="contact-columns">
            <div className="contact-col">
              <div className="contact-block">
                <h3 className="contact-subheading">
                  Расписание для микрорайона Дивногорский
                </h3>
                <div className="schedule-list">
                  {SCHEDULE_ROWS.map((row) => (
                    <p className="detail-line" key={row.days}>
                      <span className="detail-label">{row.days}</span>
                      <span>{row.text}</span>
                    </p>
                  ))}
                </div>
              </div>

              <div className="contact-block">
                <h3 className="contact-subheading">Форматы</h3>
                <div className="program-list">
                  {FORMATS.map((format) => (
                    <div className="program-item" key={format.title}>
                      <p className="program-grades">{format.title}</p>
                      <p className="program-text">{format.text}</p>
                    </div>
                  ))}
                </div>

                <p className="section-paragraph contact-note">
                  Онлайн-занятия особенно удобны, когда нужно:
                </p>
                <ul className="online-list">
                  {ONLINE_USE_CASES.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="section-paragraph contact-note">
                  Такой формат экономит время и помогает ребёнку не отставать
                  от группы: прогресс остаётся равномерным, а знания —
                  надёжными.
                </p>
              </div>
            </div>

            <div className="contact-col">
              <div className="contact-block">
                <h3 className="contact-subheading">Место проведения</h3>
                <p className="section-paragraph">
                  Микрорайон Дивногорский, ул. Романтиков, 18. Возможен выезд
                  к ученику в пределах удобного радиуса, а также
                  онлайн-формат.
                </p>
                <StudioMap />
              </div>

              <div className="contact-block">
                <p className="section-paragraph">
                  Расписание подстраиваем под вас: на первой встрече сразу
                  набросаем комфортный график на август и можем заранее
                  обсудить расписание на сентябрь, чтобы оно не конфликтовало
                  со школьным.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="profile-section">
        <div className="profile-inner">
          <ProfileCard />
        </div>
      </section>

      <section className="gallery-section">
        <div className="gallery-inner">
          <p className="eyebrow eyebrow-center">Занятия в фотографиях</p>
          <h2 className="section-heading">Как это выглядит</h2>
          <Gallery />
        </div>
      </section>
    </div>
  );
}

export default App;