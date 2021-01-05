const task = () => ({
  setTaskMarks() {
    if (!this.getMonth().daysWithTasks.length) return;

    this.getMonth().daysWithTasks.forEach((day) => {
      const dayElement = document.getElementById(String(day));
      dayElement.classList.add("c-calendar__has-task");
      dayElement.title = "Há tarefas para este dia";
    });
  },

  setDaysWithTasks() {
    const { day } = this.date.selected;
    this.getMonth().daysWithTasks.push(day);
  },

  unsetDaysWithTasks() {
    const { day } = this.date.selected;
    const daysWithTasks = this.getMonth().daysWithTasks;

    daysWithTasks.splice(daysWithTasks.indexOf(day), 1);
  },

  updateTask(position, item, value) {
    if (this.selected[position]) {
      this.selected[position][item] = value;
      this.save();
    }
  },

  createTask(text) {
    if (!this.selected.length && this.date.selected.day !== 0) {
      this.selected.push({ text, checked: false });
      this.setDaysWithTasks();
      this.save();

      return this.setTaskMarks();
    }

    this.selected.push({ text, checked: false });
    this.save();
  },

  deleteTask(from, to = 1) {
    this.selected.splice(from, to);
    if (!this.selected.length) this.unsetDaysWithTasks();

    this.save();
  },

  resetDailyTasks(daily) {
    daily.forEach((task) => {
      task.checked = false;
      return task;
    });
  },
});

export default task;
