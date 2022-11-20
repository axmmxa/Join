setURL('https://gruppe-319.developerakademie.net/smallest_backend_ever')

let amount_task_urgent = 0;
let amount_to_do = 0;
let amount_in_progress = 0;
let amount_await_feedback = 0;
let amount_done = 0;

let todos = []
let users = [];
let selected_options = [] //asigned contacts
let selected_category;
let selected_priority;
let priority_img_path;
let selected_subtasks = []
let loggedInUser;
let currentContact = [];

let contact_names = []
let contact_emails = []
let contact_phones = []

let BackgroundColorForBoard = {}
let BackgroundColorForBoardTaskInfo = {}
let BackgroundColorForContactBook = {}
let BackgroundColorForEditContact = {}

let small_add_contacts_name;
let small_add_contacts_email;
let small_add_contacts_phone;

let small_edit_contacts_name;
let small_edit_contacts_email;
let small_edit_contacts_phone;


async function init() {
    await getUsersFromBackend()

    loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))
    
    if (loggedInUser.name == "Guest") {
      initGuestIcon()
   } else {
      initUserIcon()
    }

  if (document.getElementById("summary-body")) {
    initSummary()
  } 
  if (document.getElementById("board-body")) {
    initBoard()
  } 
  if (document.getElementById("addTask-body")) {
    initAddTask()
  } 
  if (document.getElementById("contacts-body")) {
    initContacts()
  } 
  if (document.getElementById("legal-notice-body")) {
    selectedLink("kanban-link-4")
  }
}

function initSummary() {
  loadLoggedInUser()
  updateSummary()
  selectedLink("kanban-link-0")
  selectedLink("kanban-link-5")
}

function initBoard() {
  updateHTML()
  loadBoardContactBackgroundColor()
  selectedLink("kanban-link-1")
  selectedLink("kanban-link-6")
}

function initAddTask() {
  selectedLink("kanban-link-2")
  selectedLink("kanban-link-6")
  let custom_select_contact_container = document.querySelector(".custom-select-contact-container")
  custom_select_contact_container.innerHTML += `<label class="custom-select-option"> ${loggedInUser.name} (You) <input onclick="returnSelectedContacts(this)" value="${loggedInUser.name}" class="selected-option" type="checkbox" autocomplete="off"></label>`
}

function initContacts() {
  renderContactBook()
  loadContactBackgroundColor()
  selectedLink("kanban-link-3")
  selectedLink("kanban-link-8")  
}

function initUserIcon() {
  for (let i = 0; i < users.length; i++) {
    const currentUser = users[i];

    if(currentUser.email == loggedInUser.email){
        document.querySelector(".user-logout-icon-container").innerHTML = `<div onclick="toggleLogoutBox()" class="user-logout-icon">${getUserIcon(currentUser.name)}</div>`
        getUserColor()
        document.querySelector(".user-logout-icon").classList.add(currentUser["user-background-color"])
        for (let j = 0; j < currentUser.tasks.length; j++) {
          todos.push(currentUser.tasks[j])
        }
      }
    }
}

function saveDependingOnUserName() {
  if (loggedInUser.name == "Guest") {
    saveLoggedInUser() 
  } else {
    saveUsersArray()
  }
}

function initGuestIcon() {
  document.querySelector(".user-logout-icon-container").innerHTML = `<div onclick="toggleLogoutBox()" class="user-logout-icon">${getUserIcon(loggedInUser.name)}</div>`
  document.querySelector(".user-logout-icon").classList.add(loggedInUser["user-background-color"])
}

async function getUsersFromBackend() {
  await downloadFromServer();
  users = JSON.parse(backend.getItem('users')) || [];
}

function saveLoggedInUser() {
  localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
}

async function saveUsersArray() {
  await backend.setItem('users', JSON.stringify(users));
}

async function deleteUsers() {
  await backend.deleteItem('users');
}

async function deleteIdTask() {
  await backend.deleteItem('id_task');
}

 function greetUser() {
  let user_name = document.getElementById("user-name")
  user_name.innerHTML = loggedInUser.name
 }

function loadLoggedInUser() {
  let loggedInUserAsText = localStorage.getItem("loggedInUser");

  if (loggedInUserAsText) {
      loggedInUser = JSON.parse(loggedInUserAsText)
  }
  if(document.getElementById("user-name")) {
    greetUser()
  }
}

function checkIfEditContactInputsNotEmpty() {
    return small_edit_contacts_name !== "" && small_add_contacts_email !== "" && small_add_contacts_phone !== ""
}

function checkUserExist(input_email) {
  for (let i = 0; i < users.length; i++) {
    const usersEmail = users[i].email;
    if (usersEmail == input_email) {
      return true;
    } else {
      return false;
    }
  }
  return false;
}