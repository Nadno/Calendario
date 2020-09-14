import Menu from "./index";

const menu = Menu();

const createButton = document.getElementById('create-todo-button');
const mobileButton = document.getElementById('mobile-menu');

export const CreateToDoOnClick = (date) => {
  return (createButton.onclick = () => {
    const toDoText = document.getElementById('create-todo-input').value;
    if (!toDoText) return;
    menu.createToDo(toDoText, date);
  });
};

let activeMenu = false;

export const MobileMenu = (date) => {
  return (mobileButton.onclick = () => {
    const PRIMARY_COLOR = "#60cdff";
    const RED_COLOR = "red";
    
    activeMenu = !activeMenu;
    mobileButton.style.backgroundColor = activeMenu ? RED_COLOR : PRIMARY_COLOR ;
    menu.toggleMenu(activeMenu);
  });
};

export const CloseMenu = () => {
  const button = document.getElementById('close-menu');
  
  return button.onclick = () => {
    const PRIMARY_COLOR = "#60cdff";
    activeMenu = false;

    mobileButton.style.backgroundColor = PRIMARY_COLOR ;
    menu.toggleMenu(activeMenu);
  };
};