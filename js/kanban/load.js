/**
 * save the edited contact for render new contact
 *
 * @param {string} contact_email -
 * @param {string} contact_name
 * @param {integer} i
 * @param {string} btn
 */
async function saveEditedContact(contact_email, contact_name, i, btn) {
  extractInputValueFromCorrectInputs(btn);

  if (checkContactEmailExist(small_edit_contacts_email, i)) {
    changeAssignedContact(contact_name);
    renderUserOrGuestContactInformation(contact_email, contact_name);
  } else {
    styleButtonWithRedBorder(btn);
  }
  if (btn == "mobile") {
    closeSmallEditContactsMobile(i)
  } else {
    closeSmallEditContacts(i);
  }
  
}


function renderUserOrGuestContactInformation(contact_email, contact_name) {
  if (loggedInUser.name !== "Guest") {
    for (let i = 0; i < users.length; i++) {
      const currentUsers = users[i];
      loopThroughUserAndRenderContactInformation(currentUsers, contact_email);
    }
  } else {
    changeAssignedContact(contact_name);
    loopThroughUserAndRenderContactInformation(loggedInUser, contact_email);
  }
}


function extractInputValueFromCorrectInputs(btn) {
  if (btn == "mobile") {
    small_edit_contacts_name = document.getElementById(
      "small-edit-contacts-name-mobile"
    ).value;
    small_edit_contacts_email = document.getElementById(
      "small-edit-contacts-email-mobile"
    ).value;
    small_edit_contacts_phone = document.getElementById(
      "small-edit-contacts-phone-mobile"
    ).value;
  } else {
    small_edit_contacts_name = document.getElementById(
      "small-edit-contacts-name"
    ).value;
    small_edit_contacts_email = document.getElementById(
      "small-edit-contacts-email"
    ).value;
    small_edit_contacts_phone = document.getElementById(
      "small-edit-contacts-phone"
    ).value;
  }
}


function loopThroughUserAndRenderContactInformation(user, contact_email, i) {
  for (let j = 0; j < user.contacts.length; j++) {
    const currentContact = user.contacts[j];
    if (currentContact.contact_email == contact_email) {
      changeContactAndRenderContactsInformationRight(
        currentContact,
        small_edit_contacts_name,
        small_edit_contacts_email,
        small_edit_contacts_phone,
        i
      );
    }
  }
}


function styleButtonWithRedBorder(btn) {
  if (btn == "mobile") {
    document.querySelector(
      "#edit-contact-create-btn-mobile"
    ).style.border = `1px solid rgb(255,0,0)`;
    document
      .querySelector(".edit-contact-email-exist-mobile")
      .classList.remove("d-none");
  } else {
    document.querySelector(
      "#edit-contact-create-btn"
    ).style.border = `1px solid rgb(255,0,0)`;
    document
      .querySelector(".edit-contact-email-exist")
      .classList.remove("d-none");
  }
}


async function changeContactAndRenderContactsInformationRight(
  currentContact,
  small_edit_contacts_name,
  small_edit_contacts_email,
  small_edit_contacts_phone
) {
  currentContact.contact_name = small_edit_contacts_name;
  currentContact.contact_email = small_edit_contacts_email;
  currentContact.contact_phone = small_edit_contacts_phone;
  await saveDependingOnUserName();
  if (document.querySelector(".contacts-left")) {
    document.querySelector(".contacts-left").innerHTML = "";

    if (document.querySelector(".contacts-right")) {
      document.querySelector(
        ".contacts-right"
      ).innerHTML = `<div id='contact-information'></div>
      <button onclick="renderSmallContacts()" class="add-person-btn">New Contact 
      <img class='add-person-img' src="kanban_img/add_icons/add_person.png">
      </button>
      `;
    }
  }
  renderContactBook();
  await loadContactBackgroundColor();
  // location.reload(true)
}

async function changeAssignedContact(contact_name) {
  if (loggedInUser.name !== "Guest") {
    for (let i = 0; i < users.length; i++) {
      const currentUsers = users[i];
      await assignNewContactName(currentUsers, contact_name);
    }
  } else {
    await assignNewContactName(loggedInUser, contact_name);
  }
}

async function assignNewContactName(user, contact_name) {
  for (let i = 0; i < user.tasks.length; i++) {
    const currentContact = user.tasks[i];
    for (let j = 0; j < currentContact.assignedContacts.length; j++) {
      if (currentContact.assignedContacts[j] == contact_name) {
        currentContact.assignedContacts[j] = small_edit_contacts_name;
        await saveDependingOnUserName();
      }
    }
  }
}


