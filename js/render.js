function setOpacity(number) {
  document.querySelector(".kanban-navbar").style.opacity = number
  document.querySelector(".kanban-main").style.opacity = number
  document.querySelector(".sidebar-mobile").style.opacity = number
}


function closeSmallContacts() {
  if (document.getElementById("small-contacts-container")) {
    document.getElementById("small-contacts-container").classList.add("d-none")
  }
  setOpacity(1)
}


function renderSmallContacts() {
  if (document.getElementById("small-contacts-container")) {
    document.getElementById("small-contacts-container").classList.remove("d-none")
    setOpacity(0.5)
  } else {
    document.querySelector("body").innerHTML += templateSmallContacts()
    setOpacity(0.5)
  }
}


function closeSmallContactsMobile() {
  document.getElementById("small-contacts-container-mobile").classList.add("d-none")
  setOpacity(1)
}


function renderSmallContactsMobile() {
  if (document.getElementById("small-contacts-container-mobile")) {
    document.getElementById("small-contacts-container-mobile").classList.remove("d-none")
    setOpacity(0.5)
  } else {
    document.querySelector("body").innerHTML += templateSmallContactsMobile()
    setOpacity(0.5)
  }
}


function closeSmallEditContacts(i) {
  document.querySelector(`#small-contacts-container-${i}`).classList.add("d-none");
  document.querySelector(`#small-contacts-container-${i}`).classList.remove("box-shadow");
  document.querySelector(`#edit-small-contacts-container`).classList.add("z-index-1")
  setOpacity(1)
}


function closeSmallEditContactsMobile(i) {
  document.querySelector(`#small-contacts-container-mobile-${i}`).classList.add("d-none");
  setOpacity(1)
}


async function renderSmallEditContactsMobile(contact_name, contact_email, contact_phone, i) {
  if (document.querySelector(`#small-contacts-container-mobile-${i}`)) {
    document.querySelector(`#small-contacts-container-mobile-${i}`).classList.remove("d-none");
    setOpacity(0.5)
  } else {
    document.querySelector(`body`).innerHTML += templateSmallEditContactsMobile(contact_name, contact_email, contact_phone, i)
    setOpacity(0.5)

    await getUserBackgroundDependingOnUser()

  }
}


async function getUserBackgroundColorEditIconDependingOnUser() {
  if (loggedInUser.name !== "Guest") {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    let user_icons = document.querySelectorAll(".user-icon-edit-contact")

    for (let i = 0; i < users.length; i++) {
      const currentUser = users[i];
      if (currentUser.email == loggedInUser.email) {
        setBackgroundColor(BackgroundColorForEditContact, user_icons, currentUser)
      }
    }
  } else {
    let user_icons = document.querySelectorAll(".user-icon-edit-contact")
    setBackgroundColor(BackgroundColorForEditContact, user_icons, loggedInUser)
    setOpacity(0.5)
  }
}


function renderTemplateSmallEditContacts(contact_name, contact_email, contact_phone, i) {
  document.querySelector(`#edit-small-contacts-container`).innerHTML = templateSmallEditContacts(contact_name, contact_email, contact_phone, i)

  document.querySelector(`#small-contacts-container-${i}`).classList.remove("d-none");
  document.querySelector(`#small-contacts-container-${i}`).classList.add("box-shadow");
  document.querySelector(`#edit-small-contacts-container`).classList.remove("z-index-1")
}


async function renderSmallEditContacts(contact_name, contact_email, contact_phone, i) {
  if (loggedInUser.name !== "Guest") {

    renderTemplateSmallEditContacts(contact_name, contact_email, contact_phone, i)
    await getUserBackgroundColorEditIconDependingOnUser()
    setOpacity(0.5)

  } else {
    setOpacity(0.5)
    renderTemplateSmallEditContacts(contact_name, contact_email, contact_phone, i)
    let user_icons = document.querySelectorAll(".user-icon-edit-contact")
    setBackgroundColor(BackgroundColorForEditContact, user_icons, loggedInUser)
  }
  await getUserBackgroundColorEditIconDependingOnUser()
}


function closeSmallEditTask(id) {
  document.querySelector(`#edit-task-${id}`).classList.add("d-none")
  setOpacity(1)
  closeBoardTaskInfo()
}


function resetPriorityImgPaths(priorities, id_task) {
  for (let index = 0; index < priorities.length; index++) {
    const priority = priorities[index];
    priority.style.color = 'black'
    priority.style.backgroundColor = 'white'
    if (document.getElementById(`urgent-btn-${id_task}`)) {
      document.getElementById(`urgent-btn-priority-img-${id_task}`).setAttribute('src', 'kanban_img/priority_icons/urgent-red.png')
    } if (document.getElementById(`medium-btn-${id_task}`)) {
      document.getElementById(`medium-urgent-btn-priority-img-${id_task}`).setAttribute('src', 'kanban_img/priority_icons/middle-urgent-orange.png')
    } if (document.getElementById(`non-urgent-btn-${id_task}`)) {
      document.getElementById(`non-urgent-btn-priority-img-${id_task}`).setAttribute('src', 'kanban_img/priority_icons/non-urgent-green.png')
    }
  }
}


