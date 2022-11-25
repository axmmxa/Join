function templateSmallContacts() {
    return `
    <div id="small-contacts-container">
        <div id="small-contacts-container-close-btn-container" class="light-blue">
            <span onclick="closeSmallContacts()" class="arrow white-text">X</span>
        </div>
        <div class="upper-part-small-contacts light-blue">
            <img class="logo-height" src="kanban_img/login_icons/join_white.png">
            <h1 class="white-text">Add Contact</h1>
            <span class="white-text">Tasks are better in a team</span>
        </div>

        <div class="lower-part-small-contacts">
            <img class="anonymous-profile-picture" src="kanban_img/user_icons/anonym_profile_picture.png">

            <form onchange="enableAddContactButton('not-mobile','add-create-btn')" onsubmit="addContactToBook('not-mobile'); return false"  class="small-contacts-add-data">
                <div class="login-data">
                    <input id="small-add-contacts-name" type="text" placeholder="Name" pattern="^[a-zA-Z ]*$" required>
                    <input id="small-add-contacts-email" type="text" placeholder="E-mail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required>
                    <div class="add-contact-email-exist red-text d-none fs-12">Email already exists!</div>
                    <input id="small-add-contacts-phone" type="text" placeholder="Phone" pattern="^[0-9 ]*$" required>
                </div>

                <div class="small-contacts-btn-container">
                    <button onclick="cancelContactsInput('not-mobile')" class="delete-btn">Cancel <span class="close-x">X</span></button>
                    <button id="add-contact-create-btn" class="create-btn add-create-btn">Create Contact <img class="white-clear" src="kanban_img/clear_icons/white_clear.png"></button>
                </div>
            </form>
        </div>
    </div>
    `
}


function templateSmallContactsMobile() {
    return `<div id="small-contacts-container-mobile" class="centered">
        <span onclick="closeSmallContactsMobile()" class="arrow white-text close-x-absolute">X</span>
      <div class="upper-part-small-contacts-mobile light-blue">
          <h1 class="white-text">Add Contact</h1>
          <span class="white-text">Tasks are better in a team</span>
      </div>

      <div class="lower-part-small-contacts-mobile">
          <img class="anonymous-profile-picture anonymous-profile-picture-mobile" src="kanban_img/user_icons/anonym_profile_picture.png">

          <form onchange="enableAddContactButton('mobile','add-create-btn-mobile')" onsubmit="addContactToBook('mobile'); return false" class="small-contacts-add-data">
              <div class="login-data">
                  <input id="small-add-contacts-name-mobile" type="text" placeholder="Name" pattern="^[a-zA-Z ]*$" required>
                  <input id="small-add-contacts-email-mobile" type="text" placeholder="E-mail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required>
                  <div class="add-contact-email-exist-mobile red-text d-none fs-12">Email already exists!</div>
                  <input id="small-add-contacts-phone-mobile" type="text" placeholder="Phone" pattern="^[0-9 ]*$" required>
              </div>

              <div class="small-contacts-btn-container">
                  <button id="add-contact-create-btn-mobile" class="create-btn add-create-btn-mobile">Create Contact <img class="white-clear" src="kanban_img/clear_icons/white_clear.png"></button>
              </div>
          </form>
      </div>
  </div>
  `
}


function templateSmallEditContacts(contact_name, contact_email, contact_phone, i) {
    return `
    <div id="small-contacts-container-${i}" class="edit-contact-container"> 
    <div id="small-contacts-container-close-btn-container" class="blue">
        <span onclick="closeSmallEditContacts(${i})" class="arrow white-text">X</span>
    </div>
    <div class="upper-part-small-contacts blue">
        <img class="logo-height" src="kanban_img/login_icons/join_white.png">
        <h1 class="white-text">Edit Contact</h1>
    </div>

    <div class="lower-part-small-contacts">
    <div id="${contact_name}" class="user-icon-edit-contact user-icon-big fs-22">${getUserIcon(contact_name)}</div>

        <form onchange="enableButton()" onsubmit="saveEditedContact('${contact_email}','${contact_name}', ${i},'not-mobile'); return false" class="small-contacts-add-data">
            <div class="login-data">
                <input value="${contact_name}" id="small-edit-contacts-name" type="text" placeholder="Name" pattern="^[a-zA-Z ]*$" required>
                <input value="${contact_email}" id="small-edit-contacts-email" type="text" placeholder="E-mail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required>
                <div class="edit-contact-email-exist red-text d-none fs-12">Email already exists!</div>
                <input value="${contact_phone}" id="small-edit-contacts-phone" type="text" placeholder="Phone" pattern="^[0-9 ]*$" required>
            </div>

            <div class="small-contacts-btn-container">
                <button id="edit-contact-create-btn" class="create-btn">Save</button>
            </div>
        </form>
    </div>
    </div>
    `
}

