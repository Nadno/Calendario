const task = () => ({
  updateTask(position, item, value) {
    if (this.selected[position]) {
      this.selected[position][item] = value;
      this.save();
    }
  },

  createTask(text) {
    if (!this.selected.length) {
      this.selected.push({ text, checked: false });
      this.save();
      return this.setMarks();
    }
    
    this.selected.push({ text, checked: false });
    this.save();
  },

  deleteTask(from, to = 1) {
    this.selected.splice(from, to);
    this.save();
    
    if (!this.selected.length) return this.setMarks();
  },
});

export default task;
