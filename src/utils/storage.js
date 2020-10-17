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
      events: [],
    }, save ? parseJson(save) : {});
  }

  set(data) {
    localStorage.setItem("cronos", stringifyObject(data));
    return this;
  }
}

export default new Storage();
