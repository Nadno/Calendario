const parseJson = (save) => {
  try {
    return JSON.parse(save);
  } catch {
    return null;
  }
};

const Storage = () => {
  let calendarData = {
    daily: [],
  };

  const getCalendarDataOnStorage = () => {
    const save = localStorage.getItem("Cronos");
    if (save) {
      data = parseJson(save);
      if (data) calendarData = data;
    }
  };

  const setCalendarData = (data) => {
    data ? (calendarData = data) : null;
  };

  const getCalendarData = () => {
    return calendarData;
  };

  const saveCalendarData = () => {
    localStorage.setItem("Cronos", calendarData);
  };

  return {
    getCalendarDataOnStorage,
    setCalendarData,
    getCalendarData,
    saveCalendarData,
  };
};

export default Storage;
