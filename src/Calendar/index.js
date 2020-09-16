import renderElement from "../render";
import menuUpdate from "./actions";

import { monthTotalDays } from "./date";
import { getDate, setDate } from "..";

const calendarElement = renderElement("ul.days");

const renderLastMonth = (total_days, week_day) => {
  if (week_day === 0) return;
  const LAST_MONTH = "last__month";
  const firstWeekDay = total_days - week_day + 1;

  for (let day = firstWeekDay; day <= total_days; day++) {
    const element = `<li class="${LAST_MONTH}">${day}</li>`;
    calendarElement.renderForInnerHTML(element);
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
    const li = document.createElement("li");
    const button = document.createElement("button");

    button.id = day;
    button.type = "button";
    button.innerText = day;
    button.className = THIS_MONTH;
    button.dataset.week_day = indexWeekDay;
    button.addEventListener("click", menuUpdate);

    li.appendChild(button);
    calendarElement.renderForAppendChild(li);

    indexWeekDay = nextWeekDay(indexWeekDay);
  }
};

const actualDate = (isToday, day) => {
  if (isToday) {
    const today = document.getElementById(day);
    return today.classList.add("today");
  }
};

const calendarGenerator = ({ actual, selected }) => {
  const MONTH_NAME = getDate("MONTH_NAME")[selected.month];
  setDate("month", selected.month);
  setDate("year", selected.year);

  const monthName = document.querySelector("div.month__name");
  monthName.innerHTML = `${MONTH_NAME}`;

  calendarElement.clear();
  const lastMonthTotalDays = monthTotalDays(selected.year, selected.month - 1);
  renderLastMonth(lastMonthTotalDays, selected.week_day);

  const selectedMonthTotalDays = monthTotalDays(selected.year, selected.month);
  renderThisMonth(selectedMonthTotalDays, selected.week_day);

  actualDate(
    actual.month === selected.month && actual.year === selected.year,
    actual.day
  );
};

export default calendarGenerator;
