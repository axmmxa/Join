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

async function saveEditedContact(contact_email, contact_name, btn) {
    if (btn == 'mobile') {
      small_edit_contacts_name = document.getElementById("small-edit-contacts-name-mobile").value
      small_edit_contacts_email = document.getElementById("small-edit-contacts-email-mobile").value
      small_edit_contacts_phone = document.getElementById("small-edit-contacts-phone-mobile").value
    } else {
      small_edit_contacts_name = document.getElementById("small-edit-contacts-name").value
      small_edit_contacts_email = document.getElementById("small-edit-contacts-email").value
      small_edit_contacts_phone = document.getElementById("small-edit-contacts-phone").value
    }
  
  changeAssignedContact(contact_name)
  if (loggedInUser.name !== "Guest") { 
  for (let i = 0; i < users.length; i++) {
    const currentUsers = users[i];
    for (let j = 0; j < currentUsers.contacts.length; j++) {
      const currentContact = currentUsers.contacts[j];
      if (currentContact.contact_email == contact_email) {
        changeContactAndRenderContactsInformationRight(currentContact, small_edit_contacts_name, small_edit_contacts_email, small_edit_contacts_phone)
      }
    } 
  }  
} else {
  changeAssignedContact(contact_name)
  for (let j = 0; j < loggedInUser.contacts.length; j++) {
    const currentContact = loggedInUser.contacts[j];
    if (currentContact.contact_email == contact_email) {
      changeContactAndRenderContactsInformationRight(currentContact, small_edit_contacts_name, small_edit_contacts_email, small_edit_contacts_phone)
    }
   }
  }
 } 