function addSelectContactOption(index) {
  let add_contact_input = document.getElementById("add-contact-input").value;
  let custom_select_contact_container = document.querySelectorAll(".custom-select-contact-container");

  if (loggedInUser.name !== "Guest") {
    for (let i = 0; i < users.length; i++) {
      const currentUser = users[i];
      if (currentUser.email == loggedInUser.email) {
        addLabelContactOptionToSelectContactContainer(currentUser,custom_select_contact_container,add_contact_input,index);
      }
    }
  } else {
    addLabelContactOptionToSelectContactContainer(loggedInUser, custom_select_contact_container,add_contact_input,index);
  }
}

function addLabelContactOptionToSelectContactContainer(user, custom_select_contact_container, add_contact_input, index) {
  let emails = []
  for (let j = 0; j < user.contacts.length; j++) {
    const currentContact = user.contacts[j];
    emails.push(currentContact.contact_email)
    if (currentContact.contact_email == add_contact_input) {
      custom_select_contact_container[index].innerHTML += `<label class="custom-select-option light-green"> ${currentContact.contact_name} <input onclick="returnSelectedContacts(this)" value="${currentContact.contact_name}" class="selected-option" type="checkbox" autocomplete="off"></label>`;
      let custom_select_option = document.querySelectorAll(".custom-select-option");
      removeGreenMarking(custom_select_option);
    }
    if (!emails.includes(add_contact_input)) {
      // console.log(user.contacts)
      document.querySelector(".contact-not-found").innerHTML = `'${add_contact_input}' not found in contact book`
      document.querySelector(".contact-not-found").classList.remove("d-none")
  
      setTimeout(() => {
        document.querySelector(".contact-not-found").classList.add("d-none")
      }, 2000)
    }
  }
  
}

function removeGreenMarking(option_array) {
  setTimeout(() => {
    for (let i = 0; i < option_array.length; i++) {
      const category_option = option_array[i];
      if (category_option.classList.contains("light-green")) {
        category_option.classList.remove("light-green");
      }
    }
  }, 1500);
}

function returnSuitableCategoryColor(task_topics, category, index) {
  switch (category) {
    case "Backoffice":
      if (index === "") {
        task_topics.classList.add("turquoise");
      } else {
        task_topics[index].classList.add("turquoise");
      }
      break;
    case "Sales":
      if (index === "") {
        task_topics.classList.add("pink");
      } else {
        task_topics[index].classList.add("pink");
      }
      break;
    case "Media":
      if (index === "") {
        task_topics.classList.add("yellow");
      } else {
        task_topics[index].classList.add("yellow");
      }
      break;
    case "Design":
      if (index === "") {
        task_topics.classList.add("orange");
      } else {
        task_topics[index].classList.add("orange");
      }
      break;
    case "Marketing":
      if (index === "") {
        task_topics.classList.add("blue");
      } else {
        task_topics[index].classList.add("blue");
      }
      break;
    default:
      if (index === "") {
        task_topics.classList.add("gray");
      } else {
        task_topics[index].classList.add("gray");
      }
  }
}

function getCategoryColor(category, id_task) {
  let task_topics = document.querySelectorAll(".task-topic");
  returnSuitableCategoryColor(task_topics, category, id_task);
}

function getUserColor() {
  let user_color = [
    "orange",
    "red",
    "pink",
    "lightblue",
    "purple",
    "green",
    "darkred",
    "darkpurple",
  ];

  if (loggedInUser.name !== "Guest") {
    randomBackgroundColorForUser(user_color);
  } else {
    randomBackgroundColorForGuestContacts(user_color);
  }
}

async function randomBackgroundColorForUser(user_color) {
  randomBackgroundColorForUserContacts(user_color);

  for (let i = 0; i < users.length; i++) {
    const currentUser = users[i];
    if (
      currentUser.email == loggedInUser.email &&
      currentUser["user-background-color"] == ""
    ) {
      let random_color_2 = user_color[Math.floor(Math.random() * 7)];
      currentUser["user-background-color"] = random_color_2;
      await saveUsersArray();
    }
  }
}


function randomBackgroundColorForUserContacts(user_color) {
  for (let i = 0; i < users.length; i++) {
    const currentUser = users[i];
    if (currentUser.email == loggedInUser.email) {
      for (let j = 0; j < currentUser.contacts.length; j++) {
        const currentContact = currentUser.contacts[j];
        if (currentContact["contact-background-color"] == "") {
          let random_color_1 = user_color[Math.floor(Math.random() * 7)];
          currentContact["contact-background-color"] = random_color_1;
        }
      }
    }
  }
}

