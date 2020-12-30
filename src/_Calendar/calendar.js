import element from "./elements";

import { createDay } from "../createElement";

import date from "../date";
import calendar from "../calendar";

const render = ({ from, to }, renderDay) => {
  for (let day = from; day <= to; day++) {
    renderDay(day);
  }
};

function getWeekDay(year, month, day) {
  return new Date(year, month, day).getDay();
}

const lastMonth = (day) => {
  element.calendar.self.innerHTML += `<li class="last__month">${day}</li>`;
};
const thisMonth = (day) => {
  element.calendar.self.appendChild(
    createDay({
      day,
      month: "this__month",
      week_day: getWeekDay(date.selected.year, date.selected.month, day),
    })
  );
};

const setMonth = (month) =>
  (element.calendar.title.innerHTML = date.MONTH_NAME[month]);
const setToday = (day) => document.getElementById(day).classList.add("today");
const backOneMonth = (month) => (month === 0 ? 11 : month - 1);

export default function calendarGenerator() {
  element.calendar.self.innerHTML = "";
  const selected = date.selected;

  setMonth(selected.month);

  const HAS_LAST_MONTH = selected.week_day > 0;
  if (HAS_LAST_MONTH) {
    const lastMonthTotalDays = date.monthTotalDays(
      selected.year,
      backOneMonth(selected.month)
    );
    const firstVisibleDay = lastMonthTotalDays - selected.week_day + 1;
    render(
      {
        from: firstVisibleDay,
        to: lastMonthTotalDays,
      },
      lastMonth
    );
  }

  render(
    {
      from: 1,
      to: selected.total_days,
    },
    thisMonth
  );

  const actual = date.actual;
  const today =
    actual.month === selected.month && actual.year === selected.year;
  if (today) setToday(actual.day);
  calendar.setMarks();
}
