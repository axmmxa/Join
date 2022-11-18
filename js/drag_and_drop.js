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
  console.log("updateHTML function");

  let user_task_array = getUserTasks();

  if (loggedInUser.name == "Guest") {
    user_task_array = loggedInUser.tasks;
  }

  console.log(user_task_array);

  //container with category todo

  todoTask(user_task_array);
  //container with category In progress
  let inProgress = user_task_array.filter((t) => t["status"] == "in-progress");

  document.getElementById("in-progress").innerHTML = "";
  document.getElementById("in-progress").innerHTML += `
        <div class="flex">
        <h4 class="board-task-title">In Progress</h4>
        <img onclick="renderSmallAddTask()" class="board-task-img" src="kanban_img/plus_icons/plus_button.png">
        </div>
        `;

  for (let index = 0; index < inProgress.length; index++) {
    const element = inProgress[index];

    document.getElementById("in-progress").innerHTML +=
      generateTodoHTML(element);

    addUserIcons(element);
  }

  //container with category Await Feedback
  let awaitFeedback = user_task_array.filter(
    (t) => t["status"] == "await-feedback"
  );

  document.getElementById("await-feedback").innerHTML = "";
  document.getElementById("await-feedback").innerHTML += `
        <div class="flex">
        <h4 class="board-task-title">Await Feedback</h4>
        <img onclick="renderSmallAddTask()" class="board-task-img" src="kanban_img/plus_icons/plus_button.png">
        </div>
        `;

  for (let index = 0; index < awaitFeedback.length; index++) {
    const element = awaitFeedback[index];

    document.getElementById("await-feedback").innerHTML +=
      generateTodoHTML(element);

    addUserIcons(element);
  }

  //container with category done
  let done = user_task_array.filter((t) => t["status"] == "done");

  document.getElementById("done").innerHTML = "";
  document.getElementById("done").innerHTML += `
        <div class="flex">
        <h4 class="board-task-title">Done</h4>
        <img onclick="renderSmallAddTask()" class="board-task-img" src="kanban_img/plus_icons/plus_button.png">
        </div>
        `;

  for (let index = 0; index < done.length; index++) {
    const element = done[index];
    console.log(element);

    document.getElementById("done").innerHTML += generateTodoHTML(element);

    addUserIcons(element);
  }

  let correctCategory;
  let correctId;

  for (let i = 0; i < user_task_array.length; i++) {
    const currentTask = user_task_array[i];
    correctId = currentTask.id_task;
    correctCategory = currentTask.category;
    getCategoryColor(correctCategory, correctId);
  }

  localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  loadBoardContactBackgroundColor();
}

function generateTodoHTML(element) {
  // ${JSON.stringify(element).split('"').join("&quot;")}
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

function todoTask(user_task_array) {
  let todo = user_task_array.filter((t) => t["status"] == "todo");

  document.getElementById("todo").innerHTML = "";
  document.getElementById("todo").innerHTML += `
        <div class="flex">
        <h4 class="board-task-title">To do</h4>
        <img onclick="renderSmallAddTask()" class="board-task-img" src="kanban_img/plus_icons/plus_button.png">
        </div>
        `;

  for (let index = 0; index < todo.length; index++) {
    const element = todo[index];

    document.getElementById("todo").innerHTML += generateTodoHTML(element);
    addUserIcons(element);
  }
}

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
                      <span id="${contact}" class="user-icon">${getUserIcon(
        contact
      )}</span>  
                  </div>`;
    }
  }
}

function startDragging(id_task) {
  currentDraggedElement = id_task;
  console.log(currentDraggedElement);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(status) {
  let user_task_array = getUserTasks();

  if (loggedInUser.name == "Guest") {
    user_task_array = loggedInUser.tasks;
  }

  user_task_array[currentDraggedElement]["status"] = status; // status will change
  updateHTML();
}
