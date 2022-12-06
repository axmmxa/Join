function showPopup(id) {
  document.getElementById(id).style.display = "flex"

  setTimeout(() => {
      document.getElementById(id).style.display = "none"
  }, 2000)
}


function selectedLink(id) {
  document.getElementById(id).classList.add("hover-blue")
  document.getElementById(id).style.border = "1px solid transparent"
  document.getElementById(id).style.borderRadius = "8px"
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


function closeSmallContactsMobile() {
  document.getElementById("small-contacts-container-mobile").classList.add("d-none")
  setOpacity(1)
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


function closeSmallEditTask(id) {
  document.querySelector(`#edit-task-${id}`).classList.add("d-none")
  setOpacity(1)
  closeBoardTaskInfo()
}
  

function closeBoardTaskInfo() {
  document.querySelectorAll(".small-board-task-info").forEach(small_board_task_info => {
    small_board_task_info.classList.add("d-none")
  })
  setOpacity(1)
}

function closeSmallAddTask() {
  document.getElementById("small-add-task").classList.add("d-none")
  setOpacity(1)
}
  
function cancelContactsInput(btn) {
  if (btn === "not-mobile") {
    document.querySelector("#small-add-contacts-name").value = ""
    document.querySelector("#small-add-contacts-email").value = ""
    document.querySelector("#small-add-contacts-phone").value = ""
  } 
}

function pushContactInfo(small_add_contacts_name, small_add_contacts_email, small_add_contacts_phone) {
  contact_names.push(capitalizeFirstLetter(small_add_contacts_name))
  contact_emails.push(small_add_contacts_email)
  contact_phones.push(small_add_contacts_phone)
}


function returnCorrectColorForGuestOrUser(user_icons, correctColor) {
  if (loggedInUser.name == "Guest") {
    return document.querySelector(".user-icon-big").classList.add(correctColor)
  } else {
    return user_icons[user_icons.length - 1].classList.add(correctColor)
  }
}


function getCategoryColorTaskInfo(category) {
  let task_topics = document.querySelectorAll(".task-topic-info")
  returnSuitableCategoryColor(task_topics, category, task_topics.length - 1)
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

function styleCreateContactButton(btn) {
  if (btn == 'mobile') {
    document.querySelector("#add-contact-create-btn-mobile").style.border = `1px solid rgb(255,0,0)`
    document.querySelector(".add-contact-email-exist-mobile").classList.remove("d-none");
  } else {
    document.querySelector("#add-contact-create-btn").style.border = `1px solid rgb(255,0,0)`
    document.querySelector(".add-contact-email-exist").classList.remove("d-none");
  }
}

