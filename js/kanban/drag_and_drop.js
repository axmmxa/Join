let currentDraggedElement;

function getUserTasks() {
  for (let i = 0; i < users.length; i++) {
    const currentUser = users[i];

    if (currentUser.email == loggedInUser.email) {
      return currentUser.tasks;
    }
  }
}

async function updateHTML() {
  // console.log("updateHTML function");
  let user_task_array = getUserTasks();

  if (loggedInUser.name == "Guest") {
    user_task_array = loggedInUser.tasks;
  }

  await generateTask(user_task_array, "todo");
  await generateTask(user_task_array, "in-progress");
  await generateTask(user_task_array, "await-feedback");
  await generateTask(user_task_array, "done");

  loadAndStoreCorrectColor(user_task_array);
}

/**
 * load correct color for users icon
 *
 * @param {array} user_task_array - array of all users information
 */

function loadAndStoreCorrectColor(user_task_array) {
  let correctCategory;
  let correctId;

  for (let i = 0; i < user_task_array.length; i++) {
    let currentTaskTopic = document.querySelectorAll(".task-topic");
    correctId = i;
    correctCategory = currentTaskTopic[i].textContent;
    getCategoryColor(correctCategory, correctId);
  }

  localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  loadBoardContactBackgroundColor();
}

/**
 * generate task for the kanban board
 *
 * @param {array} user_task_array - array of all users information
 * @param {string} status - task category
 */

async function generateTask(user_task_array, status) {
  let task = user_task_array.filter((t) => t["status"] == status);

  document.getElementById(status).innerHTML = "";
  document.getElementById(status).innerHTML += `
        <div class="flex">
        <h4 class="board-task-title">${getStatusTitle(status)}</h4>
        <img onclick="renderSmallAddTask()" class="board-task-img" src="kanban_img/plus_icons/plus_button.png">
        </div>
        `;

  for (let index = 0; index < task.length; index++) {
    const element = task[index];

    document.getElementById(status).innerHTML += generateTodoHTML(element);
    addUserIcons(element);
  }
  await saveUsersArray();
}

function generateTodoHTML(element) {
  return `
      <div id="added-task-${element.id_task}" draggable="true" ondragstart="startDragging(${element.id_task})" onclick="renderBoardTaskInfo(${element.id_task})" class="added-task">
      <span class="task-topic white-text">${element.category}</span>
      <h4 class="task-headline blue-text">${element.title}</h4>
      <span class="light-gray added-text">${element.description}</span>
      
      <!--
      <div class="progress">
          <div class="progress-bar"></div> <span class="addTask-amount"><span>0</span>/<span>${element.subtask.length}</span> Done</span>
      </div>
      -->
  
      <div class="board-user-img-container">
          <div id="assigned-contact-${element.id_task}" class="user-tasks">
              
          </div>
          
          <img src="${element.priority_img_path}" class="priority-img">
          
      </div>
      `;
}

/**
 * get the titles for the task container
 *
 * @param {string} status - task category
 * @returns
 */

function getStatusTitle(status) {
  if (status == "todo") {
    return "To do";
  } else if (status == "in-progress") {
    return "In Progress";
  } else if (status == "await-feedback") {
    return "Await Feedback";
  } else if (status == "done") {
    return "Done";
  }
}

/**
 * add user icons
 *
 * @param {object} element -task json object
 */

function addUserIcons(element) {
  let assignedContacts = document.querySelector(
    `#assigned-contact-${element.id_task}`
  );
  for (let i = 0; i < element.assignedContacts.length; i++) {
    const contact = element.assignedContacts[i];
    if (i == 1 && window.innerWidth > 874) {
      assignedContacts.innerHTML += `<div>
         <span class="user-icon blue">+${
           element.assignedContacts.length - 1
         }</span>  
        </div>`;
      break;
    } else {
      assignedContacts.innerHTML += `<div>
        <span id="${contact}" class="user-icon">${getUserIcon(contact)}</span>  
       </div>`;
    }
  }
}

/**
 * drag function from w3schools
 *
 * @param {integer} id_task - number for dragged task
 */

async function startDragging(id_task) {
  if (loggedInUser.name !== "Guest") {
    for (let i = 0; i < users.length; i++) {
      const currentUser = users[i];
      if (currentUser.email == loggedInUser.email) {
        currentDraggedElement = await getIndexOfIdTask(currentUser, id_task);
      }
    }
  } else {
    currentDraggedElement = await getIndexOfIdTask(loggedInUser, id_task);
  }
  // console.log(currentDraggedElement);
}

function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * drag and drop function from w3schools to move the task at the board
 *
 * @param {string} status - task category
 */

async function moveTo(status) {
  let user_task_array = getUserTasks();

  if (loggedInUser.name == "Guest") {
    user_task_array = loggedInUser.tasks;
  }

  user_task_array[currentDraggedElement]["status"] = status; // status will change
  await updateHTML();
}
