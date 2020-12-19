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

const storage = () => {
  const find = (name) => {
    const save = localStorage.getItem(name);
    return Object.assign({
      daily: [],
      events: [],
      notifications: [],
      lastConnection: { month: 0, day: 0, },
    }, save ? parseJson(save) : {});
  }

  const save = (data) => {
    localStorage.setItem("cronos", stringifyObject(data));
  }

  return {
    find,
    save,
  }
}

export default storage();
