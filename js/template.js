function templateSmallContacts() {
    return  `
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

            <div class="small-contacts-add-data">
                <div class="login-data">
                    <input id="small-add-contacts-name" type="text" placeholder="Name">
                    <input id="small-add-contacts-email" type="text" placeholder="E-mail">
                    <input id="small-add-contacts-phone" type="text" placeholder="Phone">
                </div>

                <div class="small-contacts-btn-container">
                    <button onclick="" class="delete-btn">Cancel <span class="close-x">X</span></button>
                    <button id="add-contact-create-btn" onclick="addContactToBook()" class="create-btn">Create Contact <img class="white-clear" src="kanban_img/clear_icons/white_clear.png"></button>
                </div>
            </div>
        </div>
    </div>
    `
}


function templateSmallEditContacts(contact_name,contact_email,contact_phone,i) {
    return  `
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

        <form onsubmit="saveEditedContact('${contact_email}'); return false" class="small-contacts-add-data">
            <div class="login-data">
                <input value="${contact_name}" id="small-edit-contacts-name" type="text" placeholder="Name">
                <input value="${contact_email}" id="small-edit-contacts-email" type="text" placeholder="E-mail">
                <input value="${contact_phone}" id="small-edit-contacts-phone" type="text" placeholder="Phone">
            </div>

            <div class="small-contacts-btn-container">
                <button class="create-btn">Save</button>
            </div>
        </form>
    </div>
    </div>
    `
}

function templateParentSmallEditContacts(contact_name,contact_email,contact_phone) {
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

            <form onsubmit="saveEditedContact('${contact_email}'); return false" class="small-contacts-add-data">
                <div class="login-data">
                    <input value="${contact_name}"  id="small-edit-contacts-name" type="text" placeholder="Name">
                    <input value="${contact_email}" id="small-edit-contacts-email" type="text" placeholder="E-mail">
                    <input value="${contact_phone}" id="small-edit-contacts-phone" type="text" placeholder="Phone">
                </div>

                <div class="small-contacts-btn-container">
                    <button class="create-btn">Save</button>
                </div>
            </form>
        </div>
    </div>
        `
}


function templateSmallEditTask(id_task) {
    return   `
    <div id="edit-task" class="edit-task">  
    <div class="add-task-container-edit">
        <div class="align-right"> 
            <span onclick="closeSmallEditTask()" class="close-x-right-side">X</span>  
        </div>
        <form onsubmit="saveEditedTask(${id_task}); return false" class="task-form">
            <input id="input-title" class="input-title" type="text" placeholder="Enter a title">

            <div class="description-container">
            <span>Description</span>
            <textarea name="" id="textarea" placeholder="Enter a description"></textarea>
            </div>

            <div class="due-date-container">
                <label class="label-flex" for="due-date">Due date<input placeholder="dd/mm/yyyy" id="due-date"type="text"></label>
                <img class="date-img" src="kanban_img/date_icons/date_img.png" />
            </div>

            
            <div class="priority-btn-container">
                <a onclick="setPrioritySmallEditTask('urgent-btn')" id="urgent-btn" class="urgent-btn priority">Urgent <img id="urgent-btn-priority-img" class="priority-urgent-img" src="kanban_img/priority_icons/urgent-red.png"></a>
                <a onclick="setPrioritySmallEditTask('medium-btn')" id="medium-btn" class="medium-btn priority">Medium <img id="medium-urgent-btn-priority-img" class="priority-urgent-img" src="kanban_img/priority_icons/middle-urgent-orange.png"></a>
                <a onclick="setPrioritySmallEditTask('non-urgent-btn')" id="non-urgent-btn" class="non-urgent-btn priority">Low <img id="non-urgent-btn-priority-img" class="priority-urgent-img" src="kanban_img/priority_icons/non-urgent-green.png"></a>
            </div>
            
            <div class="assigned-to">
                <span >Assigned to:</span>
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
                <div onclick="showCustomSelectOptionsTaskInfo()" class="first-select-option-container">
                    <span id="first-select-contacts" class="first-select-option">Select contacts to assign</span>
                </div>
                <div class="custom-select-options-task-info-container d-none" >
                    <label class="custom-select-option">You <input onclick="returnSelectedContacts(this)" value="You" class="selected-option" type="checkbox"></label>
                    <label class="custom-select-option"> Maximilian Vogel <input onclick="returnSelectedContacts(this)" value="Maximilian Vogel" class="selected-option" type="checkbox"></label>   
                </div>
            </div>
            <img onclick="showAddContact(0)" id="plus-select-contact" class="plus-select" src="kanban_img/plus_icons/plus_blue.png" />
            </div>

            <div class="margin align-right">
                <button class="create-btn">Ok <img class="white-clear" src="kanban_img/clear_icons/white_clear.png"/></button>
            </div>

        </form>
        
    </div>
    </div>

    `
}

function templateShowTaskInfo(userTaskId, id_task,j) {
    return  `
    <div id="small-board-task-info-${id_task}" class="small-board-task-info">
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
                    <button onclick="renderSmallEditTask(${id_task})" class="edit-btn light-blue"><img class="edit-pen-height" src="kanban_img/edit_icons/edit_pen_white.png"></button>
                </div>
            </div>
    `
}

function templateSmallAddTask() {
    return  `
    <div id="small-add-task">
        <div class="align-right">
            <span onclick="closeSmallAddTask()" class="close-x-right-side">X</span>
        </div>

        <div class="small-add-task-container">
             <h2>Add Task</h2> <button onclick="saveTask()" class="create-btn">Create Task <img class="white-clear" src="kanban_img/clear_icons/white_clear.png"></button>
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
                <a onclick="setPrioritySmallEditTask('urgent-btn')" id="urgent-btn" class="urgent-btn priority">Urgent <img class="priority-urgent-img" id="urgent-btn-priority-img" src="kanban_img/priority_icons/urgent-red.png"></a>
                <a onclick="setPrioritySmallEditTask('medium-btn')" id="medium-btn" class="medium-btn priority">Medium <img  class="priority-urgent-img" id="medium-urgent-btn-priority-img" src="kanban_img/priority_icons/middle-urgent-orange.png"></a>
                <a onclick="setPrioritySmallEditTask('non-urgent-btn')" id="non-urgent-btn" class="non-urgent-btn priority">Low <img class="priority-urgent-img" id="non-urgent-btn-priority-img" src="kanban_img/priority_icons/non-urgent-green.png"></a>
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

function templateContactInformation(email,name,i) {
    return  `
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


function templateContactInformationMobile(email,name,i) {
    return  `
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
            <div onclick="renderSmallEditContacts('${contact_names[i]}','${contact_emails[i]}','${contact_phones[i]}')" class="contact-information-edit-container"><img src="kanban_img/edit_icons/edit_pen_blue.png"> <span>Edit Contact</span></div>
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

if (document.getElementById("summary-body")) {
    document.querySelector(".task-urgent").addEventListener("click", () => {
        location.href = "board.html"
    })
    
    document.querySelector(".task-card-upper").addEventListener("click", () => {
        location.href = "board.html"
    })
    
    for (let i = 1; i <=  document.querySelectorAll(".task-card-lower").length; i++) {
        document.querySelector(`#task-card-lower-${i}`).addEventListener("click", () => {
            location.href = "board.html"
        })
    }
    
}


