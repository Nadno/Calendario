import element from "./elements";

import { createDay } from "../createElement";
import { monthTotalDays } from "../utils/date";
import {
  actual,
  selected,
  nameOf,
  DAY,
  MONTH,
  YEAR,
  WEEK_DAY,
  TOTAL_DAYS,
} from "../date";

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
      week_day: getWeekDay(selected.get(YEAR), selected.get(MONTH), day),
    })
  );
};

const setMonth = () =>
  (element.calendar.title.innerHTML = nameOf.month(selected.get(MONTH)));
const setToday = (day) => document.getElementById(day).classList.add("today");
const backOneMonth = (month) => (month === 0 ? 11 : month - 1);

export default function () {
  element.calendar.self.innerHTML = "";

  setMonth();
  if (selected.get(WEEK_DAY) > 0) {
    const lastMonthTotalDays = monthTotalDays(
      selected.get(YEAR),
      backOneMonth(selected.get(MONTH))
    );

    render(
      {
        from: lastMonthTotalDays - selected.get(WEEK_DAY) + 1,
        to: lastMonthTotalDays,
      },
      lastMonth
    );
  }

  render(
    {
      from: 1,
      to: selected.get(TOTAL_DAYS),
    },
    thisMonth
  );

  const isToday =
    actual.get(MONTH) === selected.get(MONTH) &&
    actual.get(YEAR) === selected.get(YEAR);
  if (isToday) setToday(actual.get(DAY));
}
