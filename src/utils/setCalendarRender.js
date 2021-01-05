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
          (this.element.innerHTML += `<li class="c-calendar__last-month">${day}</li>`),

        thisMonth: (day) =>
          this.element.appendChild(
            this.createDayElement({
              day,
              month: "c-calendar__this-month",
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
  },

  setSelectYearAndMonthEvent() {
    const changeSelect = () => {
      const [year, month] = this.selectDate.value.split("-");
      const formattedMonth = Number(month) - 1;
      this.date.setSelectedDate(year, formattedMonth);
      this.restart();
    };

    const changeStep = ({ target }) => {
      const step = {
        "next-step": () => this.selectDate.stepUp(),
        "back-step": () => this.selectDate.stepDown(),
      };

      step[target.id]();
      changeSelect();
    };

    this.selectDate.addEventListener("change", changeSelect);
    this.nextStep.addEventListener("click", changeStep);
    this.backStep.addEventListener("click", changeStep);
  },
});

export default setCalendarRender;
