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

let BackgroundColorForBoard = {}
let BackgroundColorForBoardTaskInfo = {}
let BackgroundColorForContactBook = {}
let BackgroundColorForEditContact = {}

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];

    loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))
    
    if (loggedInUser.name == "Guest") {
      document.querySelector(".user-logout-icon-container").innerHTML = `<div onclick="toggleLogoutBox()" class="user-logout-icon">${getUserIcon(loggedInUser.name)}</div>`
      document.querySelector(".user-logout-icon").classList.add(loggedInUser["user-background-color"])
    } else {
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

  if (document.getElementById("summary-body")) {
    loadLoggedInUser()
    updateSummary()
    selectedLink("kanban-link-0")
    selectedLink("kanban-link-5")
  } 
  if (document.getElementById("board-body")) {
    updateHTML()
    loadBoardContactBackgroundColor()
    selectedLink("kanban-link-1")
    selectedLink("kanban-link-6")
  } if (document.getElementById("addTask-body")) {
    selectedLink("kanban-link-2")
    selectedLink("kanban-link-6")
    
    let custom_select_contact_container = document.querySelector(".custom-select-contact-container")
    custom_select_contact_container.innerHTML += `<label class="custom-select-option"> ${loggedInUser.name} (You) <input onclick="returnSelectedContacts(this)" value="${loggedInUser.name}" class="selected-option" type="checkbox" autocomplete="off"></label>`

  } if (document.getElementById("contacts-body")) {
    renderContactBook()
    loadContactBackgroundColor()
    selectedLink("kanban-link-3")
    selectedLink("kanban-link-8")
  } if (document.getElementById("legal-notice-body")) {
    selectedLink("kanban-link-4")
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

async function saveEditedContact(contact_email, contact_name) {
  let small_edit_contacts_name = document.getElementById("small-edit-contacts-name").value
  let small_edit_contacts_email = document.getElementById("small-edit-contacts-email").value
  let small_edit_contacts_phone = document.getElementById("small-edit-contacts-phone").value

  for (let i = 0; i < users.length; i++) {
    const currentUsers = users[i];
  for (let k = 0; k < currentUsers.tasks.length; k++) {
    const currentContact = currentUsers.tasks[k];
    for (let l = 0; l < currentContact.assignedContacts.length; l++) {
      if (currentContact.assignedContacts[l] == contact_name) {
        currentContact.assignedContacts[l] == small_edit_contacts_name
      }
    }
  }  

  if (loggedInUser.name !== "Guest") { 
  for (let i = 0; i < users.length; i++) {
    const currentUsers = users[i];
    for (let j = 0; j < currentUsers.contacts.length; j++) {
      const currentContact = currentUsers.contacts[j];
      if (currentContact.contact_email == contact_email) {
          currentContact.contact_name = small_edit_contacts_name
          currentContact.contact_email = small_edit_contacts_email
          currentContact.contact_phone = small_edit_contacts_phone
          saveUsersArray()   
          document.querySelector(".contacts-left").innerHTML = ""
          document.querySelector(".contacts-right").innerHTML = 
            `<div id='contact-information'></div>
            <button onclick="renderSmallContacts()" class="add-person-btn">New Contact 
            <img class='add-person-img' src="kanban_img/add_icons/add_person.png">
            </button>
            `
          renderContactBook()
          loadContactBackgroundColor() 
      }
    } 
  }  
} else {
  for (let i = 0; i < users.length; i++) {
    const currentUsers = users[i];
  for (let k = 0; k < currentUsers.tasks.length; k++) {
    const currentContact = currentUsers.tasks[k];
    for (let l = 0; l < currentContact.assignedContacts.length; l++) {
      if (currentContact.assignedContacts[l] == contact_name) {
        currentContact.assignedContacts[l] == small_edit_contacts_name
      }
    }
  }
 

  for (let j = 0; j < loggedInUser.contacts.length; j++) {
    const currentContact = loggedInUser.contacts[j];
    if (currentContact.contact_email == contact_email) {
        currentContact.contact_name = small_edit_contacts_name
        currentContact.contact_email = small_edit_contacts_email
        currentContact.contact_phone = small_edit_contacts_phone
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        document.querySelector(".contacts-left").innerHTML = ""
        document.querySelector(".contacts-right").innerHTML = 
        `
        <div id='contact-information'></div>
        <button onclick="renderSmallContacts()" class="add-person-btn">New Contact 
        <img class='add-person-img' src="kanban_img/add_icons/add_person.png">
        </button>
        `
        renderContactBook() 
        loadContactBackgroundColor() 
    }
  }
  }
 } 
}
}


function addSelectContactOption(index) {
  let add_contact_input = document.getElementById("add-contact-input").value
  let custom_select_contact_container = document.querySelectorAll(".custom-select-contact-container")

  if (loggedInUser.name !== "Guest") {
    for (let i = 0; i < users.length; i++) {
      const currentUser = users[i];
      if(currentUser.email == loggedInUser.email) {
          for (let j = 0; j < currentUser.contacts.length; j++) {
            const currentContact = currentUser.contacts[j];
            if (currentContact.contact_email == add_contact_input) {
              custom_select_contact_container[index].innerHTML += `<label class="custom-select-option"> ${currentContact.contact_name} <input onclick="returnSelectedContacts(this)" value="${currentContact.contact_name}" class="selected-option" type="checkbox" autocomplete="off"></label>`
            } 
          }
      }
    }
  } else {
    for (let i = 0; i < loggedInUser.contacts.length; i++) {
      const currentContact = loggedInUser.contacts[i];   
      if (currentContact.contact_email == add_contact_input)
      custom_select_contact_container.innerHTML += `<label class="custom-select-option"> ${currentContact.contact_name} <input onclick="returnSelectedContacts(this)" value="${currentContact.contact_name}" class="selected-option" type="checkbox" autocomplete="off"></label>`
    }
  }
  
}


function getCategoryColor(category, id_task) {
  
  let task_topics = document.querySelectorAll(".task-topic")
  
  switch(category) {
    case "Backoffice": 
      task_topics[id_task].classList.add("turquoise")
      break;
    case "Sales":
      task_topics[id_task].classList.add("pink")
      break;
    case "Media":
      task_topics[id_task].classList.add("yellow")
      break;
    case "Design":
      task_topics[id_task].classList.add("orange")
      break;
    case "Marketing":
      task_topics[id_task].classList.add("blue")
      break;
    } 
  }

function getUserColor() {
    let user_color = ["orange","red","pink","lightblue","purple","green","darkred","darkpurple"]
   
    if (loggedInUser.name !== "Guest") {
      for (let i = 0; i < users.length; i++) {
        const currentUser = users[i];
        if(currentUser.email == loggedInUser.email) {
            for (let j = 0; j < currentUser.contacts.length; j++) {
              const currentContact = currentUser.contacts[j];
              if (currentContact["contact-background-color"] == "") {
                let random_color_1 = user_color[Math.floor(Math.random() * 7)]
                currentContact["contact-background-color"] = random_color_1
              }
            }
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
} else {
      let random_color_1 = user_color[Math.floor(Math.random() * 7)]
      loggedInUser.contacts["contact-background-color"] = random_color_1
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

      for (let j = 0; j < loggedInUser.contacts.length; j++) {
      const currentContact = loggedInUser.contacts[j];
      if (currentContact["contact-background-color"] == "") {
      let random_color_1 = user_color[Math.floor(Math.random() * 7)]
      currentContact["contact-background-color"] = random_color_1
    }
   }
  }
}  


async function loadBoardContactBackgroundColor() {
  if (loggedInUser.name !== "Guest") {
  await downloadFromServer();
  users = JSON.parse(backend.getItem('users')) || [];
  let user_icons = document.querySelectorAll(".user-icon")
  let correctColor;
  
  for (let i = 0; i < users.length; i++) {
      const currentUser = users[i];
      if (currentUser.email == loggedInUser.email) {
          for (let j = 0; j < user_icons.length; j++) {
            for (let k = 0; k < currentUser.contacts.length; k++) {
              const currentContact = currentUser.contacts[k];
              BackgroundColorForBoard[currentContact.contact_name] = currentContact["contact-background-color"]
            }
            for (let [key, value] of Object.entries(BackgroundColorForBoard)) {
              if (key == user_icons[j].id) {
                correctColor = value
              }
            }
            user_icons[j].classList.add(correctColor)

            if (user_icons[j].id == currentUser.name) {
              user_icons[j].classList.add(currentUser["user-background-color"])
            }

          }
      }
    }
  } else {
      let user_icons = document.querySelectorAll(".user-icon")
      let correctColor;

      for (let j = 0; j < user_icons.length; j++) {
        for (let k = 0; k < loggedInUser.contacts.length; k++) {
          const currentContact = loggedInUser.contacts[k];
          BackgroundColorForBoard[currentContact.contact_name] = currentContact["contact-background-color"]
        }
        for (let [key, value] of Object.entries(BackgroundColorForBoard)) {
          if (key == user_icons[j].id) {
            correctColor = value
          }
        }
        user_icons[j].classList.add(correctColor)

        if (user_icons[j].id == "Guest") {
          user_icons[j].classList.add(loggedInUser["user-background-color"])
        }
      }
  }
}


async function loadContactBackgroundColor() {
  if (loggedInUser.name !== "Guest") {
  await downloadFromServer();
  users = JSON.parse(backend.getItem('users')) || [];
  let user_icons = document.querySelectorAll(".user-icon")
  let correctColor

  for (let i = 0; i < users.length; i++) {
      const currentUser = users[i];
      if (currentUser.email == loggedInUser.email) {
        for (let j = 0; j < user_icons.length; j++) {
          for (let k = 0; k < currentUser.contacts.length; k++) {
            const currentContact = currentUser.contacts[k];
            BackgroundColorForContactBook[currentContact.contact_name] = currentContact["contact-background-color"]
          }
          for (let [key, value] of Object.entries(BackgroundColorForContactBook)) {
            if (key == user_icons[j].id) {
              correctColor = value
            }
          }
          user_icons[j].classList.add(correctColor)
      }
    }
  }
} else {
  let user_icons = document.querySelectorAll(".user-icon")
  let correctColor

  for (let j = 0; j < user_icons.length; j++) {
    for (let k = 0; k < loggedInUser.contacts.length; k++) {
      const currentContact = loggedInUser.contacts[k];
      BackgroundColorForContactBook[currentContact.contact_name] = currentContact["contact-background-color"]
    }
    for (let [key, value] of Object.entries(BackgroundColorForContactBook)) {
      if (key == user_icons[j].id) {
        correctColor = value
      }
    }
    user_icons[j].classList.add(correctColor)
  }
}
  
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getUserIcon(contact) {
  let names = contact.split(" ");
  let firstLetterFirstName = names[0][0].toUpperCase();
  let firstLetterlastName;
  if (names.length > 1) {
    let firstLetterlastName = names[1][0].toUpperCase()
    return `${firstLetterFirstName + firstLetterlastName}`
  } else {
    return `${firstLetterFirstName}`
  }
  
}




