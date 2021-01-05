import { createNotify } from "../createElement";

const notify = () => ({
  createEvent({ title, body, week_day }) {
    const { day, month } = this.date.selected;
    if (!day) return;

    this.selected.push({
      title,
      body,
      day,
      week_day,
      month,
      alert: true,
      type: "event",
    });
    this.save();
  },

  createError(body, title = "Ocorreu um erro") {
    return {
      type: "error",
      title,
      body,
      alert: {
        to: date.getDate(),
      },
      time: `${date.getHours()}:${date.getMinutes()}`,
    };
  },

  deleteNotify(from, to = 1) {
    this.selected.splice(from, to);
    this.save();
  },

  checkEventsForToday() {
    const { month, day } = this.date.actual;
    const events = this.getMonth().events;

    const showEventsForToday = (event, position) => {
      if (event.month === month && event.day === day) {
        document.querySelector(".notifications").appendChild(createNotify(event, position, this.date));
      };
    };

    events.forEach(showEventsForToday);

    document.querySelector(".notifications").addEventListener("click", (event) => {
      event.stopPropagation();
    
      const { target } = event;
      if (target.className !== "delete-button") return;
    
      event.target.parentNode.parentNode.remove();
    });
  },
});

export default notify;
