function closeSmallContacts() {
    document.getElementById("small-contacts-container").classList.add("d-none")

    document.querySelector(".kanban-navbar").style.opacity = 1
    document.querySelector(".kanban-main").style.opacity = 1    
}

function renderSmallContacts() {
    if ( document.getElementById("small-contacts-container")) {
        document.getElementById("small-contacts-container").classList.remove("d-none")

        document.querySelector(".kanban-navbar").style.opacity = 0.5
        document.querySelector(".kanban-main").style.opacity = 0.5    
    } else {
        document.querySelector(".kanban-navbar").style.opacity = 0.5
        document.querySelector(".kanban-main").style.opacity = 0.5   

        document.querySelector("body").innerHTML +=
    `
    <div id="small-contacts-container">
        <div id="small-contacts-container-close-btn-container" class="light-blue">
            <span onclick="closeSmallContacts()" class="arrow white-text">X</span>
        </div>
        <div class="upper-part-small-contacts light-blue">
            <img class="logo-height" src="img/form_logo/logo_white.png">
            <h1 class="white-text">Add Contact</h1>
            <span class="white-text">Tasks are better in a team</span>
        </div>

        <div class="lower-part-small-contacts">
            <img class="anonymous-profile-picture" src="img/form_logo/anonym_profile_picture.png">

            <div class="small-contacts-add-data">
                <div class="login-data">
                    <input id="small-add-contacts-name" type="text" placeholder="Name">
                    <input id="small-add-contacts-email" type="text" placeholder="E-mail">
                    <input id="small-add-contacts-phone" type="text" placeholder="Phone">
                </div>

                <div class="small-contacts-btn-container">
                    <button onclick="" class="delete-btn">Cancel <span class="close-x">X</span></button>
                    <button onclick="addContactToBook()" class="create-btn">Create Contact <img class="white-clear" src="img/kanban_logo/white_clear_btn.png"></button>
                </div>
            </div>
        </div>
    </div>
    `
    }

}

function closeSmallEditContacts() {
    document.getElementById("edit-small-contacts-container").classList.add("d-none")

    document.querySelector(".kanban-navbar").style.opacity = 1
    document.querySelector(".kanban-main").style.opacity = 1
}


function renderSmallEditContacts() {
    if (document.getElementById("edit-small-contacts-container")) {
        document.getElementById("edit-small-contacts-container").classList.remove("d-none")

        document.querySelector(".kanban-navbar").style.opacity = 0.5
        document.querySelector(".kanban-main").style.opacity = 0.5
    } else {
        document.querySelector(".kanban-navbar").style.opacity = 0.5
        document.querySelector(".kanban-main").style.opacity = 0.5

        document.querySelector("body").innerHTML +=
        `
    <div id="edit-small-contacts-container">
        <div id="small-contacts-container-close-btn-container" class="blue">
            <span onclick="closeSmallEditContacts()" class="arrow white-text">X</span>
        </div>
        <div class="upper-part-small-contacts blue">
            <img class="logo-height" src="img/form_logo/logo_white.png">
            <h1 class="white-text">Edit Contact</h1>
        </div>

        <div class="lower-part-small-contacts">
            <img class="anonymous-profile-picture" src="img/form_logo/anonym_profile_picture.png">

            <form class="small-contacts-add-data">
                <div class="login-data">
                    <input id="small-edit-contacts-name" type="text" placeholder="Name">
                    <input id="small-edit-contacts-email" type="text" placeholder="E-mail">
                    <input id="small-edit-contacts-phone" type="text" placeholder="Phone">
                </div>

                <div class="small-contacts-btn-container">
                    <button class="create-btn">Save</button>
                </div>
            </form>
        </div>
    </div>
        `
    }
   
}