function setPrioritySmallEditTask(id, id_task) {
  let priorities = document.querySelectorAll('.priority')

  resetPriorityImgPaths(priorities, id_task)

  if (id == `Urgent`) {
    changeStyleSelectedPriorityButtonEditTask('red', 'kanban_img/priority_icons/urgent_white.png', 'white', 'kanban_img/priority_icons/urgent-red.png', 'Urgent', id_task)
  } else if (id == `Medium`) {
    changeStyleSelectedPriorityButtonEditTask('orange', 'kanban_img/priority_icons/medium_urgent_white.png', 'white', 'kanban_img/priority_icons/middle-urgent-orange.png', 'Medium', id_task)
  } else if (id == `Low`) {
    changeStyleSelectedPriorityButtonEditTask('lightgreen', 'kanban_img/priority_icons/non_urgent_white.png', 'white', 'kanban_img/priority_icons/non-urgent-green.png', 'Low', id_task)
  }

}


function changeStyleSelectedPriorityButtonEditTask(backgroundColor, reset_img_path, color, img_path, priority, id_task) {
  let id_style;
  let id_img;
  if (priority == `Urgent`) {
    id_style = `urgent-btn-${id_task}`
    id_img = `urgent-btn-priority-img-${id_task}`
  } else if (priority == `Medium`) {
    id_style = `medium-btn-${id_task}`
    id_img = `medium-urgent-btn-priority-img-${id_task}`
  } else if (priority == `Low`) {
    id_style = `non-urgent-btn-${id_task}`
    id_img = `non-urgent-btn-priority-img-${id_task}`
  }
  document.getElementById(id_style).style.backgroundColor = backgroundColor
  document.getElementById(id_img).setAttribute('src', reset_img_path)
  document.getElementById(id_style).style.color = color
  priority_img_path = img_path
  selected_priority = priority
}


async function renderSmallEditTask(id_task, title, description, due_date, priority) {
  id_task = await changeIdToCorrectIndex(id_task)
  if (document.querySelector(`#edit-task-${id_task}`)) {
    document.querySelector(`#edit-task-${id_task}`).classList.remove("d-none")
    setPrioritySmallEditTask(priority, id_task)
    setOpacity(0.5)
  } else {
    setOpacity(0.5)
    document.querySelector("body").innerHTML += templateSmallEditTask(id_task, title, description, due_date)
    setPrioritySmallEditTask(priority, id_task)
    changeArgumentIdFromCustomSelectToCorrectIndex()
    addContactOptionToCustomSelectOption(id_task)

  }
}


async function changeIdToCorrectIndex(id_task) {
  for (let i = 0; i < users.length; i++) {
    const currentUser = users[i]
    if (loggedInUser.email == currentUser.email) {
      id_task = await getIndexOfIdTask(currentUser, id_task)
    }
  }
  if (loggedInUser.name == "Guest") {
    id_task = await getIndexOfIdTask(loggedInUser, id_task)
  }

  return id_task
}


function changeArgumentIdFromCustomSelectToCorrectIndex() {
  let custom_select_contact_container = document.querySelectorAll(".custom-select-contact-container")
  console.log(custom_select_contact_container)
  custom_select_contact_container[custom_select_contact_container.length - 1].innerHTML += `<label class="custom-select-option"> ${loggedInUser.name} (You) <input onclick="returnSelectedContacts(this)" value="${loggedInUser.name}" class="selected-option contact-option" type="checkbox" autocomplete="off"></label>`

  let first_select_option_container = document.querySelectorAll(".first-select-option-container")

  first_select_option_container[custom_select_contact_container.length - 1].setAttribute("onclick", `showCustomSelectOptionEditTask(${custom_select_contact_container.length - 1})`)
}


async function showTaskInfo(id_task) {
  if (loggedInUser.name !== "Guest") {
    renderUsersTaskInfo(id_task)
  } else {
    renderGuestInfoTask(id_task)
  }
}


function renderGuestInfoTask(id_task) {
  for (let j = 0; j < loggedInUser.tasks.length; j++) {
    let userTaskId = loggedInUser.tasks[j]
    if (userTaskId.id_task == id_task) {
      document.querySelector("body").innerHTML += templateShowTaskInfo(userTaskId, id_task, j)
      console.log(userTaskId.category)
      getCategoryColorTaskInfo(userTaskId.category)
      assignedPersonal(userTaskId, j)
      let user_icons = document.querySelectorAll(".user-icon-task-info")
      setBoardBackgroundColor(loggedInUser, user_icons)
    }
  }
}


