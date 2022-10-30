setURL('https://gruppe-319.developerakademie.net/smallest_backend_ever')


let users = [];
let tasks = [];
let selected_options = [] //asigned contacts
let selected_category;
let selected_priority;
let selected_subtasks = []
let loggedInUser;
let id = 0
let currentContact = [];

let contact_names = []
let contact_emails = []
let contact_phones = []

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    id = parseInt( localStorage.getItem("id"));
}
 
async function deleteUsers() {
  await backend.deleteItem('users');
}

async function deleteTasks() {
  await backend.deleteItem('tasks')
}

 function greetUser() {
  let user_name = document.getElementById("user-name")
  user_name.innerHTML = loggedInUser.name
 }

 function saveLoggedInUser() {
  let loggedInUserAsText = JSON.stringify(loggedInUser);
  localStorage.setItem("loggedInUser", loggedInUserAsText);
}

function loadLoggedInUser() {
  let loggedInUserAsText = localStorage.getItem("loggedInUser");

  if (loggedInUserAsText) {
      loggedInUser = JSON.parse(loggedInUserAsText)
      greetUser()
  }
}