function templateSmallEditContactsMobile(contact_name, contact_email, contact_phone, i) {
    return `
    <div id="small-contacts-container-mobile-${i}" class="edit-contact-container-mobile centered"> 
    
    <span onclick="closeSmallEditContactsMobile(${i})" class="arrow white-text close-x-absolute">X</span>
    
    <div class="upper-part-small-contacts-mobile light-blue">
        <h1 class="white-text">Edit Contact</h1>
        <p class="white-text">Tasks are better with a team!</p>
    </div>

    <div class="lower-part-small-contacts-mobile">
    <div id="${contact_name}" class="user-icon-edit-contact user-icon-big-mobile fs-22">${getUserIcon(contact_name)}</div>

        <form onsubmit="saveEditedContact('${contact_email}','${contact_name}', 'mobile'); return false" class="small-contacts-add-data">
            <div class="login-data margin">
                <input value="${contact_name}" id="small-edit-contacts-name-mobile" type="text" placeholder="Name" pattern="^[a-zA-Z ]*$" required>
                <input value="${contact_email}" id="small-edit-contacts-email-mobile" type="text" placeholder="E-mail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required>
                <div class="edit-contact-email-exist-mobile red-text d-none fs-12">Email already exists!</div>
                <input value="${contact_phone}" id="small-edit-contacts-phone-mobile" type="text" placeholder="Phone" pattern="^[0-9 ]*$" required>
            </div>

            <div class="small-contacts-btn-container">
                <button id="edit-contact-create-btn-mobile" class="create-btn">Save</button>
            </div>
        </form>
    </div>
    </div>
    
    `

}


function templateParentSmallEditContacts(contact_name, contact_email, contact_phone) {
    return `
    <div id="edit-small-contacts-container">
        <div id="small-contacts-container-close-btn-container" class="blue">
            <span onclick="closeSmallEditContacts()" class="arrow white-text">X</span>
        </div>
        <div class="upper-part-small-contacts blue">
            <img class="logo-height" src="kanban_img/login_icons/join_white.png">
            <h1 class="white-text">Edit Contact</h1>
        </div>

        <div class="lower-part-small-contacts">
        <div id="${contact_name}" class="user-icon-edit-contact user-icon-big fs-22">${getUserIcon(contact_name)}</div>

            <form onsubmit="saveEditedContact('${contact_email}','${contact_name}', 'not-mobile'); return false" class="small-contacts-add-data">
                <div class="login-data">
                    <input value="${contact_name}"  id="small-edit-contacts-name" type="text" placeholder="Name" pattern="^[a-zA-Z ]*$" required>
                    <input value="${contact_email}" id="small-edit-contacts-email" type="text" placeholder="E-mail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required>
                    <input value="${contact_phone}" id="small-edit-contacts-phone" type="text" placeholder="Phone" pattern="^[0-9 ]*$" required>
                </div>

                <div class="small-contacts-btn-container">
                    <button id="edit-contact-create-btn" class="create-btn edit-contact-email-exist-mobile">Save</button>
                </div>
            </form>
        </div>
    </div>
        `
}


