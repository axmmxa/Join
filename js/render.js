function renderSmallEditTask() {
    document.querySelector("body").innerHTML +=

        `
    <div class="edit-task">  
    <div class="add-task-container-edit">
    
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
            
            <span class="assigned-headline-outside">Assigned to:</span>
            <div class="contacts-container">
                <select name="contacts" id="contacts">
                    <option value="">select contacts to assign</option>
                    <option value="">contact1</option>
                    <option value="">contact2</option>
                    <option value="">contact3</option>
                </select>
                <img class="arrow-select" src="img/kanban_logo/arrow_select.png" />
            </div>

            <div class="margin align-right">
                <button class="create-btn">Ok <img class="white-clear" src="img/kanban_logo/white_clear_btn.png"/></button>
            </div>

        </form>
        
    </div>
    </div>

    `
}


function renderSmallContacts() {
    document.querySelector("body").innerHTML +=
        `
        <div id="small-contacts-container">
            <div id="small-contacts-container-close-btn-container" class="light-blue">
                <span class="arrow white-text">X</span>
            </div>
            <div class="upper-part-small-contacts light-blue">
                <img class="logo-height" src="img/form_logo/logo_white.png">
                <h1 class="white-text">Add Contact</h1>
                <span class="white-text">Tasks are better in a team</span>
            </div>

            <div class="lower-part-small-contacts">
                <img class="anonymous-profile-picture" src="img/form_logo/anonym_profile_picture.png">

                <form class="small-contacts-add-data">
                    <div class="login-data">
                        <input id="small-add-contacts-name" type="text" placeholder="Name">
                        <input id="small-add-contacts-email" type="text" placeholder="E-mail">
                        <input id="small-add-contacts-phone" type="text" placeholder="Phone">
                    </div>

                    <div class="small-contacts-btn-container">
                        <button class="delete-btn">Cancel <span class="close-x">X</span></button>
                        <button class="create-btn">Create Contact <img class="white-clear" src="img/kanban_logo/white_clear_btn.png"></button>
                    </div>
                </form>
            </div>
        </div>
        `
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

function renderContactInformation() {
    // document.querySelector("").innerHTML = 
    `
        <div id="contact-information">
                <div class="contact-information-upper-part">
                    <img src="img/form_logo/anonym_profile_picture.png" class="anonymous-profile-picture">
                    <div class="contact-information-name-container">
                        <h1 class="contact-information-name">Vorname Nachname</h1>
                        <div class="contact-information-add-task-container"><img src="img/kanban_logo/plus_blue.png"> <span class="light-blue-text">Add Task</span></div>
                    </div>
                </div>

                <div class="contact-information-lower-part">
                    <div class="contact-information-edit">
                        <h3 class="contact-information-headline">Contact Information</h3>
                        <div class="contact-information-edit-container"><img src="img/kanban_logo/edit_pen.png"> <span>Edit Contact</span></div>
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
            </div>

        `
}


function renderBoardTaskInfo() {
    // document.querySelector("body").innerHTML += 

    `
    <div id="board-task-info">
                <div class="close-btn-container-task-info">
                    <span class="close-x-right-side">X</span>
                </div>
                <div>
                    <span class="task-topic white-text">Sales</span>
                </div>

                <div class="board-task-info-text margin">
                    <h1>Call Potential Clients</h1>
                    <span>Make the product presentation to prospective buyers</span>
                </div>

                <div class="board-task-info-date margin">
                    <b>Due Date:</b><span class="margin-left">05-08-2022</span>
                </div>

                <div class="board-task-info-priority margin">
                    <b>Priority:</b> <span class="task-info-priority margin-left">Medium <img src="img/kanban_logo/middle-priority-orange.png" alt=""></span>
                </div>

                <b>Assigned To:</b>
                <div class="assigned-personal">

                </div>

                <div class="board-task-edit-btn-container">
                    <button class="edit-btn light-blue"><img class="edit-pen-height" src="img/kanban_logo/edit_pen_white.png"></button>
                </div>
            </div>
    `
}