function renderContactInformation(email) {
    let index = contact_emails.indexOf(email)

    for (let i = 0; i < contact_names.length; i++) {
        if (i == index) {
             
    document.querySelector("#contact-information").innerHTML = 
    `
                <div class="contact-information-upper-part">
                    <img src="img/form_logo/anonym_profile_picture.png" class="anonymous-profile-picture">
                    <div class="contact-information-name-container">
                        <h1 class="contact-information-name">${contact_names[i]}</h1>
                        <div onclick="renderSmallAddTask()" class="contact-information-add-task-container"><img src="img/kanban_logo/plus_blue.png"> <span class="light-blue-text">Add Task</span></div>
                    </div>
                </div>

                <div class="contact-information-lower-part">
                    <div class="contact-information-edit">
                        <h3 class="contact-information-headline">Contact Information</h3>
                        <div onclick="renderSmallEditContacts()" class="contact-information-edit-container"><img src="img/kanban_logo/edit_pen.png"> <span>Edit Contact</span></div>
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
        
    }
   
}

function closeSmallEditTask() {
    document.querySelector(".edit-task").classList.add("d-none")

    document.querySelector(".kanban-navbar").style.opacity = 1
    document.querySelector(".kanban-main").style.opacity = 1

    closeBoardTaskInfo()
}


function renderSmallEditTask() {
    if (document.querySelector(".edit-task")) {
        document.querySelector(".edit-task").classList.remove("d-none")

        document.querySelector(".kanban-navbar").style.opacity = 0.5
        document.querySelector(".kanban-main").style.opacity = 0.5
    } else {
        document.querySelector(".kanban-navbar").style.opacity = 0.5
        document.querySelector(".kanban-main").style.opacity = 0.5

        document.querySelector("body").innerHTML +=

        `
    <div class="edit-task">  
    <div class="add-task-container-edit">
        <div class="align-right"> 
            <span onclick="closeSmallEditTask()" class="close-x-right-side">X</span>  
        </div>
        <form class="task-form">
            <input class="input-title" type="text" placeholder="Enter a title">

            <div class="description-container">
            <span>Description</span>
            <textarea name="" id="textarea" placeholder="Enter a description"></textarea>
            </div>

            <div class="due-date-container">
                <label class="label-flex" for="due-date">Due date<input placeholder="dd/mm/yyyy" id="due-date"type="text"></label>
                <img class="date-img" src="img/kanban_logo/date_img.png" />
            </div>

            
            <div class="priority-btn-container">
                <button class="urgent-btn">Urgent <img class="priority-urgent-img" src="img/kanban_logo/urgent-red.png"></button>
                <button class="medium-btn">Medium <img  class="priority-urgent-img" src="img/kanban_logo/middle-priority-orange.png"></button>
                <button class="non-urgent-btn">Low <img class="priority-urgent-img" src="img/kanban_logo/non-urgent-green.png"></button>
            </div>
            
            <div class="small-edit-task-assigned-contacts">
                <span class="assigned-headline-outside">Assigned to:</span>
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
                <div onclick="showCustomSelectOptions(0)" class="first-select-option-container">
                    <span id="first-select-contacts" class="first-select-option">Select contacts to assign</span>
                </div>
                <div class="custom-select-options-container d-none" >
                    <label class="custom-select-option">You <input onclick="returnSelectedContacts(this)" value="You" class="selected-option" type="checkbox"></label>
                    <label class="custom-select-option"> Maximilian Vogel <input onclick="returnSelectedContacts(this)" value="Maximilian Vogel" class="selected-option" type="checkbox"></label>   
                </div>
            </div>
            <img onclick="showAddContact(0)" id="plus-select-contact" class="plus-select" src="kanban_img/plus_icons/plus_blue.png" />
            </div>

            <div class="margin align-right">
                <button class="create-btn">Ok <img class="white-clear" src="img/kanban_logo/white_clear_btn.png"/></button>
            </div>

        </form>
        
    </div>
    </div>

    `
    }
    
}


function closeBoardTaskInfo() {
    document.getElementById("small-board-task-info").classList.add("d-none")

    document.querySelector(".kanban-navbar").style.opacity = 1
    document.querySelector(".kanban-main").style.opacity = 1
}

function renderBoardTaskInfo(element) {

    if(document.getElementById("small-board-task-info")) {
        document.getElementById("small-board-task-info").classList.remove("d-none")

        document.querySelector(".kanban-navbar").style.opacity = 1
        document.querySelector(".kanban-main").style.opacity = 1
    } else {
        document.querySelector(".kanban-navbar").style.opacity = 0.5
        document.querySelector(".kanban-main").style.opacity = 0.5

        document.querySelector("body").innerHTML += 
    `
    <div id="small-board-task-info">
                <div class="close-btn-container-task-info">
                    <span onclick="closeBoardTaskInfo()" class="close-x-right-side">X</span>
                </div>
                <div>
                    <span class="task-topic white-text">${element.category}</span>
                </div>

                <div class="board-task-info-text margin">
                    <h1>${element.title}</h1>
                    <span>${element.description}</span>
                </div>

                <div class="board-task-info-date margin">
                    <b>Due Date:</b><span class="margin-left">${element["due-date"]}</span>
                </div>

                <div class="board-task-info-priority margin">
                    <b>Priority:</b> <span class="task-info-priority margin-left"><img src="${element.priority}"></span>
                </div>

                <b>Assigned To:</b>
                <div class="assigned-personal">

                </div>

                <div class="board-task-edit-btn-container">
                    <button onclick="renderSmallEditTask()" class="edit-btn light-blue"><img class="edit-pen-height" src="kanban_img/edit_icons/edit_pen_white.png"></button>
                </div>
            </div>
    `
    }
    
}

function closeSmallAddTask() {
    document.getElementById("small-add-task").classList.add("d-none")
    
    document.querySelector(".kanban-navbar").style.opacity = 1
    document.querySelector(".kanban-main").style.opacity = 1
    
}

function renderSmallAddTask() {
    if (document.getElementById("small-add-task")) {
        document.getElementById("small-add-task").classList.remove("d-none")

        document.querySelector(".kanban-navbar").style.opacity = 0.5
        document.querySelector(".kanban-main").style.opacity = 0.5
            
    } else {
        document.querySelector(".kanban-navbar").style.opacity = 0.5
        document.querySelector(".kanban-main").style.opacity = 0.5

        document.querySelector("body").innerHTML += 
    `
    
    <div id="small-add-task">
        <div class="align-right">
            <span onclick="closeSmallAddTask()" class="close-x-right-side">X</span>
        </div>

        <div class="small-add-task-container">
             <h2>Add Task</h2> <button class="create-btn">Create Task <img class="white-clear" src="kanban_img/clear_icons/white_clear.png"></button>
        </div>

        <form class="task-form">
            <input id="input-title" class="input-title" type="text" placeholder="Enter a title">

            <div class="contacts-container">
                <div class="add-option d-none">
                    <input id="add-contact-input" class="add-option-input" type="text" placeholder="Contact email">
                    <div class="add-option-btn-container">
                        <img onclick="closeAddContact(0)" class="close-x-blue-btn" src="kanban_img/close_icons/close_x_blue.png">
                        <img onclick="addNewContactOption(0)" class="blue-clear-btn" src="kanban_img/clear_icons/blue_clear.png">
                    </div>
                </div>

                <div class="custom-select" id="contacts">
                    <div onclick="showCustomSelectOptions(0)" class="first-select-option-container">
                        <span id="first-select-contacts" class="first-select-option">Select contacts to assign</span>
                    </div>
                    <div class="custom-select-options-container d-none" >
                        <label class="custom-select-option">You <input onclick="returnSelectedContacts(this)" value="You" class="selected-option" type="checkbox"></label>
                        <label class="custom-select-option"> Maximilian Vogel <input onclick="returnSelectedContacts(this)" value="Maximilian Vogel" class="selected-option" type="checkbox"></label>   
                    </div>
                </div>
                <img onclick="showAddContact(0)" id="plus-select-contact" class="plus-select" src="kanban_img/plus_icons/plus_blue.png" />
            </div>

            <div class="due-date-container">
                <label class="label-flex" for="due-date">Due date<input placeholder="dd/mm/yyyy" id="due-date"type="text"></label>
                <img class="date-img" src="kanban_img/date_icons/date_img.png" />
            </div>

            <div class="task-category-container">
                <div class="add-option d-none">
                    <input id="add-contact-input" class="add-option-input" type="text" placeholder="New category name">
                    <div class="add-option-btn-container">
                        <img onclick="closeAddContact(1)" class="close-x-blue-btn" src="kanban_img/close_icons/close_x_blue.png">
                        <img onclick="addNewContactOption(1)" class="blue-clear-btn" src="kanban_img/clear_icons/blue_clear.png">
                    </div>
                </div>

                <div class="custom-select" id="task-category">
                    <div onclick="showCustomSelectOptions(1)" class="first-select-option-container">
                        <span id="first-select-task-category" class="first-select-option">Select task category</span>
                    </div>
                    <div class="custom-select-options-container d-none">
                        <label onclick="returnSelectedCategory(id)" id="Sales" class="custom-select-option">Sales</label>
                        <label onclick="returnSelectedCategory(id)" id="Backoffice" class="custom-select-option">Backoffice</label>   
                    </div>
                </div>
                <img onclick="showAddContact(1)" class="plus-select" src="kanban_img/plus_icons/plus_blue.png" />
            </div>

            <div class="priority-btn-container">
                <button class="urgent-btn">Urgent <img class="priority-urgent-img" src="kanban_img/priority_icons/urgent-red.png"></button>
                <button class="medium-btn">Medium <img  class="priority-urgent-img" src="kanban_img/priority_icons/middle-urgent-orange.png"></button>
                <button class="non-urgent-btn">Low <img class="priority-urgent-img" src="kanban_img/priority_icons/non-urgent-green.png"></button>
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

    </div>

    `
    }
}

function renderContactBook() {
    let alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

    for (let i = 0; i < alphabet.length; i++) {
        const letter = alphabet[i];
        
        document.querySelector(".contacts-left").innerHTML += 
        `
        <div id="contacts-${letter}" class="contacts-container">

        <div id="contacs-${letter}-headline" class="contacts-headline">
            <span>${letter}</span>
        </div>

        <div class="contacts-${letter}-data">
            
        </div>
    </div>

        `

    }

}

function renderSavedContacts() {

    for (let i = 0; i < users.length; i++) {
        const currentUser = users[i];
        if(currentUser.email == loggedInUser.email){
              for (let j = 0; j < currentUser.contacts.length; j++) {
                const contact = currentUser.contacts[j];
                users.pop(contact)
                let first_letter = contact.contact_name[0].toUpperCase()

    document.querySelector(`.contacts-${first_letter}-data`).innerHTML += 
        `
        <div onclick="renderContactInformation('${contact.contact_email}')" class="contact-info">
        <div>
            <img class="contact-img" src="kanban_img/user_icons/user_example.png">
        </div>
        <div class="contact-data">
            <h3 id="${contact.contact_name}-name" class="contact-name">${contact.contact_name}</h3>
            <span id="${contact.contact_email}-email" class="darkblue-text">${contact.contact_email}</span>
            <span id="${contact.contact_phone}-phone" class="d-none">${contact.contact_phone}</span>
        </div>
    </div>
        `
              }
        }
    }
}


async function addContactToBook() {
    let small_add_contacts_name = document.getElementById("small-add-contacts-name").value
    let small_add_contacts_email = document.getElementById("small-add-contacts-email").value
    let small_add_contacts_phone = document.getElementById("small-add-contacts-phone").value

    contact_names.push(small_add_contacts_name)
    contact_emails.push(small_add_contacts_email)
    contact_phones.push(small_add_contacts_phone)

    let contact = {
        "contact_name": small_add_contacts_name,
        "contact_email": small_add_contacts_email,
        "contact_phone": small_add_contacts_phone
    }
    
    for (let i = 0; i < users.length; i++) {
        const currentUser = users[i];
  
        if(currentUser.email == loggedInUser.email){
              currentUser.contacts.push(contact)
        }
    }

    await backend.setItem('users', JSON.stringify(users))


    let first_letter = small_add_contacts_name[0].toUpperCase()

    document.querySelector(`.contacts-${first_letter}-data`).innerHTML += 
        `
        <div onclick="renderContactInformation('${small_add_contacts_email}')" class="contact-info">
        <div>
            <img class="contact-img" src="kanban_img/user_icons/user_example.png">
        </div>
        <div class="contact-data">
            <h3 id="${small_add_contacts_email}-name" class="contact-name">${small_add_contacts_name}</h3>
            <span id="${small_add_contacts_email}-email" class="darkblue-text">${small_add_contacts_email}</span>
            <span id="${small_add_contacts_email}-phone" class="d-none">${small_add_contacts_phone}</span>
        </div>
    </div>
        `
}