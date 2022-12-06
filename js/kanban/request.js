setURL("https://emir-salihovic.developerakademie.net/smallest_backend_ever");

let amount_task_urgent = 0;
let amount_to_do = 0;
let amount_in_progress = 0;
let amount_await_feedback = 0;
let amount_done = 0;

let todos = [];
let users = [];
let selected_options = []; //asigned contacts
let selected_category;
let selected_priority;
let priority_img_path;
let selected_subtasks = [];
let loggedInUser;
let currentContact = [];

let contact_names = [];
let contact_emails = [];
let contact_phones = [];

let BackgroundColorForBoard = {};
let BackgroundColorForBoardTaskInfo = {};
let BackgroundColorForContactBook = {};
let BackgroundColorForEditContact = {};

let small_add_contacts_name;
let small_add_contacts_email;
let small_add_contacts_phone;

let small_edit_contacts_name;
let small_edit_contacts_email;
let small_edit_contacts_phone;

async function init() {
  await getUsersFromBackend();

  loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedInUser.name == "Guest") {
    initGuestIcon();
  } else {
    initUserIcon();
  }

  if (document.getElementById("summary-body")) {
    initSummary();
  }
  if (document.getElementById("board-body")) {
    await initBoard();
  }
  if (document.getElementById("addTask-body")) {
    initAddTask();
  }
  if (document.getElementById("contacts-body")) {
    await initContacts();
  }
  if (document.getElementById("legal-notice-body")) {
    selectedLink("kanban-link-4");
  }
}

function initSummary() {
  loadLoggedInUser();
  updateSummary();
  selectedLink("kanban-link-0");
  selectedLink("kanban-link-5");
}

async function initBoard() {
  await updateHTML();
  loadBoardContactBackgroundColor();
  selectedLink("kanban-link-1");
  selectedLink("kanban-link-6");
}

function initAddTask() {
  selectedLink("kanban-link-2");
  selectedLink("kanban-link-6");
  let custom_select_contact_container = document.querySelector(
    ".custom-select-contact-container"
  );
  custom_select_contact_container.innerHTML += `<label class="custom-select-option"> ${loggedInUser.name} (You) <input onclick="returnSelectedContacts(this)" value="${loggedInUser.name}" class="selected-option" type="checkbox" autocomplete="off"></label>`;
}

async function initContacts() {
  renderContactBook();
  await loadContactBackgroundColor();
  selectedLink("kanban-link-3");
  selectedLink("kanban-link-8");
}

function initUserIcon() {
  for (let i = 0; i < users.length; i++) {
    const currentUser = users[i];

    if (currentUser.email == loggedInUser.email) {
      document.querySelector(
        ".user-logout-icon-container"
      ).innerHTML = `<div onclick="toggleLogoutBox()" class="user-logout-icon">${getUserIcon(
        currentUser.name
      )}</div>
          <div class="logout d-none">
          <span onclick="logout()" class="light-blue-text">Log out</span>
        </div>

        <div class="logout-mobile d-none">
          <a href="kanban_assets/help.html" class="light-blue-text">Help</a>
          <a href="kanban_assets/legal_notice.html" class="light-blue-text">Legal Notice</a>
          <a onclick="logout()" class="light-blue-text">Log out</a>
        </div>
        `;
      getUserColor();
      document
        .querySelector(".user-logout-icon")
        .classList.add(currentUser["user-background-color"]);
      for (let j = 0; j < currentUser.tasks.length; j++) {
        todos.push(currentUser.tasks[j]);
      }
    }
  }
}

async function saveDependingOnUserName() {
  if (loggedInUser.name == "Guest") {
    saveLoggedInUser();
  } else {
    await saveUsersArray();
  }
}

function initGuestIcon() {
  document.querySelector(".user-logout-icon-container").innerHTML = `<div onclick="toggleLogoutBox()" class="user-logout-icon">${getUserIcon(loggedInUser.name)}</div>
    <div class="logout d-none">
    <span onclick="logout()" class="light-blue-text">Log out</span>
    </div>

   <div class="logout-mobile d-none">
    <a href="kanban_assets/help.html" class="light-blue-text">Help</a>
    <a href="kanban_assets/legal_notice.html" class="light-blue-text">Legal Notice</a>
    <a onclick="logout()" class="light-blue-text">Log out</a>
   </div>
  `;
  document.querySelector(".user-logout-icon").classList.add(loggedInUser["user-background-color"]);
}

async function getUsersFromBackend() {
  await downloadFromServer();
  users = JSON.parse(backend.getItem("users")) || [];
}

function saveLoggedInUser() {
  localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
}

async function saveUsersArray() {
  await backend.setItem("users", JSON.stringify(users));
}

async function deleteUsers() {
  await backend.deleteItem("users");
}

async function deleteIdTask() {
  await backend.deleteItem("id_task");
}

function greetUser() {
  let user_name = document.getElementById("user-name");
  user_name.innerHTML = loggedInUser.name;
}

