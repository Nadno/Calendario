export default function(CalendarData) {
  CalendarData.calendar.daily.map(task => {
    task.checked = false;
    return task;
  });
}