function closeSmallEditTask() {
    document.getElementById("edit-task-container").style.display = "none"
    closeBoardTaskInfo()
}

function renderSmallEditTask() {
    if (document.getElementById("edit-task-container")) {
        document.getElementById("edit-task-container").style.display = "flex"
    } else {
    document.querySelector("body").innerHTML +=
    `
<div id="edit-task-container" class="edit-task">  
    <div class="add-task-container-edit">

    <div class="align-right">
        <span onclick="closeSmallEditTask()" class="close-x-right-side">X</span>
    </div>

    <form class="task-form">
        <input class="input-title" type="text" placeholder="Enter a title">

        <div class="description-container">
        <span>Description</span>
        <textarea id="textarea" placeholder="Enter a description"></textarea>
        </div>

        <div class="due-date-container">
            <label class="label-flex" for="due-date">Due date<input placeholder="dd/mm/yyyy" id="due-date"type="text"></label>
            <img class="date-img" src="kanban_img/date_icons/date_img.png" />
        </div>

        
        <div class="priority-btn-container">
            <button class="urgent-btn">Urgent <img class="priority-urgent-img" src="kanban_img/"></button>
            <button class="medium-btn">Medium <img  class="priority-urgent-img" src="kanban_img/"></button>
            <button class="non-urgent-btn">Low <img class="priority-urgent-img" src="kanban_img/"></button>
        </div>
        
        <span class="assigned-headline-outside">Assigned to:</span>
        <div class="contacts-container">
            <select name="contacts" id="contacts">
                <option value="">select contacts to assign</option>
                <option value="">contact1</option>
                <option value="">contact2</option>
                <option value="">contact3</option>
            </select>
            <img class="arrow-select" src="kanban_img/arrow_icons/arrow_select.png" />
        </div>

        <div class="margin align-right">
            <button class="create-btn">Ok <img class="white-clear" src="kanban_img/clear_icons/white_clear.png"></button>
        </div>

    </form>
    
</div>
</div>

`
    }
    
}


function closeSmallAddContacts() {
    document.getElementById("small-add-contacts-container").classList.add("d-none")
}


function renderSmallAddContacts() {
    if (document.getElementById("small-add-contacts-container")) {

        document.getElementById("small-add-contacts-container").classList.remove("d-none")

    } else {

    document.querySelector("body").innerHTML +=
    `
    <div id="small-add-contacts-container">
        <div id="small-add-contacts-container-close-btn-container" class="light-blue">
            <span onclick="closeSmallAddContacts()" class="arrow white-text">X</span>
        </div>
        <div class="upper-part-small-add-contacts light-blue">
            <img class="logo-height" src="kanban_img/login_icons/join_white.png">
            <h1 class="white-text">Add Contact</h1>
            <span class="white-text">Tasks are better in a team</span>
        </div>

        <div class="lower-part-small-add-contacts">
            <img class="anonymous-profile-picture" src="kanban_img/user_icons/anonym_profile_picture.png">

            <div class="small-add-contacts-add-data">
                <div class="login-data">
                    <input id="small-add-contacts-name" type="text" placeholder="Name">
                    <input id="small-add-contacts-email" type="text" placeholder="E-mail">
                    <input id="small-add-contacts-phone" type="text" placeholder="Phone">
                </div>

                <div class="small-add-contacts-btn-container">
                    <button class="delete-btn">Cancel <span class="close-x">X</span></button>
                    <button onclick="addToContactBook()" class="create-btn">Create Contact <img class="white-clear" src="kanban_img/clear_icons/white_clear.png"></button>
                </div>
            </div>
        </div>
    </div>
    `
    }

}