function templateSmallEditTask(id_task, title, description, due_date) {
    return `
    <div id="edit-task-${id_task}" class="edit-task centered">  
        <div class="add-task-container-edit">
            <span onclick="closeSmallEditTask(${id_task})" class="close-x-absolute">X</span>  
            
            <form onsubmit="saveEditedTask(${id_task}); return false" class="task-form">
                    <input value="${title}" id="input-title" class="input-title" type="text" placeholder="Enter a title">
                    <div class="description-container">
                        <span>Description</span>
                        <textarea id="textarea" placeholder="Enter a description">${description}</textarea>
                    </div>
                    <div class="due-date-container">
                        <label class="label-flex" for="due-date">Due date<input value="${due_date}" placeholder="dd/mm/yyyy" id="due-date" type="date"></label>
                    </div>
                    <div class="priority-btn-container">
                        <a id="urgent-btn-${id_task}" class="urgent-btn priority" onclick="setPrioritySmallEditTask('Urgent', ${id_task})">Urgent <img id="urgent-btn-priority-img-${id_task}" class="priority-urgent-img" src="kanban_img/priority_icons/urgent-red.png"></a>
                        <a id="medium-btn-${id_task}" class="medium-btn priority" onclick="setPrioritySmallEditTask('Medium', ${id_task})">Medium <img  id="medium-urgent-btn-priority-img-${id_task}" class="priority-urgent-img" src="kanban_img/priority_icons/middle-urgent-orange.png"></a>
                        <a id="non-urgent-btn-${id_task}" class="non-urgent-btn priority" onclick="setPrioritySmallEditTask('Low', ${id_task})">Low <img id="non-urgent-btn-priority-img-${id_task}" class="priority-urgent-img" src="kanban_img/priority_icons/non-urgent-green.png"></a>
                    </div>
                    

                    <div class="contacts-container">
                        <div class="add-option d-none">
                            <input id="add-contact-input" class="add-option-input" type="text" placeholder="Contact email">
                            <div class="add-option-btn-container">
                                <img onclick="closeAddContact(0)" class="close-x-blue-btn" src="kanban_img/close_icons/close_x_blue.png">
                                <img onclick="addNewContactOption(0)" class="blue-clear-btn" src="kanban_img/clear_icons/blue_clear.png">
                            </div>
                        </div>
                        <div class="custom-select" id="contacts">
                            ${templateCustomSelect(id_task)}
                        </div>
                    </div>
                    <div class="margin align-right">
                        <button class="create-btn">Ok <img class="white-clear" src="kanban_img/clear_icons/white_clear.png"/></button>
                    </div>
            </form>          
        </div>
    </div>
    `
}


function templateCustomSelect(id_task) {
    return `<div onclick="showCustomSelectOptionEditTask(${id_task})" class="first-select-option-container">
                <span id="first-select-contacts" class="first-select-option">Select contacts to assign</span>
                <img class="arrow-down" src="kanban_img/arrow_icons/arrow_select.png" />
            </div>

            <div class="custom-select-options-container d-none">
            <div class="custom-select-contact-container">

            </div> 
            <label onclick="showAddContact(0)" class="custom-select-option">Invite new contact <img src="kanban_img/invite_contact.png"></label>
            </div>`
}

function templateShowTaskInfo(userTaskId, id_task, j) {
    return `
    <div id="small-board-task-info-${id_task}" class="small-board-task-info centered">
                <div class="close-btn-container-task-info">
                    <span onclick="closeBoardTaskInfo()" class="close-x-right-side">X</span>
                </div>
                <div>
                    <span class="task-topic-info white-text">${userTaskId.category}</span>
                </div>

                <div class="board-task-info-text margin">
                    <h1>${userTaskId.title}</h1>
                    <span>${userTaskId.description}</span>
                </div>

                <div class="board-task-info-date margin">
                    <b>Due Date:</b><span class="margin-left">${userTaskId["due-date"]}</span>
                </div>

                <div class="board-task-info-priority margin">
                    <b>Priority:</b> <span class="task-info-priority margin-left">${userTaskId.priority}<img class="margin-left" src="${userTaskId.priority_img_path}"></span>
                </div>

                <b>Assigned To:</b>
                <div id="assigned-personal-${j}" class="assigned-personal">

                </div>

                <div class="board-task-edit-btn-container">
                    <button onclick="deleteTask(${id_task})" class="delete-task-btn red"><img src="kanban_img/icons8-trash-can.svg" class="delete-task-btn-img"></button>
                    <button onclick="renderSmallEditTask(${id_task},'${userTaskId.title}','${userTaskId.description}','${userTaskId["due-date"]}','${userTaskId.priority}')" class="edit-btn light-blue"><img class="edit-pen-height" src="kanban_img/edit_icons/edit_pen_white.png"></button>
                </div>
            </div>
    `
}