function loadLoggedInUser() {
  let loggedInUserAsText = localStorage.getItem("loggedInUser");

  if (loggedInUserAsText) {
    loggedInUser = JSON.parse(loggedInUserAsText);
  }
  if (document.getElementById("user-name")) {
    greetUser();
  }
}

function checkIfEditContactInputsNotEmpty() {
  return (
    small_edit_contacts_name !== "" &&
    small_add_contacts_email !== "" &&
    small_add_contacts_phone !== ""
  );
}

function checkUserEmailExist(input_email) {
  for (let i = 0; i < users.length; i++) {
    const usersEmail = users[i].email;
    if (usersEmail == input_email) {
      return true;
    }
  }
  return false;
}

function checkContactEmailExist(input_email, index) {
  let foundEmail;
  if (loggedInUser.name !== "Guest") {
    for (let i = 0; i < users.length; i++) {
      const currentUser = users[i];
      foundEmail = compareInputEmailAndEmailsFromDatabase(
        currentUser,
        input_email,
        index
      );
    }
  } else {
    foundEmail = compareInputEmailAndEmailsFromDatabase(
      loggedInUser,
      input_email,
      index
    );
  }
  return foundEmail;
}

function compareInputEmailAndEmailsFromDatabase(user, input_email, index) {
  for (let i = 0; i < user.contacts.length; i++) {
    const currentContactEmail = user.contacts[i].contact_email;
    if (currentContactEmail == input_email && index !== i) {
      return false;
    }
  }
  return true;
}

function addContactOptionToCustomSelectOption(id_task) {
  let custom_select_contact_container = document.querySelectorAll(
    ".custom-select-contact-container"
  );

  if (loggedInUser.name !== "Guest") {
    for (let i = 0; i < users.length; i++) {
      const currentUser = users[i];
      renderLabelContactOption(currentUser, custom_select_contact_container);
    }
    checkAssignedContactsInEditTask(id_task);
  } else {
    renderLabelContactOption(loggedInUser, custom_select_contact_container);
    checkAssignedContactsInEditTask(id_task);
  }
}

function renderLabelContactOption(user, custom_select_contact_container) {
  for (let j = 0; j < user.contacts.length; j++) {
    const currentContact = user.contacts[j];
    custom_select_contact_container[
      custom_select_contact_container.length - 1
    ].innerHTML += `<label class="custom-select-option"> ${currentContact.contact_name}<input onclick="returnSelectedContacts(this)" value="${currentContact.contact_name}" class="selected-option contact-option" type="checkbox" autocomplete="off"></label>`;
  }
}

function checkAssignedContactsInEditTask(id_task) {
  let assignedContactName;
  let selected_contact_option = document.querySelectorAll(".contact-option");
  if (loggedInUser.name !== "Guest") {
    for (let i = 0; i < users.length; i++) {
      const currentUser = users[i];
      checkContactsNameInEditTask(
        currentUser,
        assignedContactName,
        selected_contact_option,
        id_task
      );
    }
  } else {
    checkContactsNameInEditTask(
      loggedInUser,
      assignedContactName,
      selected_contact_option,
      id_task
    );
  }
}

function checkContactsNameInEditTask(
  user,
  assignedContactName,
  selected_contact_option,
  id_task
) {
  for (let j = 0; j < user.tasks.length; j++) {
    const currentTask = user.tasks[j];
    if (j == id_task) {
      for (let j = 0; j < currentTask.assignedContacts.length; j++) {
        assignedContactName = currentTask.assignedContacts[j];
        for (let k = 0; k < selected_contact_option.length; k++) {
          const currentContact = selected_contact_option[k].value;
          if (currentContact == assignedContactName) {
            selected_contact_option[k].checked = true;
          }
        }
      }
    }
  }
}

async function deleteTask(id_task) {
  console.log(users);
  if (loggedInUser.name !== "Guest") {
    for (let i = 0; i < users.length; i++) {
      const currentUser = users[i];
      id_task = await getIndexOfIdTask(currentUser, id_task);
      currentUser.tasks.splice(id_task, 1);
      await saveUsersArray();
    }
  } else {
    id_task = await getIndexOfIdTask(loggedInUser, id_task);
    loggedInUser.tasks.splice(id_task, 1);
    saveLoggedInUser();
  }
  closeBoardTaskInfo();
  await initBoard();
  // location.reload(true)
}

async function getIndexOfIdTask(user, id_task) {
  let id_array = [];
  let index;

  for (let j = 0; j < user.tasks.length; j++) {
    let id_tasks = user.tasks[j].id_task;
    id_array.push(id_tasks);
  }
  for (let k = 0; k < user.tasks.length; k++) {
    if (id_task == id_array[k]) {
      index = id_array.indexOf(id_array[k]);
      return index;
    }
  }
}


async function setIdTaskDependingOnUserName(id_task) {
  if (loggedInUser.name == "Guest") {
    id_task = await getIndexOfIdTask(loggedInUser, id_task)
  } else {
    for (let i = 0; i < users.length; i++) {
      const currentUser = users[i];
      if (currentUser.email == loggedInUser.email) {
        id_task = await getIndexOfIdTask(currentUser, id_task)
      }
    }
  }
  return id_task
}
