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

    if (this.selected.length === 1) return this.setMarks();
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
    if (!this.selected.length) {
      this.setMarks();
    }
  },
});

export default notify;