async function renderUsersTaskInfo(id_task) {

  for (let i = 0; i < users.length; i++) {
    console.log(users)
    const currentUser = users[i];
    if (currentUser.email == loggedInUser.email) {
      renderBoardTask(currentUser, id_task)
      await getUsersFromBackend()
      let user_icons = document.querySelectorAll(".user-icon-task-info")
      loadBoardContactBackgroundColor()
      for (let i = 0; i < users.length; i++) {
        const currentUser = users[i];
        if (currentUser.email == loggedInUser.email) {
          setBoardBackgroundColor(currentUser, user_icons)
        }
      }
    }
  }
}


function renderBoardTask(currentUser, id_task) {
  for (let j = 0; j < currentUser.tasks.length; j++) {
    let userTaskId = currentUser.tasks[j]
    if (userTaskId.id_task == id_task) {
      document.querySelector("body").innerHTML += templateShowTaskInfo(userTaskId, id_task, j)

      console.log(userTaskId.category)
      getCategoryColorTaskInfo(userTaskId.category)
      assignedPersonal(userTaskId, j)
    }
  }
}

function assignedPersonal(userTaskId, j) {
  let assignedPersonal = document.querySelector(`#assigned-personal-${j}`)

  userTaskId.assignedContacts.forEach(contact => {
    assignedPersonal.innerHTML +=
      `<div class="d-flex">
          <span id="${contact}" class="user-icon-task-info">${getUserIcon(contact)}</span>
          <span>${contact}</span> 
      </div>`
  })
}


function getCategoryColorTaskInfo(category) {
  let task_topics = document.querySelectorAll(".task-topic-info")
  returnSuitableCategoryColor(task_topics, category, task_topics.length - 1)
}


function closeBoardTaskInfo() {
  document.querySelectorAll(".small-board-task-info").forEach(small_board_task_info => {
    small_board_task_info.classList.add("d-none")
  })
  setOpacity(1)
}


function renderBoardTaskInfo(id_task) {
  if (document.getElementById(`small-board-task-info-${id_task}`)) {
    document.getElementById(`small-board-task-info-${id_task}`).classList.remove("d-none")
    setOpacity(0.5)
  } else {
    showTaskInfo(id_task)
    setOpacity(0.5)
  }
}


function closeSmallAddTask() {
  document.getElementById("small-add-task").classList.add("d-none")
  setOpacity(1)
}


function renderSmallAddTask() {
  if (document.getElementById("small-add-task")) {
    document.getElementById("small-add-task").classList.remove("d-none")
    setOpacity(0.5)
  } else {
    setOpacity(0.5)
    document.querySelector("body").innerHTML += templateSmallAddTask()

    let custom_select_contact_container = document.querySelector(".custom-select-contact-container")
    custom_select_contact_container.innerHTML += `<label class="custom-select-option"> ${loggedInUser.name} (You) <input onclick="returnSelectedContacts(this)" value="${loggedInUser.name}" class="selected-option contact-option" type="checkbox" autocomplete="off"></label>`
  }
}


async function renderContactInformation(email, name) {
  let index = contact_emails.indexOf(email)

  if (loggedInUser.name !== "Guest") {
    renderTemplateContactInformation(index, name, email)
    await getUsersFromBackend()
    for (let i = 0; i < users.length; i++) {
      const currentUser = users[i];
      loadUserIconContactInformation(currentUser, name, email)
    }
  } else {
    renderTemplateContactInformation(index, name, email)
    loadUserIconContactInformation(loggedInUser, name, email)
  }
}


function loadUserIconContactInformation(user, name, email) {
  let correctColor;
  let user_icons = document.querySelectorAll(".user-icon")

  for (let j = 0; j < user.contacts.length; j++) {
    if (user.contacts[j].contact_name == name) {
      for (let j = 0; j < user.contacts.length; j++) {
        const currentContact = user.contacts[j];
        console.log("current contact", currentContact)
        correctColor = currentContact["contact-background-color"]
        if (currentContact.contact_email == email && window.innerWidth > 874) {
          user_icons[user.contacts.length].classList.add(correctColor)
        } else if (currentContact.contact_email == email && window.innerWidth < 874) {
          returnCorrectColorForGuestOrUser(user_icons, correctColor)
          document.querySelector(".main-field").style.justifyContent = "space-between"
          document.querySelector(".main-field").style.alignItems = ""
        }
      }
    }
  }
}


function returnCorrectColorForGuestOrUser(user_icons, correctColor) {
  if (loggedInUser.name == "Guest") {
    return document.querySelector(".user-icon-big").classList.add(correctColor)
  } else {
    return user_icons[user_icons.length - 1].classList.add(correctColor)
  }
}


