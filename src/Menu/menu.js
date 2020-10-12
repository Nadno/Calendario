import { getDate } from "../date";
import element from "../Calendar/elements";

import { createNotify, createTask } from "../createElement";

import "../utils/updateDate";

// export default function (Notify, Task) {
//   Task.get(renderOnMenu);

//   const Menu = {
    

//     create: {
//       todo: ({ body }) => Task.create(body()).save().get(renderOnMenu),
//       event: (content) =>
//         Notify.get().createEvent(content).save().get(renderOnMenu),
//     },

//     task: {
//       update: function (position, item, value) {
//         Task.update(position, item, value).save();
//       },

//       delete: function (from, to = 1) {
//         Task.delete(from, to).save().get(renderOnMenu);
//       },

//       changeContent: function (position) {
//         return function ({ target }) {
//           const text = String(target.textContent).trim();
//           if (!text) return Menu.task.delete(position);
//           Menu.task.update(position, "text", text);
//         };
//       },
//     },

//     notify: {
//       delete: function (position) {
//         return () => Notify.delete(position, 1).save().get(renderOnMenu);
//       },
//     },
//   };

//   function renderOnMenu(items, type) {
//     element.menu.list.innerHTML = items.length
//       ? ""
//       : '<div class="alert">Nada encontrado!</div>';
  
//     const createElement = {
//       task: createTask,
//       notify: createNotify,
//     };
//     const change = {
//       task: Menu.task.changeContent,
//       notify: Menu.notify.delete,
//     };
  
//     items.forEach((item, position) => {
//       element.menu.list.appendChild(
//         createElement[type](item, change[type](position), position)
//       );
//     });
//   }

//   return Menu;
// }

export default function (Notify, Task) {
  const Menu = {
    active: function (toggle) {
      if (toggle) return element.menu.self.classList.add("on");
      return element.menu.self.classList.remove("on");
    },

    setEvents: function () {
      element.menu.title.innerHTML = "";
      element.menu.taskTitle.innerHTML = "Eventos:";
      Notify.selectDate(getDate("selected")).get(console.log);
    },

    setDay: function () {
      const { day, week_day, month, year } = getDate("selected");
      const newFullDate = `${getDate("DAY_NAME")[week_day]}, ${day} de ${
        getDate("MONTH_NAME")[month]
      }`;

      element.menu.title.innerHTML = newFullDate;
      element.menu.taskTitle.innerHTML = "Tarefas:";
      Task.selectDate({ day, month, year }).get(renderOnMenu);
    },

    setDaily: function () {
      element.menu.title.innerHTML = "";
      element.menu.taskTitle.innerHTML = "Tarefas diárias:";
      Task.selectDate(getDate("selected")).get(renderOnMenu);
    },
    create: {
      todo: ({ body }) => Task.create(body()).save().get(renderOnMenu),
      event: (content) =>
        Notify.get().createEvent(content).save().get(renderOnMenu),
    },

    task: {
      update: function (position, item, value) {
        Task.update(position, item, value).save();
      },

      delete: function (from, to = 1) {
        Task.delete(from, to).save().get(renderOnMenu);
      },

      changeContent: function (position) {
        return function ({ target }) {
          const text = String(target.textContent).trim();
          if (!text) return Menu.task.delete(position);
          Menu.task.update(position, "text", text);
        };
      },
    },

    notify: {
      delete: function (position) {
        return () => Notify.delete(position, 1).save().get(renderOnMenu);
      },
    },
  };

  function renderOnMenu(items, type) {
    element.menu.list.innerHTML = items.length
      ? ""
      : '<div class="alert">Nada encontrado!</div>';
  
    const createElement = {
      task: createTask,
      notify: createNotify,
    };
    const change = {
      task: Menu.task.changeContent,
      notify: Menu.notify.delete,
    };
  
    items.forEach((item, position) => {
      element.menu.list.appendChild(
        createElement[type](item, change[type](position), position)
      );
    });
  }
  
  Task.get(renderOnMenu);
  return Menu;
}