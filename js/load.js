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
  let task_topic = document.querySelectorAll(".task-topic")
  task_topic.forEach(task_topic => {
    let category_color = ["orange","pink","turquoise","blue","yellow"]
    let random_color = category_color[Math.floor(Math.random() * 5)]

    task_topic.classList.add(random_color)
  })
}

function getUserIcon(contact) {
  let colors = ["#FF7A00","#FF4646","#FC71FF","#29ABE2","#9327FF","#02CF2F","#CB02CF","#0223CF","#FFA800","#AF1616","#462F8A"]

  let names = contact.split(" ");
  let firstLetterFirstName = names[0][0];
  let firstLetterlastName = names[1][0];
  
  return `${firstLetterFirstName + firstLetterlastName}`
}