function templateSmallAddTask() {
    return `
    <div id="small-add-task">
        <span onclick="closeSmallAddTask()" class="close-x-absolute">X</span>
        
        <div class="small-add-task-container">
             <h2>Add Task</h2> <button onclick="saveTask()" class="create-btn">Create Task <img class="white-clear" src="kanban_img/clear_icons/white_clear.png"></button>
        </div>

        <div>
        <div>
            <form onkeyup="enableButton()" class="task-form">
                <input id="input-title" class="input-title" type="text" placeholder="Enter a title" >

                <div class="contacts-container contacts-add-task">
                    <div class="add-option d-none">
                        <input id="add-contact-input" class="add-option-input" type="text" placeholder="Contact email" >
                        <div class="add-option-btn-container">
                            <img onclick="closeAddContact(0)" class="close-x-blue-btn" src="kanban_img/close_icons/close_x_blue.png">
                            <img onclick="addNewContactOption(0)" class="blue-clear-btn" src="kanban_img/clear_icons/blue_clear.png">
                        </div>
                    </div>

                    <div class="custom-select" id="contacts">
                        <div onclick="showCustomSelectOptions(0)" class="first-select-option-container">
                            <span id="first-select-contacts" class="first-select-option">Select contacts to assign</span>
                            <img class="arrow-down" src="kanban_img/arrow_icons/arrow_select.png" />
                        </div>
                        <div class="custom-select-options-container-add-task d-none" >
                            <div class="custom-select-contact-container">

                            </div> 
                            <label onclick="showAddContact(0)" class="custom-select-option">Invite new contact <img src="kanban_img/invite_contact.png"></label>
                        </div>
                    </div>
                    
                </div>

                <div class="due-date-container">
                    <label class="label-flex" for="due-date">Due date<input placeholder="dd/mm/yyyy" id="due-date" type="date" ></label>
                </div>

                <div class="task-category-container">
                            <div class="add-option d-none">
                                <input id="add-category-input" class="add-option-input" type="text" placeholder="New category name" >
                                <div class="add-option-btn-container">
                                    <img onclick="closeAddContact(1)" class="close-x-blue-btn" src="kanban_img/close_icons/close_x_blue.png">
                                    <img onclick="addNewContactOption(1)" class="blue-clear-btn" src="kanban_img/clear_icons/blue_clear.png">
                                </div>
                            </div>

                            <div class="custom-select" id="task-category">
                                <div onclick="showCustomSelectOptions(1)" class="first-select-option-container">
                                    <span id="first-select-task-category" class="first-select-option">Select task category</span>
                                    <img class="arrow-down" src="kanban_img/arrow_icons/arrow_select.png"/>
                                </div>
                                <div class="custom-select-options-container-add-task d-none">
                                    <label onclick="showAddContact(1)" class="custom-select-option">New Category</label>
                                    <div class="custom-select-category-container">
                                        <label onclick="returnSelectedCategory(id)" id="Sales" class="custom-select-option-category">Sales <span class="category-color pink"></span></label>
                                        <label onclick="returnSelectedCategory(id)" id="Backoffice" class="custom-select-option-category">Backoffice <span class="category-color turquoise"></span></label>       
                                    </div>
                                </div>
                            </div>
                            
                        </div>


                <div class="priority-btn-container">
                    <a id="urgent-btn" class="urgent-btn priority" onclick="setPriority(id)">Urgent <img id="urgent-btn-priority-img" class="priority-urgent-img" src="kanban_img/priority_icons/urgent-red.png"></a>
                    <a id="medium-btn" class="medium-btn priority" onclick="setPriority(id)">Medium <img  id="medium-btn-priority-img" class="priority-urgent-img" src="kanban_img/priority_icons/middle-urgent-orange.png"></a>
                    <a id="non-urgent-btn" class="non-urgent-btn priority" onclick="setPriority(id)">Low <img id="non-urgent-btn-priority-img" class="priority-urgent-img" src="kanban_img/priority_icons/non-urgent-green.png"></a>
                </div>
                <div class="description-container">
                    <span>Description</span>
                    <textarea id="textarea" placeholder="Enter a description"></textarea>
                </div>

                <div class="category-container">

                    <img class="plus-select-subtask" src="kanban_img/plus_icons/plus_blue.png">

                    <label class="category-label" for="subtask-category">Subtask<input onclick="showAddSubtask()" id="subtask-category" placeholder="Add new subtask" type="text"></label>
                    
                    <div class="add-option-subtask d-none">
                        <input id="add-subtask-input" class="add-option-input" type="text" placeholder="Add new subtask">
                        <div class="add-option-btn-container-subtask">
                            <img onclick="closeAddSubtask()" class="close-x-blue-btn" src="kanban_img/close_icons/close_x_blue.png">
                            <img onclick="addNewSubtask()" class="blue-clear-btn" src="kanban_img/clear_icons/blue_clear.png">
                        </div>
                    </div>   
                    
                </div>
               
            </form>
        </div>
        `
}

