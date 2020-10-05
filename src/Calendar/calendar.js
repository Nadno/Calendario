import element from "./elements";

import { createDay } from "../createElement";
import { monthTotalDays } from "../utils/date";
import { actual, selected, getDate } from "../date";

const render = ({ from, to }, renderDay) => {
  for (let day = from; day <= to; day++) {
    renderDay(day);
  }
};

const weekDay = (year, month) =>
  function getWeekDay(day) {
    return new Date(year, month, day).getDay();
  };

const lastMonth = (day) => {
  const LAST_MONTH = "last__month";
  element.calendar.self.innerHTML += `<li class="${LAST_MONTH}">${day}</li>`;
};

const thisMonth = (getWeekDay) => {
  const THIS_MONTH = "this__month";
  return (day) =>
    element.calendar.self.appendChild(
      createDay({
        day,
        month: THIS_MONTH,
        week_day: getWeekDay(day),
      })
    );
};

const setMonth = (month) => (element.calendar.title.innerHTML = month);
const setToday = (day) => document.getElementById(day).classList.add("today");

const YEAR = "year";
const MONTH = "month";

const calendarGenerator = () => {
  element.calendar.self.innerHTML = "";

  setMonth(getDate("MONTH_NAME")[selected.get(MONTH)]);

  if (selected.get("week_day") > 0) {
    const lastMonthTotalDays = monthTotalDays(
      selected.get(YEAR),
      selected.get(MONTH) - 1
    );
    const lastMonthRest = lastMonthTotalDays - selected.get("week_day") + 1;
    render(
      {
        from: lastMonthRest,
        to: lastMonthTotalDays,
      },
      lastMonth
    );
  }

  render(
    {
      from: 1,
      to: monthTotalDays(selected.get(YEAR), selected.get(MONTH)),
    },
    thisMonth(weekDay(selected.get(YEAR), selected.get(MONTH)))
  );

  const isToday =
    actual.get(MONTH) === selected.get(MONTH) && actual.get(YEAR) === selected.get(YEAR);
  if (isToday) setToday(actual.get("day"));
};

export default calendarGenerator;
