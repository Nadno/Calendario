const notify = () => ({
  setDaysWithEvents() {
    const { day } = this.date.selected;

    if (this.getMonth().daysWithEvents.includes(day)) return;
    this.getMonth().daysWithEvents.push(day);

    // POSSIBILITAR DUAS MARCAÇÕES DENTRO DOS DIAS, TALVEZ AJUDE A SEPARAR A MARCAÇÃO DE TASKS E EVENTOS
  },

  unsetDaysWithEvents() {
    const { day } = this.date.selected;
    const daysWithEvents = this.getMonth().daysWithEvents;

    daysWithEvents.splice(daysWithEvents.indexOf(day), 1);
  },

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

    if (this.selected.length === 1) return this.setDaysWithEvents();
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
    if (!this.selected.length) this.unsetDaysWithEvents();
  },
});

export default notify;
