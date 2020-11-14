export default function(Notify) {
  Notify.calendar.daily.map(task => {
    task.checked = false;
    return task;
  });
}