function templateContactInformation(email, name, i) {
    return `
    <div class="contact-information-upper-part">
        <div class="user-icon user-icon-big fs-22">${getUserIcon(contact_names[i])}</div>
        <div class="contact-information-name-container">
            <h1 class="contact-information-name">${contact_names[i]}</h1>
            <div onclick="renderSmallAddTask()" class="contact-information-add-task-container"><img src="kanban_img/plus_icons/plus_blue.png"> <span class="light-blue-text">Add Task</span></div>
        </div>
    </div>

    <div class="contact-information-lower-part">
        <div class="contact-information-edit">
            <h3 class="contact-information-headline">Contact Information</h3>
            <div onclick="renderSmallEditContacts('${contact_names[i]}','${contact_emails[i]}','${contact_phones[i]}',${i})" class="contact-information-edit-container"><img src="kanban_img/edit_icons/edit_pen_blue.png"> <span>Edit Contact</span></div>
        </div>

        <div class="contact-information-email-container">
            <h4>Email</h4>
            <span class="darkblue-text">${contact_emails[i]}</span>
        </div>

        <div class="contact-information-mobil-container">
            <h4>Mobil</h4>
            <span>${contact_phones[i]}</span>
        </div>

    </div>
`
}


function templateContactInformationMobile(email, name, i) {
    return `
    <div class="contact-information-mobile">
        <p class="light-blue-text">Kanban Project Management Tool</p>
        <div class="legal-notice-arrow-container">
                <a class="d-flex-end" href="./contacts.html"><img class="arrow" src="kanban_img/arrow_icons/blue_arrow.png"></a>
        </div>
        <div class="contact-information-upper-part">
            <div class="user-icon user-icon-big fs-22">${getUserIcon(name)}</div>
            <div class="contact-information-name-container">
                <h1 class="contact-information-name">${name}</h1>
                <div onclick="renderSmallAddTask()" class="contact-information-add-task-container"><img src="kanban_img/plus_icons/plus_blue.png"> <span class="light-blue-text">Add Task</span></div>
            </div>
        </div>      
        <div class="contact-information-lower-part">
            <div class="contact-information-edit">
                <h3 class="contact-information-headline">Contact Information</h3>
                <div onclick="renderSmallEditContacts('${name}','${email}','${contact_phones[i]}')" class="contact-information-edit-container"><img src="kanban_img/edit_icons/edit_pen_blue.png"> <span>Edit Contact</span></div>
            </div>      
            <div class="contact-information-email-container">
                <h4>Email</h4>
                <span class="darkblue-text">${email}</span>
            </div>      
            <div class="contact-information-mobil-container">
                <h4>Mobil</h4>
                <span>${contact_phones[i]}</span>
            </div>      
            <div class="margin d-flex-end">
                <button onclick="renderSmallEditContactsMobile('${name}','${email}','${contact_phones[i]}' ,${i})" class="edit-btn light-blue"><img class="edit-pen-height" src="kanban_img/edit_icons/edit_pen_white.png"></button>
            </div>  
        </div>
    </div>

`
}

function templateContactsLeft(firstLetterContainer) {
    return `
    <div id="contacts-${firstLetterContainer}" class="contacts-container d-none">

      <div id="contacs-${firstLetterContainer}-headline" class="contacts-headline">
          <span>${firstLetterContainer}</span>
      </div>

      <div class="contacts-${firstLetterContainer}-data">
      
      </div>
    </div>
    `
}

function templateContactUserInContactBook(contact) {
    return `
    <div onclick="renderContactInformation('${contact.contact_email}', '${contact.contact_name}')" class="contact-info">
    <div class="user-icon-background-color-container">
        <div id="${contact.contact_name}" class="user-icon">${getUserIcon(contact.contact_name)}</div>
    </div>
    <div class="contact-data">
        <h3 id="${contact.contact_name}-name" class="contact-name">${contact.contact_name}</h3>
        <span id="${contact.contact_email}-email" class="darkblue-text">${contact.contact_email}</span>
        <span id="${contact.contact_phone}-phone" class="d-none">${contact.contact_phone}</span>
    </div>
    </div>
    `
}

function templateUserContactAddContact(small_add_contacts_name, small_add_contacts_email, small_add_contacts_phone) {
    return `
    <div onclick="renderContactInformation('${small_add_contacts_email}', '${small_add_contacts_name}')" class="contact-info">
      <div class="user-icon-container">
        <div id="${small_add_contacts_name}" class="user-icon">${getUserIcon(small_add_contacts_name)}</div>
      </div>
      <div class="contact-data">
        <h3 id="${small_add_contacts_email}-name" class="contact-name">${small_add_contacts_name}</h3>
        <span id="${small_add_contacts_email}-email" class="darkblue-text">${small_add_contacts_email}</span>
        <span id="${small_add_contacts_email}-phone" class="d-none">${small_add_contacts_phone}</span>
      </div>
    </div>
    `
}


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


