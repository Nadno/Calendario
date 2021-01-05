!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r,a=(r="cronos",{find:function(){var e=localStorage.getItem(r);return Object.assign({daily:[],lastConnection:{month:0,day:0}},e?function(e){try{return JSON.parse(e)}catch(e){return null}}(e):{})},save:function(e){localStorage.setItem(r,function(e){try{return JSON.stringify(e)}catch(e){return null}}(e))}}),o=function(){return{setTaskMarks:function(){this.getMonth().daysWithTasks.length&&this.getMonth().daysWithTasks.forEach((function(e){var t=document.getElementById(String(e));t.classList.add("c-calendar__has-task"),t.title="Há tarefas para este dia"}))},setDaysWithTasks:function(){var e=this.date.selected.day;this.getMonth().daysWithTasks.push(e)},unsetDaysWithTasks:function(){var e=this.date.selected.day,t=this.getMonth().daysWithTasks;t.splice(t.indexOf(e),1)},updateTask:function(e,t,n){this.selected[e]&&(this.selected[e][t]=n,this.save())},createTask:function(e){if(!this.selected.length&&0!==this.date.selected.day)return this.selected.push({text:e,checked:!1}),this.setDaysWithTasks(),this.save(),this.setTaskMarks();this.selected.push({text:e,checked:!1}),this.save()},deleteTask:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;this.selected.splice(e,t),this.selected.length||this.unsetDaysWithTasks(),this.save()},resetDailyTasks:function(e){e.forEach((function(e){return e.checked=!1,e}))}}};function c(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var c,i=e[Symbol.iterator]();!(r=(c=i.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw o}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return i(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var s=function(e,t,n){var r=document.createElement(e);r.innerText=t;var a=Object.entries(n);if(!a)return r;return a.forEach((function(e){var t=c(e,2),n=t[0],a=t[1];return r[n]=a})),r},u=s,l=function(e,t){var n=e.text,r=e.checked,a="todoAt-".concat(t),o=s("li","",{className:"c-todo"}),c=s("label","",{htmlFor:a}),i=s("input","",{className:"c-todo__input",type:"checkbox",id:a,checked:r}),u=s("div",n,{className:"c-todo__content",contentEditable:!0});return o.appendChild(i),o.appendChild(c),o.appendChild(u),o},d=function(e,t,n){var r=e.type,a=e.title,o=e.body,c=e.alert,i=e.day,u=e.week_day,l=n.actual,d=n.DAY_NAME,f=s("li","",{className:"c-notify ".concat(r||null," on-screen")}),h=s("div",a,{className:"c-notify__header"}),y=s("span","X",{id:"eventAt-".concat(t),className:"delete-button"});h.appendChild(y);var v='\n    <div class="c-notify__info">\n      '.concat(l.day===i?"Evento do dia!":"Evento para ".concat(d[u],", dia ").concat(i)," </br>\n      ").concat(c?"":"Finalizado!","\n    </div>\n  "),p='\n    <div class="c-notify__body">'.concat(o,"</div>\n  ");return f.appendChild(h),f.insertAdjacentHTML("beforeend",v),f.insertAdjacentHTML("beforeend",p),f},f=function(){return{createEvent:function(e){var t=e.title,n=e.body,r=e.week_day,a=this.date.selected,o=a.day,c=a.month;o&&(this.selected.push({title:t,body:n,day:o,week_day:r,month:c,alert:!0,type:"event"}),this.save())},createError:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Ocorreu um erro";return{type:"error",title:t,body:e,alert:{to:date.getDate()},time:"".concat(date.getHours(),":").concat(date.getMinutes())}},deleteNotify:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;this.selected.splice(e,t),this.save()},checkEventsForToday:function(){var e=this,t=this.date.actual,n=t.month,r=t.day;this.getMonth().events.forEach((function(t,a){!0===t.alert&&t.month===n&&t.day<=r&&(document.querySelector(".notifications").appendChild(d(t,a,e.date)),t.alert=!1)})),document.querySelector(".notifications").addEventListener("click",(function(e){e.stopPropagation(),"delete-button"===e.target.className&&e.target.parentNode.parentNode.remove()}))}}};function h(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var c,i=e[Symbol.iterator]();!(r=(c=i.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw o}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return y(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return y(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var v=function(){return{getWeekDay:function(e,t,n){return new Date(e,t,n).getDay()},createDayElement:function(e){var t=e.day,n=e.month,r=e.week_day,a=document.createElement("li"),o=u("button",t,{id:t,type:"button",className:n});return o.addEventListener("click",this.menu.update(t,r)),a.appendChild(o),a},calendarGenerator:function(){var e=this;this.element.innerHTML="";var t=this.date,n=t.selected,r=t.actual,a=t.MONTH_NAME,o=t.monthTotalDays;e.title.innerHTML=a[n.month];var c=function(t,r){for(var a=t.from,o=t.to,c={lastMonth:function(t){return e.element.innerHTML+='<li class="c-calendar__last-month">'.concat(t,"</li>")},thisMonth:function(t){return e.element.appendChild(e.createDayElement({day:t,month:"c-calendar__this-month",week_day:e.getWeekDay(n.year,n.month,t)}))}},i=a;i<=o;i++)c[r](i)};if(n.week_day>0){var i=0===n.month?11:n.month-1,s=o(n.year,i);c({from:s-n.week_day+1,to:s},"lastMonth")}c({from:1,to:n.total_days},"thisMonth");r.month===n.month&&r.year===n.year&&document.getElementById(r.day).classList.add("today")},setSelectYearAndMonthEvent:function(){var e=this,t=function(){var t=h(e.selectDate.value.split("-"),2),n=t[0],r=t[1],a=Number(r)-1;e.date.setSelectedDate(n,a),e.restart()},n=function(n){({"next-step":function(){return e.selectDate.stepUp()},"back-step":function(){return e.selectDate.stepDown()}})[n.target.id](),t()};this.selectDate.addEventListener("change",t),this.nextStep.addEventListener("click",n),this.backStep.addEventListener("click",n)}}};function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(Object(n),!0).forEach((function(t){b(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function b(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var g=function(){var e=a.find();return{calendar:m(m(m(m({selected:[],element:document.querySelector("#calendar"),title:document.querySelector("#month-name"),selectDate:document.querySelector("#date"),nextStep:document.querySelector("#next-step"),backStep:document.querySelector("#back-step"),save:function(){a.save(e)},selectTask:function(){var t=this.date.selected,n=t.day,r=t.month,a=t.year;0!==n?(this.checkIfDayExists(),this.selected=e[a][r].tasks[n]):this.selected=e.daily},selectEvent:function(){var t=this.date.selected,n=t.month,r=t.year;this.checkIfHasEvents(),this.selected=e[r][n].events},getMonth:function(){var t=this.date.selected,n=t.year,r=t.month;return e[n][r]},checkTaskDay:function(){var t=this.date.selected,n=t.day,r=t.month,a=t.year;0!==n&&this.selected&&!this.selected.length&&delete e[a][r].tasks[n]},setLastConnection:function(t){var n=t.day,r=t.month;Object.assign(e.lastConnection,{day:n,month:r})},getLastConnection:function(){return{day:e.lastConnection.day,month:e.lastConnection.month}},checkIfHasEvents:function(){var t,n=this.date.selected,r=n.year,a=n.month;(null===(t=e[r])||void 0===t?void 0:t[a].events)||(e[r][a].events=[])},checkIfDayExists:function(){var t,n=this.date.selected,r=n.year,a=n.month,o=n.day;(null===(t=e[r][a].tasks)||void 0===t?void 0:t[o])||Object.assign(e[r][a].tasks,b({},o,[]))},checkIfMonthExists:function(){var t=this.date.selected,n=t.year,r=t.month;e[n][r]||Object.assign(e[n],b({},r,{daysWithTasks:[],events:[],tasks:{}}))},checkIfYearExists:function(){var t=this.date.selected.year;e[t]||Object.assign(e,b({},t,{}))}},o()),f()),v()),{},{newDay:function(){this.resetDailyTasks(e.daily),this.setLastConnection(this.date.actual),this.checkEventsForToday(),this.save()},start:function(){this.checkIfYearExists(),this.checkIfMonthExists(),this.calendarGenerator(),this.setTaskMarks(),this.setSelectYearAndMonthEvent()},restart:function(){this.checkIfYearExists(),this.checkIfMonthExists(),this.calendarGenerator(),this.setTaskMarks()}})}},O=function(){return{setInitialYearAndMonth:function(e,t){var n=document.querySelector("#date"),r=t>=10?t+1:"0".concat(t+1);n.value="".concat(e,"-").concat(r),n.min="".concat(e-5,"-0",1),n.max="".concat(e+5,"-0",1)},setSelectedDate:function(e,t){var n=new Date(e,t,1);Object.assign(this.selected,{day:0,month:n.getMonth(),year:n.getFullYear(),week_day:n.getDay(),total_days:this.monthTotalDays(n.getFullYear(),n.getMonth())})},setActualDate:function(){var e=new Date;Object.assign(this.actual,{day:e.getDate(),month:e.getMonth(),year:e.getFullYear(),week_day:e.getDay()})},start:function(){var e=this.actual;this.setActualDate(),this.setSelectedDate(e.year,e.month),this.setInitialYearAndMonth(e.year,e.month)},monthTotalDays:function(e,t){if(1===t)return e%4==0?29:28;return[3,5,8,10].includes(t)?30:31}}};function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function j(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(Object(n),!0).forEach((function(t){E(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function E(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var S=function(){var e=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],t=["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"],n={day:0,month:0,year:0,week_day:0,total_days:0},r={day:0,month:0,year:0,week_day:0};return Object.freeze(t),Object.freeze(e),Object.preventExtensions(r),Object.preventExtensions(n),Object.preventExtensions({date:j({selected:n,actual:r,DAY_NAME:t,MONTH_NAME:e},O())})};function D(e){if((t=e.getBoundingClientRect()).top>0&&t.bottom<document.querySelector(".l-menu__list").getBoundingClientRect().bottom)return e.classList.add("on-screen");var t}var w=function(){return{render:function(){var e=this.calendar,t=this.date,n=this.list,r=this.eventsOn?d:l;this.eventsOn?e.selectEvent():e.selectTask(),n.innerHTML=e.selected.length?"":'<div class="alert">Nada encontrado!</div>';e.selected.forEach((function(e,a){n.appendChild(r(e,a,t))}));var a=Array.from(n.childNodes),o=function(){return a.forEach(D)};o(),n.addEventListener("scroll",o)}}};function T(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function M(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?T(Object(n),!0).forEach((function(t){_(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):T(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function _(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function P(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var c,i=e[Symbol.iterator]();!(r=(c=i.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw o}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return A(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return A(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function A(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var L=function(e){return P(e.querySelector("input").id.split("-"),2)[1]},N=function(){return M(M({},w()),{},{setMenuDateTo:function(e){if(!e)return this.dateTitle.innerHTML="";this.dateTitle.setAttribute("datetime","".concat(this.date[e].year,"-").concat(this.date[e].month+1,"-").concat(this.date[e].day)),this.dateTitle.innerHTML="<strong>\n      ".concat(this.date.DAY_NAME[this.date[e].week_day],", \n      ").concat(this.date[e].day," de \n      ").concat(this.date.MONTH_NAME[this.date[e].month],"\n    </strong>")},setTitle:function(e){this.title.innerHTML=e},active:function(e){return e?this.element.classList.add("on"):this.element.classList.remove("on")},createItem:function(e){var t=e.body,n=e.title;if(this.eventsOn){var r=this.date.selected.week_day;this.calendar.createEvent({title:n,body:t,week_day:r})}else this.calendar.createTask(t);this.render()},changeContent:function(){var e=this;return function(t){t.stopPropagation();var n=t.target;if("c-todo__content"!==n.className)throw new Error("Elemento inesperado");var r,a,o=String(n.textContent).trim();if(!o)return r=n.parentNode,a=L(n.parentNode),r.remove(),e.list.childNodes.forEach((function(e,t){var n="todoAt-".concat(t),r=e.querySelector("input"),a=e.querySelector("label");r.id=n,a.htmlFor=n})),e.calendar.deleteTask(a),void e.calendar.selectTask();e.calendar.updateTask(L(n.parentNode),"text",o)}},setEvents:function(){var e=this,t=this.list,n=this.events,r=this.createItemForm,a=this.mobileMenu;t.addEventListener("change",(function(t){var n=t.target;return e.calendar.updateTask(L(n.parentNode),"checked",n.checked)})),t.addEventListener("click",(function(t){t.stopPropagation();var n=t.target;"delete-button"===n.className&&(e.calendar.deleteNotify(P(n.id.split("-"),2)[1]),e.calendar.selectEvent(),e.render())})),t.addEventListener("focusout",this.changeContent());n.addEventListener("change",(function(t){var n=t.target;e.eventsOn=n.checked,n.checked?(document.querySelector(".event__config").classList.add("active"),e.calendar.selectEvent(),e.setTitle("Eventos:"),e.render()):(document.querySelector(".event__config").classList.remove("active"),e.calendar.selectTask(),e.render())}));r.submit.addEventListener("click",(function(){var t=r.body,n=r.title;t()&&e.createItem({body:t(),title:n()})}));var o=!1;a.addEventListener("click",(function(){o=!o,a.style.backgroundColor=o?"red":"#60cdff",a.innerHTML=o?"Fechar":"Menu",e.active(o)}))}})};function x(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function I(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?x(Object(n),!0).forEach((function(t){C(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):x(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function C(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var q=function(){return{menu:I(I({element:document.querySelector(".l-menu"),dateTitle:document.querySelector("#selected__day"),list:document.querySelector(".l-menu__list"),title:document.querySelector("#task-title"),events:document.querySelector("#event"),createItemForm:{title:function(){return document.querySelector("#title").value},body:function(){return document.querySelector("#body").value},submit:document.querySelector("#create")},mobileMenu:document.querySelector("#mobile-menu"),eventsOn:!1},N()),{},{update:function(e,t){var n=this,r=function(e){return document.getElementById(e)},a=this.date.selected;if(!(e<0||e>a.total_days))return function(){var o={SAME_DAY:function(e){r(e).classList.remove("selected"),a.day=0,n.setTitle("Tarefas diárias:"),n.setMenuDateTo("")},DAY:function(e,t){r(e).classList.add("selected"),Object.assign(a,{day:e,week_day:t}),n.setTitle("Tarefas:"),n.setMenuDateTo("selected")}};a.day&&(n.eventsOn||n.calendar.checkTaskDay(),r(a.day).classList.remove("selected")),o[a.day===e?"SAME_DAY":"DAY"](e,t),n.eventsOn||n.render()}},start:function(){this.setEvents(),this.render()}})}};function H(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Y(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?H(Object(n),!0).forEach((function(t){F(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):H(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function F(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var W=function(){return Y(Y(Y(Y({},g()),S()),q()),{},{setDependencies:function(){var e=this.calendar,t=this.menu,n=this.date;e.date=n,e.menu=t,t.date=n,t.calendar=e},isNewDay:function(){var e=this.calendar.getLastConnection(),t=e.day,n=e.month,r=this.date.actual;return t!==r.day||n!==r.month},start:function(){var e=this.calendar,t=this.menu,n=this.date;this.setDependencies(),n.start(),e.start(),this.isNewDay()&&this.calendar.newDay(),t.start()}})};n(0);W().start()}]);