function renderTemplateContactInformation(index, name, email) {
  for (let i = 0; i < contact_names.length; i++) {
    if (i == index && window.innerWidth > 874) {
      document.querySelector("#contact-information").innerHTML = templateContactInformation(email, name, i)
    } else if (i == index) {
      document.querySelector(".main-field").innerHTML = templateContactInformationMobile(email, name, i)
    }
  }
}


function returnContactJSON(small_add_contacts_name, small_add_contacts_email, small_add_contacts_phone) {
  return {
    "contact_name": capitalizeFirstLetter(small_add_contacts_name),
    "contact_email": small_add_contacts_email,
    "contact_phone": small_add_contacts_phone,
    "contact-background-color": ""
  }
}


async function addContactToBook(btn) {
  setCorrectInputValueFromAddContact(btn)

  if (checkContactEmailExist(small_add_contacts_email)) {
    pushContactInfo(small_add_contacts_name, small_add_contacts_email, small_add_contacts_phone)
    let contact = returnContactJSON(small_add_contacts_name, small_add_contacts_email, small_add_contacts_phone)
    if (small_add_contacts_name !== "" && small_add_contacts_email !== "" && small_add_contacts_phone !== "") {
      pushDependingOnUser(contact)
    }
    showAddedContactDependingOnUser(btn)
  } else {
    styleCreateContactButton(btn)
  }
  await saveDependingOnUserName()
}


function showAddedContactDependingOnUser(btn) {
  if (loggedInUser.name !== "Guest") {
    showAddedContactInContactBook(small_add_contacts_name, small_add_contacts_email, small_add_contacts_phone, btn)
  } else {
    showAddedContactInContactBook(small_add_contacts_name, small_add_contacts_email, small_add_contacts_phone, btn)
  }
}

function styleCreateContactButton(btn) {
  if (btn == 'mobile') {
    document.querySelector("#add-contact-create-btn-mobile").style.border = `1px solid rgb(255,0,0)`
    document.querySelector(".add-contact-email-exist-mobile").classList.remove("d-none");
  } else {
    document.querySelector("#add-contact-create-btn").style.border = `1px solid rgb(255,0,0)`
    document.querySelector(".add-contact-email-exist").classList.remove("d-none");
  }
}

function pushDependingOnUser(contact) {
  if (loggedInUser.name == "Guest") {
    pushAddedContactIntoUser(loggedInUser, contact)
  } else {
    for (let i = 0; i < users.length; i++) {
      const currentUser = users[i];
      if (loggedInUser.email == currentUser.email) {
        pushAddedContactIntoUser(currentUser, contact)
      }

    }
  }
}


function setCorrectInputValueFromAddContact(btn) {
  if (btn == "mobile") {
    small_add_contacts_name = document.getElementById("small-add-contacts-name-mobile").value
    small_add_contacts_email = document.getElementById("small-add-contacts-email-mobile").value
    small_add_contacts_phone = document.getElementById("small-add-contacts-phone-mobile").value
  } else {
    small_add_contacts_name = document.getElementById("small-add-contacts-name").value
    small_add_contacts_email = document.getElementById("small-add-contacts-email").value
    small_add_contacts_phone = document.getElementById("small-add-contacts-phone").value
  }
}

function pushContactInfo(small_add_contacts_name, small_add_contacts_email, small_add_contacts_phone) {
  contact_names.push(capitalizeFirstLetter(small_add_contacts_name))
  contact_emails.push(small_add_contacts_email)
  contact_phones.push(small_add_contacts_phone)
}

async function pushAddedContactIntoUser(user, contact) {
  if (user.name == "Guest") {
    user.contacts.push(contact)
    getUserColor()
  } else {
    user.contacts.push(contact)
    getUserColor()
    await saveUsersArray()
  }
}


async function showAddedContactInContactBook(small_add_contacts_name, small_add_contacts_email, small_add_contacts_phone, btn) {
  let small_add_contacts_name_general;
  if (btn == 'mobile') {
    small_add_contacts_name_general = document.getElementById("small-add-contacts-name-mobile").value
  } else {
    small_add_contacts_name_general = document.getElementById("small-add-contacts-name").value
  }
  await saveDependingOnUserName()
  let first_letter = small_add_contacts_name_general[0].toUpperCase()

  document.querySelector(`#contacts-${first_letter}`).classList.remove("d-none")
  document.querySelector(`.contacts-${first_letter}-data`).innerHTML += templateUserContactAddContact(small_add_contacts_name, small_add_contacts_email, small_add_contacts_phone)

  await loadContactBackgroundColor()
  showPopup("task-popup")

  if (btn == "mobile") {
    closeSmallContactsMobile()
  } else {
    closeSmallContacts()
  }
}
