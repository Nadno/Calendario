import createElement from "../createElement";

const setCalendarRender = () => ({
  getWeekDay(year, month, day) {
    return new Date(year, month, day).getDay();
  },

  createDayElement({ day, month, week_day }) {
    const li = document.createElement("li");
    const button = createElement("button", day, {
      id: day,
      type: "button",
      className: month,
    });

    button.addEventListener("click", this.menu.update(day, week_day));

    li.appendChild(button);

    return li;
  },

  calendarGenerator() {
    this.element.innerHTML = "";

    const { selected, actual, MONTH_NAME, monthTotalDays } = this.date;

    const setMonth = () => (this.title.innerHTML = MONTH_NAME[selected.month]);
    setMonth();

    const render = ({ from, to }, dayType) => {
      const dayElements = {
        lastMonth: (day) =>
          (this.element.innerHTML += `<li class="last__month">${day}</li>`),

        thisMonth: (day) =>
          this.element.appendChild(
            this.createDayElement({
              day,
              month: "this__month",
              week_day: this.getWeekDay(selected.year, selected.month, day),
            })
          ),
      };

      for (let day = from; day <= to; day++) {
        dayElements[dayType](day);
      }
    };

    const HAS_LAST_MONTH = selected.week_day > 0;
    if (HAS_LAST_MONTH) {
      const lastMonth = selected.month === 0 ? 11 : selected.month - 1;
      const lastMonthTotalDays = monthTotalDays(selected.year, lastMonth);

      const firstVisibleDay = lastMonthTotalDays - selected.week_day + 1;
      render(
        {
          from: firstVisibleDay,
          to: lastMonthTotalDays,
        },
        "lastMonth"
      );
    }

    render(
      {
        from: 1,
        to: selected.total_days,
      },
      "thisMonth"
    );

    const today =
      actual.month === selected.month && actual.year === selected.year;
    const setToday = () =>
      document.getElementById(actual.day).classList.add("today");
    if (today) setToday();
    this.setMarks();
  },

  setSelectYearAndMonthEvent() {
    const changeSelect = () => {
      this.date.setSelectedDate(
        this.yearOption.value,
        this.monthOption.value
      );
      this.restart();
    };

    this.monthOption.addEventListener("change", changeSelect);
    this.yearOption.addEventListener("change", changeSelect);
  },
});

export default setCalendarRender;
