const HTMLCALENDAR = 'ul.days';

export const CalendarOnClick = () => {
  const calendar = document.querySelector(HTMLCALENDAR);
  return calendar.onclick = ({ target }) => {
    const day = Number(target.id);
    if (day <= 0 || day > 31) return;

    console.log(day);
  };
};