function renderSmallEditContacts() {
    document.querySelector("body").innerHTML +=
        `
    <div id="small-contacts-container">
        <div id="small-contacts-container-close-btn-container" class="blue">
            <span class="arrow white-text">X</span>
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

function addToContactBook() {
    let name = document.getElementById("small-add-contacts-name").value
    let email = document.getElementById("small-add-contacts-email").value
    let phone = document.getElementById("small-add-contacts-phone").value

    let first_letter = name[0].toUpperCase()

    document.getElementById(`contacts-infobox-${first_letter}`).innerHTML += 
        `
        <div onclick="renderContactInformation()" class="contact-info">
        <div>
            <img class="contact-img" src="kanban_img/user_icons/user_example.png">
        </div>
        <div class="contact-data">
            <h3 class="contact-name">${name}</h3>
            <span class="darkblue-text">${email}</span>
        </div>
        </div>
        `


    
    document.getElementById("small-add-contacts-container").classList.add("d-none")

    name = ""
    email = ""
    phone = ""

}

function renderContactInformation() {
    document.querySelector("#contact-information").innerHTML = 
    `
            <div class="contact-information-upper-part">
                <img src="kanban_img/user_icons/anonym_profile_picture.png" class="anonymous-profile-picture">
                <div class="contact-information-name-container">
                    <h1 class="contact-information-name">Vorname Nachname</h1>
                    <div class="contact-information-add-task-container"><img src="kanban_img/plus_icons/plus_blue.png"> <span class="light-blue-text">Add Task</span></div>
                </div>
            </div>

            <div class="contact-information-lower-part">
                <div class="contact-information-edit">
                    <h3 class="contact-information-headline">Contact Information</h3>
                    <div class="contact-information-edit-container"><img src="kanban_img/edit_icons/edit_pen_blue.png"> <span>Edit Contact</span></div>
                </div>

                <div class="contact-information-email-container">
                    <h4>Email</h4>
                    <span class="darkblue-text">atom@gmail.com</span>
                </div>

                <div class="contact-information-mobil-container">
                    <h4>Mobil</h4>
                    <span>+49 111 111 111</span>
                </div>

            </div>
        
    `   
    
}

function closeBoardTaskInfo() {
    document.getElementById("board-task-info").style.display = "none"
}

function renderBoardTaskInfo() {
    if (document.getElementById("board-task-info")) {
        document.getElementById("board-task-info").style.display = "flex"
    } else {
    document.querySelector("body").innerHTML += 
    `
    <div id="board-task-info">
                <div class="close-btn-container-task-info">
                    <span onclick="closeBoardTaskInfo()" class="close-x-right-side">X</span>
                </div>
                <div>
                    <span class="task-topic white-text">Sales</span>
                </div>

                <div class="board-task-info-text">
                    <h1>Call Potential Clients</h1>
                    <span>Make the product presentation to prospective buyers</span>
                </div>

                <div class="board-task-info-date margin">
                    <b>Due Date:</b><span class="margin-left">05-08-2022</span>
                </div>

                <div class="board-task-info-priority margin">
                    <b>Priority:</b> <span class="task-info-priority margin-left">Medium <img src="kanban_img/priority_icons/non-urgent-green.png"></span>
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


function getSpecificContactInfo(element) {
    console.log(element)   
}

function renderContactBook() {
    let alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    
    for (let i = 0; i < alphabet.length; i++) {
        const first_letter = alphabet[i];

        document.querySelector(".contacts-left").innerHTML += 
        `
        <div class="contacts-box">

        <div id="contacts-box-${first_letter}" class="contacs-box-headline">
            <span>${first_letter}</span>
        </div>

        <div id="contacts-infobox-${first_letter}" class="contacts-box-data">

        </div>
    </div>
        `
    }
      
}

function renderSmallAddTask() {
    if (document.getElementById("small-add-task")) {

        document.getElementById("small-add-task").classList.remove("d-none")

    } else {
        
    document.querySelector("body").innerHTML += 
    `
    <div id="small-add-task">
                <form class="task-form">
                    
                    <div class="align-right">
                        <span onclick="closeSmallAddTask()" class="close-x">X</span>
                    </div>

                    <div class="create-btn-container-small">
                        <h2>Add Task</h2> 
                        <button class="create-btn">Create Task <img class="white-clear" src="kanban_img/clear_icons/white_clear.png"></button>
                    </div>

                    <input class="input-title" type="text" placeholder="Enter a title">

                    <div class="contacts-container">
                        <select name="contacts" id="contacts">
                            <option value="">select contacts to assign</option>
                            <option value="">contact1</option>
                            <option value="">contac2</option>
                            <option value="">contact2</option>
                        </select>
                        <img class="arrow-select" src="kanban_img/arrow_icons/arrow_select.png" />
                    </div>

                    <div class="due-date-container">
                        <label class="label-flex" for="due-date">Due date<input placeholder="dd/mm/yyyy" id="due-date"type="text"></label>
                        <img class="date-img" src="kanban_img/date_icons/date_img.png" />
                    </div>

                    <div class="task-category-container">
                        <select name="task-category" id="task-category">
                            <option value="">assign task category</option>
                            <option value="">New Category</option>
                            <option value="">Sales</option>
                            <option value="">Backoffice</option>
                        </select>
                        <img class="arrow-select" src="kanban_img/arrow_icons/arrow_select.png" />
                    </div>

                    <div class="priority-btn-container">
                        <button class="urgent-btn">Urgent <img class="priority-urgent-img" src="kanban_img/priority_icons/urgent-red.png"></button>
                        <button class="medium-btn">Medium <img  class="priority-urgent-img" src="kanban_img/priority_icons/middle-urgent-orange.png"></button>
                        <button class="non-urgent-btn">Low <img class="priority-urgent-img" src="kanban_img/priority_icons/non-urgent-green.png"></button>
                    </div>
                    <div class="description-container">
                        <span>Description</span>
                        <textarea name="" id="textarea" placeholder="Enter a description"></textarea>
                    </div>

                    <div class="category-container">
                        <label class="category-label" for="category">Subtask<input id="category" placeholder="Add new subtask" type="text"></label>
                        <label for="subtask"><input type="checkbox" id="subtask"><span class="category-span">Subtask</span></label>
                    </div>
                </form>
            </div>
    `
    }

}

function closeSmallAddTask() {
    document.getElementById("small-add-task").classList.add("d-none")
}