function changeContactAndRenderContactsInformationRight(currentContact, small_edit_contacts_name, small_edit_contacts_email, small_edit_contacts_phone) {
  currentContact.contact_name = small_edit_contacts_name
  currentContact.contact_email = small_edit_contacts_email
  currentContact.contact_phone = small_edit_contacts_phone
  saveDependingOnUserName()
  if (document.querySelector(".contacts-left") && document.querySelector(".contacts-right")) {
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
  location.reload(true)
}


function changeAssignedContact(contact_name) {
  if (loggedInUser.name !== "Guest") {
    for (let i = 0; i < users.length; i++) {
      const currentUsers = users[i];
    for (let k = 0; k < currentUsers.tasks.length; k++) {
      const currentContact = currentUsers.tasks[k];
      for (let l = 0; l < currentContact.assignedContacts.length; l++) {
        if (currentContact.assignedContacts[l] == contact_name) {
          currentContact.assignedContacts[l] = small_edit_contacts_name
          saveUsersArray()
        }
      }
    } 
  }
} else {
  for (let k = 0; k < loggedInUser.tasks.length; k++) {
    const currentContact = loggedInUser.tasks[k];
    for (let l = 0; l < currentContact.assignedContacts.length; l++) {
      if (currentContact.assignedContacts[l] == contact_name) {
        currentContact.assignedContacts[l] = small_edit_contacts_name
        saveLoggedInUser()
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
      custom_select_contact_container[index].innerHTML += `<label class="custom-select-option"> ${currentContact.contact_name} <input onclick="returnSelectedContacts(this)" value="${currentContact.contact_name}" class="selected-option" type="checkbox" autocomplete="off"></label>`
    }
  }
}

function returnSuitableCategoryColor(task_topics, category, index) {
  switch(category) {
    case "Backoffice": 
      if (index === "") {
        task_topics.classList.add("turquoise")
      } else {
        task_topics[index].classList.add("turquoise")
      }
      break;
    case "Sales":
      if (index === "") {
        task_topics.classList.add("pink")
      } else {
        task_topics[index].classList.add("pink")
      }
      break;
    case "Media":
      if (index === "") {
        task_topics.classList.add("yellow")
      } else {
        task_topics[index].classList.add("yellow")
      }
      break;
    case "Design":
      if (index === "") {
        task_topics.classList.add("orange")
      } else {
        task_topics[index].classList.add("orange")
      }
      break;
    case "Marketing":
      if (index === "") {
        task_topics.classList.add("blue")
      } else {
        task_topics[index].classList.add("blue")
      }
      break;
    } 
}

function getCategoryColor(category, id_task) {
  let task_topics = document.querySelectorAll(".task-topic")
  returnSuitableCategoryColor(task_topics, category, id_task)  
}

function getUserColor() {
  let user_color = ["orange","red","pink","lightblue","purple","green","darkred","darkpurple"]
  
  if (loggedInUser.name !== "Guest") {
    randomBackgroundColorForUser(user_color)
  } else {
    randomBackgroundColorForGuestContacts(user_color)
  }
}  


function randomBackgroundColorForUser(user_color) {
  randomBackgroundColorForUserContacts(user_color)

  for (let i = 0; i < users.length; i++) {
    const currentUser = users[i];
    if(currentUser.email == loggedInUser.email && currentUser["user-background-color"] == ""){
      let random_color_2 = user_color[Math.floor(Math.random() * 7)]
      currentUser["user-background-color"] = random_color_2
      saveUsersArray()
    }
  }     
}

function randomBackgroundColorForUserContacts(user_color) {
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
}


function randomBackgroundColorForGuestContacts(user_color) {
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

async function loadBoardContactBackgroundColor() {
  if (loggedInUser.name !== "Guest") {
  await downloadFromServer();
  users = JSON.parse(backend.getItem('users')) || [];
  let user_icons = document.querySelectorAll(".user-icon")
  
  for (let i = 0; i < users.length; i++) {
      const currentUser = users[i];
      if (currentUser.email == loggedInUser.email) {
        setBoardBackgroundColor(currentUser,user_icons)
      }
    }
  } else {
      let user_icons = document.querySelectorAll(".user-icon")
      setBoardBackgroundColor(loggedInUser, user_icons)
  }
}


function setBoardBackgroundColor(user, user_icons) {
  let correctColor;

  for (let j = 0; j < user_icons.length; j++) {
    for (let k = 0; k < user.contacts.length; k++) {
      const currentContact = user.contacts[k];
      BackgroundColorForBoard[currentContact.contact_name] = currentContact["contact-background-color"]
    }
    for (let [key, value] of Object.entries(BackgroundColorForBoard)) {
      if (key == user_icons[j].id) {
        correctColor = value
      }
    }
    
    if (user_icons[j].id == user.name) {
      user_icons[j].classList.add(user["user-background-color"])
    } else {
      user_icons[j].classList.add(correctColor)
    }

  }
}


async function loadContactBackgroundColor() {
  if (loggedInUser.name !== "Guest") {
  await getUsersFromBackend()
  let user_icons = document.querySelectorAll(".user-icon")
  setBackgroundColor(BackgroundColorForContactBook, user_icons, loggedInUser)
} else {
  let user_icons = document.querySelectorAll(".user-icon")
  setBackgroundColor(BackgroundColorForContactBook, user_icons, loggedInUser) 
} 
}


function setBackgroundColor(obj, user_icons, user) {
  let correctColor;
  let user_icons_general = user_icons

  for (let j = 0; j < user_icons_general.length; j++) {
    for (let k = 0; k < user.contacts.length; k++) {
      const currentContact = user.contacts[k];
      getUserColor()
      obj[currentContact.contact_name] = currentContact["contact-background-color"]
    }
    for (let [key, value] of Object.entries(obj)) {
      if (key == user_icons_general[j].id) {
        correctColor = value
      }
    }
    user_icons_general[j].classList.add(correctColor)
  }
}


function renderContactBook() {
  let alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
  let firstLetterContainer;
  for (let i = 0; i < alphabet.length; i++) {
      firstLetterContainer = alphabet[i];
      document.querySelector(".contacts-left").innerHTML += templateContactsLeft(firstLetterContainer)
    }
  renderSavedContacts()
}

function renderSavedContacts() {
  if (loggedInUser.name !== "Guest") {  
    for (let i = 0; i < users.length; i++) {
      const currentUser = users[i];
      if(currentUser.email == loggedInUser.email){
        showSavedContactInContactBook(currentUser)
      }
        getUserColor()
  } 
 } else {
      showSavedContactInContactBook(loggedInUser)
      getUserColor()
    }
  }


  function showSavedContactInContactBook(user) {
    for (let j = 0; j < user.contacts.length; j++) {
      const contact = user.contacts[j];
      
      contact_emails.push(contact.contact_email)
      contact_names.push(contact.contact_name)
      contact_phones.push(contact.contact_phone)

      let first_letter_contact = contact.contact_name[0].toUpperCase()

      document.querySelector(`#contacts-${first_letter_contact}`).classList.remove("d-none")
      document.querySelector(`.contacts-${first_letter_contact}-data`).innerHTML += templateContactUserInContactBook(contact)
    }
  }




