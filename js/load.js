setURL('https://gruppe-319.developerakademie.net/smallest_backend_ever')

let todos = []
let users = [];
// let tasks = [];
let selected_options = [] //asigned contacts
let selected_category;
let selected_priority;
let selected_subtasks = []
let loggedInUser;
// let id = 0;
let currentContact = [];

let contact_names = []
let contact_emails = []
let contact_phones = []

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];

    let loggedInUserAsText = JSON.stringify(users);
    localStorage.setItem("users", loggedInUserAsText);

    console.log(users)
    loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))
    
    for (let i = 0; i < users.length; i++) {
      const currentUser = users[i];

      if(currentUser.email == loggedInUser.email){
          for (let j = 0; j < currentUser.tasks.length; j++) {
            todos.push(currentUser.tasks[j])
          }
      }
  }

  
  updateHTML()

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

 function saveLoggedInUser() {
  let loggedInUserAsText = JSON.stringify(loggedInUser);
  localStorage.setItem("loggedInUser", loggedInUserAsText);
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

function getCategoryColor() {
  let task_topics = document.querySelectorAll(".task-topic")
  task_topics.forEach(task_topic => {
    let category_color = ["orange","pink","turquoise","blue","yellow"]
    let random_color = category_color[Math.floor(Math.random() * 5)]
    task_topic.classList.add(random_color)
  })
}

function getUserColor() {
  let user_icons = document.querySelectorAll(".user-icon")
  user_icons.forEach(user_icon => {
    let user_color = ["orange","red","pink","lightblue","purple","green","darkred","darkpurple"]
    let random_color = user_color[Math.floor(Math.random() * 7)]
    user_icon.classList.add(random_color)
  })
}

function getUserIcon(contact) {
  let names = contact.split(" ");
  let firstLetterFirstName = names[0][0];
  let firstLetterlastName = names[1][0];

  return `${firstLetterFirstName + firstLetterlastName}`
}






