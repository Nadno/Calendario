const parseJson = (save) => {
  try {
    return JSON.parse(save);
  } catch {
    return null;
  }
};

const stringifyObject = (data) => {
  try {
    return JSON.stringify(data);
  } catch {
    return null;
  }
};

class Storage {
  get(name) {
    const save = localStorage.getItem(name);
    return Object.assign({
      daily: [],
      events: {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
        10: [],
        11: [],
      },
    }, save ? parseJson(save) : {});
  }

  set(data) {
    localStorage.setItem("cronos", stringifyObject(data));
    return this;
  }
}

export default new Storage();
