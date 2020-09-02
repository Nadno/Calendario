import Element from "./element";
import calendarGenerator, { monthTotalDays } from "./Date";

const element = new Element();

const HTML_CALENDAR = "ul.days";
const HTML_CALENDAR_MONTH_NAME = "div.month__name";
const HTML_LIST_ITEM = "li";

const renderLastMonth = (total_days, week_day) => {
  if (week_day === 0) return;

  const LAST_MONTH = "last__month";
  const firstWeekDay = total_days - week_day + 1;

  for (let day = firstWeekDay; day <= total_days; day++) {
    element
      .create({
        name: HTML_LIST_ITEM,
        className: LAST_MONTH,
        content: day,
      })
      .renderOn(HTML_CALENDAR);
  };
};

const nextWeekDay = (indexWeekDay) => {
  let week_day = indexWeekDay + 1;
  if (week_day === 7) week_day = 0;
  return week_day;
};

const renderThisMonth = (totalDays, week_day) => {
  const THIS_MONTH = "this__month";
  let indexWeekDay = week_day;

  for (let day = 1; day <= totalDays; day++) {
    element
      .create({
        name: HTML_LIST_ITEM,
        className: THIS_MONTH,
        content: day,
        id: day,
        week_day: indexWeekDay,
      })
      .renderOn(HTML_CALENDAR);
      
      indexWeekDay = nextWeekDay(indexWeekDay);
  };
};

const actualDate = (isNow, day) => {
  if (isNow) { 
    const today = document.getElementById(day);
    return today.classList.add("today");
  }
};

const calendar = () => { 
  const MONTH_NAME = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const HTML_TITLE = "h2";

  const { actual, selected } = calendarGenerator({});
  const selectedMonthTotalDays = monthTotalDays(selected.year, selected.month);
  const lastMonthTotalDays = monthTotalDays(selected.year, selected.month - 1);

  element.create({
    name: HTML_TITLE,
    content: MONTH_NAME[selected.month],
  }).renderOn(HTML_CALENDAR_MONTH_NAME);
  
  renderLastMonth(lastMonthTotalDays, selected.week_day);
  renderThisMonth(selectedMonthTotalDays, selected.week_day);
  actualDate(
    actual.month === selected.month && 
    actual.year === selected.year,
    actual.day
  );
};

export default calendar;
