import renderElement from "../render";
import { createDay } from "../createElement";

import { monthTotalDays } from "../utils/date";
import { getDate } from "../date";

const calendarElement = renderElement("ul.days");

const lastMonth = (day) => {
  const LAST_MONTH = "last__month";
  calendarElement.renderForInnerHTML(`<li class="${LAST_MONTH}">${day}</li>`);
};

const render = ({ from, to }, renderDay) => {
  for (let day = from; day <= to; day++) {
    renderDay(day);
  }
};

const weekDay = (year, month) => {
  return (day) => new Date(year, month, day).getDay();
};

const thisMonth = (getWeekDay) => {
  const THIS_MONTH = "this__month";

  return (day) =>
    calendarElement.renderForAppendChild(
      createDay({ day, month: THIS_MONTH, week_day: getWeekDay(day) })
    );
};

const setMonth = (month) =>
  (document.querySelector("div.month__name").innerHTML = month);
const setToday = (day) => document.getElementById(day).classList.add("today");

const calendarGenerator = ({ actual, selected }) => {
  calendarElement.clear();

  const month = getDate("MONTH_NAME")[selected.month];
  setMonth(month);

  if (selected.week_day > 0) {
    const lastMonthTotalDays = monthTotalDays(
      selected.year,
      selected.month - 1
    );
    const lastMonthRest = lastMonthTotalDays - selected.week_day + 1;
    render(
      {
        from: lastMonthRest,
        to: lastMonthTotalDays,
      },
      lastMonth
    );
  }

  const selectedMonthTotalDays = monthTotalDays(selected.year, selected.month);
  render(
    {
      from: 1,
      to: selectedMonthTotalDays,
    },
    thisMonth(weekDay(selected.year, selected.month))
  );

  const isToday =
    actual.month === selected.month && actual.year === selected.year;
  if (isToday) setToday(actual.day);
};

export default calendarGenerator;
