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
            <img class="logo-height" src="kanban_img/login_icons/join_blue.png">
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
                    <button onclick="addContactToBook()" class="create-btn">Create Contact <img class="white-clear" src="kanban_img/clear_icons/white_clear.png"></button>
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


async function renderSmallEditContacts(contact_name,contact_email,contact_phone) {
    if (document.getElementById("edit-small-contacts-container")) {
        document.getElementById("edit-small-contacts-container").classList.remove("d-none")

        document.querySelector("#edit-small-contacts-container").innerHTML =
        `
        <div id="small-contacts-container-close-btn-container" class="blue">
            <span onclick="closeSmallEditContacts()" class="arrow white-text">X</span>
        </div>
        <div class="upper-part-small-contacts blue">
            <img class="logo-height" src="kanban_img/login_icons/join_white.png">
            <h1 class="white-text">Edit Contact</h1>
        </div>

        <div class="lower-part-small-contacts">
        <div id="${contact_name}" class="user-icon-edit-contact user-icon-big fs-22">${getUserIcon(contact_name)}</div>

            <div class="small-contacts-add-data">
                <div class="login-data">
                    <input value="${contact_name}" id="small-edit-contacts-name" type="text" placeholder="Name">
                    <input value="${contact_email}" id="small-edit-contacts-email" type="text" placeholder="E-mail">
                    <input value="${contact_phone}" id="small-edit-contacts-phone" type="text" placeholder="Phone">
                </div>

                <div class="small-contacts-btn-container">
                    <a onclick="saveEditedContact('${contact_email}')" class="create-btn">Save</a>
                </div>
            </div>
        </div>
    
        `


        await downloadFromServer();
        users = JSON.parse(backend.getItem('users')) || [];
        let user_icons = document.querySelectorAll(".user-icon-edit-contact")
        let correctColor;
    
        for (let i = 0; i < users.length; i++) {
            const currentUser = users[i];
            if (currentUser.email == loggedInUser.email) {
              for (let j = 0; j < user_icons.length; j++) {
                for (let k = 0; k < currentUser.contacts.length; k++) {
                  const currentContact = currentUser.contacts[k];
                  BackgroundColorForEditContact[currentContact.contact_name] = currentContact["contact-background-color"]
                }
                for (let [key, value] of Object.entries(BackgroundColorForEditContact)) {
                  if (key == user_icons[j].id) {
                    correctColor = value
                  }
                }
                user_icons[j].classList.add(correctColor)
              }
          }
        }

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
            <img class="logo-height" src="kanban_img/login_icons/join_white.png">
            <h1 class="white-text">Edit Contact</h1>
        </div>

        <div class="lower-part-small-contacts">
        <div id="${contact_name}" class="user-icon-edit-contact user-icon-big fs-22">${getUserIcon(contact_name)}</div>

            <div class="small-contacts-add-data">
                <div class="login-data">
                    <input value="${contact_name}"  id="small-edit-contacts-name" type="text" placeholder="Name">
                    <input value="${contact_email}" id="small-edit-contacts-email" type="text" placeholder="E-mail">
                    <input value="${contact_phone}" id="small-edit-contacts-phone" type="text" placeholder="Phone">
                </div>

                <div class="small-contacts-btn-container">
                    <a onclick="saveEditedContact('${contact_email}')" class="create-btn">Save</a>
                </div>
            </div>
        </div>
    </div>
        `
    }

    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    let user_icons = document.querySelectorAll(".user-icon-edit-contact")
    let correctColor;

    for (let i = 0; i < users.length; i++) {
        const currentUser = users[i];
        if (currentUser.email == loggedInUser.email) {
          for (let j = 0; j < user_icons.length; j++) {
            for (let k = 0; k < currentUser.contacts.length; k++) {
              const currentContact = currentUser.contacts[k];
              BackgroundColorForEditContact[currentContact.contact_name] = currentContact["contact-background-color"]
            }
            for (let [key, value] of Object.entries(BackgroundColorForEditContact)) {
              if (key == user_icons[j].id) {
                correctColor = value
              }
            }
            user_icons[j].classList.add(correctColor)
          }
      }
    }
   
}


function closeSmallEditTask() {
    document.querySelector(".edit-task").classList.add("d-none")

    document.querySelector(".kanban-navbar").style.opacity = 1
    document.querySelector(".kanban-main").style.opacity = 1

}

   function setPrioritySmallEditTask(id) {

    let priorities = document.querySelectorAll('.priority')
    
    for (let index = 0; index < priorities.length; index++) {
      const priority = priorities[index];
      priority.style.color = 'black'
      priority.style.backgroundColor = 'white'
      if(document.getElementById('urgent-btn')) {
        document.getElementById('urgent-btn-priority-img').setAttribute('src', 'kanban_img/priority_icons/urgent-red.png')
      } if (document.getElementById('medium-btn')) {
        document.getElementById('medium-urgent-btn-priority-img').setAttribute('src', 'kanban_img/priority_icons/middle-urgent-orange.png')
      } if(document.getElementById('non-urgent-btn')){
        document.getElementById('non-urgent-btn-priority-img').setAttribute('src', 'kanban_img/priority_icons/non-urgent-green.png')
      }
    }
    
    if(id == 'urgent-btn') {
      document.getElementById(id).style.backgroundColor = 'red'
      document.getElementById('urgent-btn-priority-img').setAttribute('src', 'kanban_img/priority_icons/urgent_white.png')
      document.getElementById(id).style.color = 'white'
      priority_img_path =  'kanban_img/priority_icons/urgent-red.png'
      selected_priority = "Urgent"
    } else if(id == "medium-btn") {
      document.getElementById(id).style.backgroundColor = 'orange'
      document.getElementById('medium-urgent-btn-priority-img').setAttribute('src', 'kanban_img/priority_icons/medium_urgent_white.png')
      document.getElementById(id).style.color = 'white'
      priority_img_path = 'kanban_img/priority_icons/middle-urgent-orange.png'
      selected_priority = "Medium"
    } else if( id == 'non-urgent-btn') {
      document.getElementById(id).style.backgroundColor = 'lightgreen'
      document.getElementById('non-urgent-btn-priority-img').setAttribute('src', 'kanban_img/priority_icons/non_urgent_white.png')
      document.getElementById(id).style.color = 'white'
      priority_img_path = 'kanban_img/priority_icons/non-urgent-green.png'
      selected_priority = "Low"
    }
      
   }

function renderSmallEditTask(id_task) {
    if (document.querySelector(".edit-task")) {
        document.querySelector(".edit-task").classList.remove("d-none")

        document.querySelector(".kanban-navbar").style.opacity = 0.5
        document.querySelector(".kanban-main").style.opacity = 0.5
    } else {
        document.querySelector(".kanban-navbar").style.opacity = 0.5
        document.querySelector(".kanban-main").style.opacity = 0.5

        document.querySelector("body").innerHTML +=

        `
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
    
}

async function showTaskInfo(id_task) {

    for (let i = 0; i < users.length; i++) {
        console.log(users)
        const currentUser = users[i];            
        if (currentUser.email == loggedInUser.email) {
            for (let j = 0; j < currentUser.tasks.length; j++) {
                let userTaskId = currentUser.tasks[j]
                if (userTaskId.id_task == id_task) {
                    document.querySelector("body").innerHTML += 
                    `
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
                    console.log(userTaskId.category)
                    getCategoryColorTaskInfo(userTaskId.category)

                    let assignedPersonal = document.querySelector(`#assigned-personal-${j}`)

                            userTaskId.assignedContacts.forEach(contact => {
                                assignedPersonal.innerHTML += 
                                `<div class="d-flex">
                                    <span id="${contact}" class="user-icon-task-info">${getUserIcon(contact)}</span>
                                    <span>${contact}</span> 
                                </div>` 
                            })
                        }
                    }       

                    await downloadFromServer();
            users = JSON.parse(backend.getItem('users')) || [];
            let user_icons = document.querySelectorAll(".user-icon-task-info")
            let correctColor;
            
            for (let i = 0; i < users.length; i++) {
                const currentUser = users[i];
                if (currentUser.email == loggedInUser.email) {
                    for (let j = 0; j < user_icons.length; j++) {
                      for (let k = 0; k < currentUser.contacts.length; k++) {
                        const currentContact = currentUser.contacts[k];
                        BackgroundColorForBoardTaskInfo[currentContact.contact_name] = currentContact["contact-background-color"]
                      }
                      for (let [key, value] of Object.entries(BackgroundColorForBoardTaskInfo)) {
                        if (key == user_icons[j].id) {
                          correctColor = value
                        }
                      }
                      user_icons[j].classList.add(correctColor)
                    }
                }
            }

                }
            }
            
}


function getCategoryColorTaskInfo(category) {
    
  let task_topics = document.querySelectorAll(".task-topic-info")
  console.log(task_topics.length)

  switch(category) {
    case "Backoffice": 
      task_topics[task_topics.length - 1].classList.add("turquoise")
      break;
    case "Sales":
      task_topics[task_topics.length - 1].classList.add("pink")
      break;
    case "Media":
      task_topics[task_topics.length - 1].classList.add("yellow")
      break;
    case "Design":
      task_topics[task_topics.length - 1].classList.add("orange")
      break;
    case "Marketing":
      task_topics[task_topics.length - 1].classList.add("blue")
      break;
    } 
  }


function closeBoardTaskInfo() {
    document.querySelectorAll(".small-board-task-info").forEach(small_board_task_info => {
        small_board_task_info.classList.add("d-none")
    })
    
    document.querySelector(".kanban-navbar").style.opacity = 1
    document.querySelector(".kanban-main").style.opacity = 1
}


function renderBoardTaskInfo(id_task) {

    if(document.getElementById(`small-board-task-info-${id_task}`)) {
        document.getElementById(`small-board-task-info-${id_task}`).classList.remove("d-none")

        document.querySelector(".kanban-navbar").style.opacity = 0.5
        document.querySelector(".kanban-main").style.opacity = 0.5

        //showTaskInfo(id_task)
    } else {
        showTaskInfo(id_task)
        
        document.querySelector(".kanban-navbar").style.opacity = 0.5
        document.querySelector(".kanban-main").style.opacity = 0.5
    
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
}

 async function renderContactInformation(email, name) {
    let index = contact_emails.indexOf(email)

   // getUserColor()
   
    for (let i = 0; i < contact_names.length; i++) {

        if (i == index) {
             
    document.querySelector("#contact-information").innerHTML = 
    `
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
    }

    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    let correctColor;

    for (let i = 0; i < users.length; i++) {
        const currentUser = users[i];
        for (let j = 0; j < currentUser.contacts.length; j++) {
            
            if (currentUser.contacts[j].contact_name == name) {
                for (let j = 0; j < currentUser.contacts.length; j++) {
                    const currentContact = currentUser.contacts[j];
                    console.log("current contact", currentContact)
                    correctColor = currentContact["contact-background-color"]
                    if(currentContact.contact_email == email) {
                       document.querySelectorAll(".user-icon")[currentUser.contacts.length].classList.add(correctColor)
                    }
                    
                }
            }
   
        }   
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

    renderSavedContacts()

}

function renderSavedContacts() {
    
    for (let i = 0; i < users.length; i++) {
        const currentUser = users[i];
        if(currentUser.email == loggedInUser.email){
              for (let j = 0; j < currentUser.contacts.length; j++) {
                const contact = currentUser.contacts[j];
                users.pop(contact)

                contact_emails.push(contact.contact_email)
                contact_names.push(contact.contact_name)
                contact_phones.push(contact.contact_phone)
    
        let first_letter = contact.contact_name[0].toUpperCase()

        document.querySelector(`.contacts-${first_letter}-data`).innerHTML += 
        `
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
        }
    }
    getUserColor()
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
        "contact_phone": small_add_contacts_phone,
        "contact-background-color": ""
        }

   
    for (let i = 0; i < users.length; i++) {
        const currentUser = users[i];
  
        if(currentUser.email == loggedInUser.email){
              currentUser.contacts.push(contact)
            //   getUserColor()
        }
    }

    await backend.setItem('users', JSON.stringify(users))

    let first_letter = small_add_contacts_name[0].toUpperCase()

    document.querySelector(`.contacts-${first_letter}-data`).innerHTML += 
        `
        <div onclick="renderContactInformation('${small_add_contacts_email}')" class="contact-info">
        <div class="user-icon-container">
            <div class="user-icon">${getUserIcon(small_add_contacts_name)}</div>
        </div>
        <div class="contact-data">
            <h3 id="${small_add_contacts_email}-name" class="contact-name">${small_add_contacts_name}</h3>
            <span id="${small_add_contacts_email}-email" class="darkblue-text">${small_add_contacts_email}</span>
            <span id="${small_add_contacts_email}-phone" class="d-none">${small_add_contacts_phone}</span>
        </div>
    </div>
        `
        // getUserColor()
        // loadContactBackgroundColor()
        location.reload()
        
    }

    