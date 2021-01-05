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

const storage = (name) => {
  const find = () => {
    const save = localStorage.getItem(name);
    return Object.assign({
      daily: [],
      lastConnection: { month: 0, day: 0, },
    }, save ? parseJson(save) : {});
  }

  const save = (data) => {
    localStorage.setItem(name, stringifyObject(data));
  }

  return {
    find,
    save,
  }
}

export default storage("cronos");
