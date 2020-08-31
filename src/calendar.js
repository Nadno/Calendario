import Element from "./element";
import calendarGenerator, { monthTotalDays } from "./Date";

const element = new Element();

const HTMLCALENDAR = "ul.days";

const renderLastMonth = (total_days, week_day) => {
  if (week_day === 0) return;

  const firstWeekDay = total_days - week_day + 1;

  for (let day = firstWeekDay; day <= total_days; day++) {
    element
      .create({
        name: "li",
        className: "last__month",
        content: day,
      })
      .render(HTMLCALENDAR);
  }
};

const renderThisMonth = (totalDays) => {
  for (let day = 1; day <= totalDays; day++) {
    element
      .create({
        name: "li",
        className: "this__month",
        content: day,
        id: day,
      })
      .render(HTMLCALENDAR);
  }
};

const actualDate = (isToday, day) => {
  if (isToday) return document.getElementById(day).classList.add("today");
};

const calendar = () => {
  const monthName = [
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
  const { actual, selected } = calendarGenerator();

  const selectedMonthTotalDays = monthTotalDays(selected.year, selected.month);
  const lastMonthTotalDays = monthTotalDays(selected.year, selected.month - 1);

  renderLastMonth(lastMonthTotalDays, selected.week_day);
  renderThisMonth(selectedMonthTotalDays);

  actualDate(
    actual.month === selected.month && 
    actual.year === selected.year,
    actual.day
  );
  console.log(monthName[selected.month]);
};

export default calendar;
