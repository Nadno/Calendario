class Storage {
  constructor() {
    this.data;
  }

  save(data) {}

  delete(month, day, position) {}

  getStorage(year) {
    const save = JSON.parse(localStorage.getItem(year));
    if (save) this.data = save;

    this.data = {
      Daily: [],
    };
  }
};

export default Storage;