function randomBackgroundColorForGuestContacts(user_color) {
  let random_color_1 = user_color[Math.floor(Math.random() * 7)];
  loggedInUser.contacts["contact-background-color"] = random_color_1;
  localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

  for (let j = 0; j < loggedInUser.contacts.length; j++) {
    const currentContact = loggedInUser.contacts[j];
    if (currentContact["contact-background-color"] == "") {
      let random_color_1 = user_color[Math.floor(Math.random() * 7)];
      currentContact["contact-background-color"] = random_color_1;
    }
  }
}

async function loadBoardContactBackgroundColor() {
  if (loggedInUser.name !== "Guest") {
    await downloadFromServer();
    users = JSON.parse(backend.getItem("users")) || [];
    let user_icons = document.querySelectorAll(".user-icon");

    for (let i = 0; i < users.length; i++) {
      const currentUser = users[i];
      if (currentUser.email == loggedInUser.email) {
        setBoardBackgroundColor(currentUser, user_icons);
      }
    }
  } else {
    let user_icons = document.querySelectorAll(".user-icon");
    setBoardBackgroundColor(loggedInUser, user_icons);
  }
}

function setBoardBackgroundColor(user, user_icons) {
  let correctColor;
  for (let j = 0; j < user_icons.length; j++) {
    for (let k = 0; k < user.contacts.length; k++) {
      const currentContact = user.contacts[k];
      BackgroundColorForBoard[currentContact.contact_name] =
        currentContact["contact-background-color"];
    }
    for (let [key, value] of Object.entries(BackgroundColorForBoard)) {
      if (key == user_icons[j].id) {
        correctColor = value;
      }
    }
    if (user_icons[j].id == user.name) {
      user_icons[j].classList.add(user["user-background-color"]);
    } else {
      user_icons[j].classList.add(correctColor);
    }
  }
}

async function loadContactBackgroundColor() {
  if (loggedInUser.name !== "Guest") {
    await getUsersFromBackend();
    let user_icons = document.querySelectorAll(".user-icon");
    for (let i = 0; i < users.length; i++) {
      const currentUser = users[i];
      if (currentUser.email == loggedInUser.email) {
        setBackgroundColor(
          BackgroundColorForContactBook,
          user_icons,
          currentUser
        );
      }
    }
  } else {
    let user_icons = document.querySelectorAll(".user-icon");
    setBackgroundColor(BackgroundColorForContactBook, user_icons, loggedInUser);
  }
}

function setBackgroundColor(obj, user_icons, user) {
  let correctColor;
  let user_icons_general = user_icons;

  for (let j = 0; j < user_icons_general.length; j++) {
    for (let k = 0; k < user.contacts.length; k++) {
      const currentContact = user.contacts[k];
      getUserColor();
      obj[currentContact.contact_name] =
        currentContact["contact-background-color"];
    }
    for (let [key, value] of Object.entries(obj)) {
      if (key == user_icons_general[j].id) {
        correctColor = value;
      }
    }
    user_icons_general[j].classList.add(correctColor);
  }
}

function renderContactBook() {
  let alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  let firstLetterContainer;
  for (let i = 0; i < alphabet.length; i++) {
    firstLetterContainer = alphabet[i];
    if (document.querySelector(".contacts-left")) {
      document.querySelector(".contacts-left").innerHTML += templateContactsLeft(firstLetterContainer);
    } else {
      location.href = "./contacts.html"
    }
  }
  renderSavedContacts();
}

function renderSavedContacts() {
  if (loggedInUser.name !== "Guest") {
    for (let i = 0; i < users.length; i++) {
      const currentUser = users[i];
      if (currentUser.email == loggedInUser.email) {
        showSavedContactInContactBook(currentUser);
      }
      getUserColor();
    }
  } else {
    showSavedContactInContactBook(loggedInUser);
    getUserColor();
  }
}

function showSavedContactInContactBook(user) {
  for (let j = 0; j < user.contacts.length; j++) {
    const contact = user.contacts[j];

    contact_emails.push(contact.contact_email);
    contact_names.push(contact.contact_name);
    contact_phones.push(contact.contact_phone);

    let first_letter_contact = contact.contact_name[0].toUpperCase();

    if (document.querySelector(`#contacts-${first_letter_contact}`)) {
      document
        .querySelector(`#contacts-${first_letter_contact}`)
        .classList.remove("d-none");
      document.querySelector(
        `.contacts-${first_letter_contact}-data`
      ).innerHTML += templateContactUserInContactBook(contact);
    }
  }
}
