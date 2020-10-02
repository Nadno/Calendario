import renderElement from "../render";

import { monthTotalDays } from "../utils/date";
import { getDate, setDate } from "../date";
import { Day } from "../elements";

const calendarElement = renderElement("ul.days");

const renderLastMonth = (total_days, week_day) => {
  if (week_day === 0) return;
  const LAST_MONTH = "last__month";
  const firstWeekDay = total_days - week_day + 1;

  for (let day = firstWeekDay; day <= total_days; day++) {
    const li = `<li class="${LAST_MONTH}">${day}</li>`;
    calendarElement.renderForInnerHTML(li);
  }
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
    calendarElement.renderForAppendChild(
      Day({ day, month: THIS_MONTH, week_day: indexWeekDay })
    );
    indexWeekDay = nextWeekDay(indexWeekDay);
  }
};

const setMonth = (month) =>
  (document.querySelector("div.month__name").innerHTML = month);
const setToday = (day) => document.getElementById(day).classList.add("today");

const calendarGenerator = ({ actual, selected }) => {
  const month = getDate("MONTH_NAME")[selected.month];
  setDate("month", selected.month);
  setDate("year", selected.year);

  setMonth(month);

  calendarElement.clear();
  const lastMonthTotalDays = monthTotalDays(selected.year, selected.month - 1);
  renderLastMonth(lastMonthTotalDays, selected.week_day);

  const selectedMonthTotalDays = monthTotalDays(selected.year, selected.month);
  renderThisMonth(selectedMonthTotalDays, selected.week_day);

  const isToday =
    actual.month === selected.month && actual.year === selected.year;

  if (isToday) setToday(actual.day);
};

export default calendarGenerator;
