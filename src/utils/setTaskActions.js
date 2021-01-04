const task = () => ({
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
    if (!this.selected.length) {
      this.selected.push({ text, checked: false });
      this.setDaysWithTasks();
      // this.save();

      return this.resetMarks();
    }

    this.selected.push({ text, checked: false });
    this.save();
  },

  deleteTask(from, to = 1) {
    this.selected.splice(from, to);
    // this.save();

    if (!this.selected.length) return this.unsetDaysWithTasks();
  },

  resetDailyTasks(daily) {
    daily.forEach((task) => {
      task.checked = false;
      return task;
    });
  },
});

export default task;
