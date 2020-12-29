import date from "./date";

const task = () => ({
  updateTask(position, item, value) {
    if (this.selected[position]) this.selected[position][item] = value;
  },

  createTask(text) {
    if (!this.selected.length) {
      this.selected.push({ text, checked: false });
      return this.setMarks();
    }
    this.selected.push({ text, checked: false });
  },

  deleteTask(from, to = 1) {
    this.selected.splice(from, to);
    if (!this.selected.length) return this.setMarks();
  },
});

export default task;
