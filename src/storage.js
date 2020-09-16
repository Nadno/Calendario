const parseJson = (save) => {
  console.log();
  try {
    return JSON.parse(save);
  } catch {
    return null;
  }
};

const stringifyObject = (data) => {
  console.log();
  try {
    return JSON.stringify(data);
  } catch {
    return null;
  }
};

class Storage {
  constructor() {
    this.calendarData = {
      daily: [],
    };
  }

  get(NAME) {
    const save = localStorage.getItem(NAME);
    if (save) {
      const data = parseJson(save);
      console.log(data);
      if (data) this.calendarData = data;
    }
    return this;
  }

  set(data) {
    data ? (this.calendarData = data) : null;
    return this;
  }

  getData() {
    return this.calendarData;
  }

  save() {
    localStorage.setItem("cronos", stringifyObject(this.calendarData));
    return this;
  }
}

export default new Storage();
