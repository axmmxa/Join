setURL('https://gruppe-319.developerakademie.net/smallest_backend_ever')

let amount_task_urgent = 0;
let amount_to_do = 0;
let amount_in_progress = 0;
let amount_await_feedback = 0;
let amount_done = 0;

let todos = []
let users = [];
// let tasks = [];
let selected_options = [] //asigned contacts
let selected_category;
let selected_priority;
let priority_img_path;
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

    loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))
    
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

  if (document.getElementById("board-body")) {
    updateHTML()
  } if (document.getElementById("contacts-body")) {
    renderContactBook()
    loadContactBackgroundColor()
  } if (document.getElementById("summary-body")) {
    loadLoggedInUser()
    updateSummary()
  }
  
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
    let user_color = ["orange","red","pink","lightblue","purple","green","darkred","darkpurple"]
   
        for (let i = 0; i < users.length; i++) {
          const currentUser = users[i];
          if(currentUser.email == loggedInUser.email && currentUser["contact-background-color"] == "") {
              for (let j = 0; j < currentUser.contacts.length; j++) {
                const currentContact = currentUser.contacts[j];
                let random_color_1 = user_color[Math.floor(Math.random() * 7)]
                currentContact["contact-background-color"] = random_color_1
                saveUsersArray()
              }
            
          }
      
      for (let i = 0; i < users.length; i++) {
        const currentUser = users[i];
        if(currentUser.email == loggedInUser.email && currentUser["user-background-color"] == ""){
          let random_color_2 = user_color[Math.floor(Math.random() * 7)]
          currentUser["user-background-color"] = random_color_2
          saveUsersArray()
      }
    }     
  }
}  


function getUserIcon(contact) {
  let names = contact.split(" ");
  let firstLetterFirstName = names[0][0];
  let firstLetterlastName = names[1][0];

  return `${firstLetterFirstName + firstLetterlastName}`
}




