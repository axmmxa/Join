function closeSmallContacts() {
    document.getElementById("small-contacts-container").classList.add("d-none")
    document.getElementById("small-contacts-container").classList.add("z-index-1")

    document.querySelector(".kanban-navbar").style.opacity = 1
    document.querySelector(".kanban-main").style.opacity = 1    
}

function renderSmallContacts() {
    if (document.getElementById("small-contacts-container")) {
        document.querySelector("body").innerHTML += templateSmallContacts()
        document.querySelector("#small-contacts-container").classList.remove("z-index-1")
        // document.getElementById("small-contacts-container").classList.remove("d-none")
    
        document.querySelector(".kanban-navbar").style.opacity = 0.5
        document.querySelector(".kanban-main").style.opacity = 0.5    
    } else {
      document.querySelector("body").innerHTML += templateSmallContacts()
      document.querySelector("#small-contacts-container").classList.remove("z-index-1")
      // document.getElementById("small-contacts-container").classList.remove("d-none")

      document.querySelector(".kanban-navbar").style.opacity = 0.5
      document.querySelector(".kanban-main").style.opacity = 0.5  
           
    }
}

function closeSmallEditContacts(i) {
    document.querySelector(`#small-contacts-container-${i}`).classList.add("d-none");
    document.querySelector(`#small-contacts-container-${i}`).classList.remove("box-shadow");
    document.querySelector(`#edit-small-contacts-container`).classList.add("z-index-1")
     
    document.querySelector(".kanban-navbar").style.opacity = 1
    document.querySelector(".kanban-main").style.opacity = 1
}


function closeSmallEditContactsMobile(i) {
  document.querySelector(`#small-contacts-container-mobile-${i}`).classList.add("d-none");
    // document.querySelector(`#small-contacts-container-mobile-0-${i}`).classList.remove("box-shadow");
    // document.querySelector(`#edit-small-contacts-container`).classList.add("z-index-1")
     
    document.querySelector(".kanban-navbar").style.opacity = 1
    document.querySelector(".kanban-main").style.opacity = 1
}

async function renderSmallEditContactsMobile(contact_name,contact_email,contact_phone, i) {
  if (document.querySelector(`#small-contacts-container-mobile-${i}`)) {
    document.querySelector(`#small-contacts-container-mobile-${i}`).classList.remove("d-none");

    document.querySelector(".kanban-navbar").style.opacity = 0.5
    document.querySelector(".kanban-main").style.opacity = 0.5
  } else {
    document.querySelector(`body`).innerHTML += templateSmallEditContactsMobile(contact_name,contact_email,contact_phone, i)

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
    
  }

     
}



async function renderSmallEditContacts(contact_name,contact_email,contact_phone, i) {
    if (loggedInUser.name !== "Guest") {
          
          document.querySelector(`#edit-small-contacts-container`).innerHTML = templateSmallEditContacts(contact_name,contact_email,contact_phone, i)
          
          document.querySelector(`#small-contacts-container-${i}`).classList.remove("d-none");
          document.querySelector(`#small-contacts-container-${i}`).classList.add("box-shadow");
          document.querySelector(`#edit-small-contacts-container`).classList.remove("z-index-1")
      
          
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

        document.querySelector(`#edit-small-contacts-container`).innerHTML = templateSmallEditContacts(contact_name,contact_email,contact_phone, i)
        document.querySelector(`#small-contacts-container-${i}`).classList.remove("d-none");
        document.querySelector(`#small-contacts-container-${i}`).classList.add("box-shadow")
        document.querySelector(`#edit-small-contacts-container`).classList.remove("z-index-1")
         
        
        let user_icons = document.querySelectorAll(".user-icon-edit-contact")
          let correctColor;

          for (let j = 0; j < user_icons.length; j++) {
            for (let k = 0; k < loggedInUser.contacts.length; k++) {
              const currentContact = loggedInUser.contacts[k];
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

        document.querySelector("body").innerHTML += templateSmallEditTask(id_task)      
    }
}

async function showTaskInfo(id_task) {
    if (loggedInUser.name !== "Guest") {
    for (let i = 0; i < users.length; i++) {
      console.log(users)
      const currentUser = users[i];            
      if (currentUser.email == loggedInUser.email) {
          for (let j = 0; j < currentUser.tasks.length; j++) {
              let userTaskId = currentUser.tasks[j]
              if (userTaskId.id_task == id_task) {
                  document.querySelector("body").innerHTML += templateShowTaskInfo(userTaskId, id_task, j)
                 
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
          
          loadBoardContactBackgroundColor()

          // for (let i = 0; i < users.length; i++) {
          //     const currentUser = users[i];
          //     if (currentUser.email == loggedInUser.email) {
          //         for (let j = 0; j < user_icons.length; j++) {
          //           for (let k = 0; k < currentUser.contacts.length; k++) {
          //             const currentContact = currentUser.contacts[k];
          //             BackgroundColorForBoardTaskInfo[currentContact.contact_name] = currentContact["contact-background-color"]
          //           }
          //           for (let [key, value] of Object.entries(BackgroundColorForBoardTaskInfo)) {
          //             if (key == user_icons[j].id) {
          //               correctColor = value
          //             }
          //           }
          //           user_icons[j].classList.add(correctColor)
          //         }
          //     }
          // }
      }
    } 
  } else {
    for (let j = 0; j < loggedInUser.tasks.length; j++) {
      let userTaskId = loggedInUser.tasks[j]
      if (userTaskId.id_task == id_task) {

          document.querySelector("body").innerHTML += templateShowTaskInfo(userTaskId, id_task, j)
         
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

          let user_icons = document.querySelectorAll(".user-icon-task-info")
          let correctColor;

          for (let j = 0; j < user_icons.length; j++) {
            for (let k = 0; k < loggedInUser.contacts.length; k++) {
              const currentContact = loggedInUser.contacts[k];
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

        document.querySelector("body").innerHTML += templateSmallAddTask()
    }
}

 async function renderContactInformation(email, name) {
    let index = contact_emails.indexOf(email)

    if (loggedInUser.name !== "Guest") {
      for (let i = 0; i < contact_names.length; i++) {
      if (i == index && window.innerWidth > 874) {     
      document.querySelector("#contact-information").innerHTML = templateContactInformation(email,name,i)
      } else {
        document.querySelector(".main-field").innerHTML = templateContactInformationMobile(email,name,i)
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
                  if(currentContact.contact_email == email && window.innerWidth > 874) {
                     document.querySelectorAll(".user-icon")[currentUser.contacts.length].classList.add(correctColor)
                  } else {
                    document.querySelectorAll(".user-icon")[currentUser.contacts.length - 1].classList.add(correctColor)
                    document.querySelector(".main-field").style.justifyContent = "space-between"
                    document.querySelector(".main-field").style.alignItems = ""
                  }
                  
              }
          }
      }   
  }
} else {

  for (let i = 0; i < contact_names.length; i++) {
    if (i == index) {     
    document.querySelector("#contact-information").innerHTML = templateContactInformation(email,name,i)
    } else if (window.innerWidth <= 874) {
      document.querySelector(".main-field").innerHTML = templateContactInformationMobile(email,name,i)
    }
  }

  for (let j = 0; j < loggedInUser.contacts.length; j++) {
    if (loggedInUser.contacts[j].contact_name == name) {
        for (let j = 0; j < loggedInUser.contacts.length; j++) {
            const currentContact = loggedInUser.contacts[j];
            console.log("current contact", currentContact)
            correctColor = currentContact["contact-background-color"]
            if(currentContact.contact_email == email) {
               document.querySelectorAll(".user-icon")[loggedInUser.contacts.length ].classList.add(correctColor)
            }
        }
    }
} 
}

}


function renderContactBook() {
    let alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    let firstLetterContainer;
    for (let i = 0; i < alphabet.length; i++) {
        firstLetterContainer = alphabet[i];
        
        document.querySelector(".contacts-left").innerHTML += 
        `
        <div id="contacts-${firstLetterContainer}" class="contacts-container d-none">

        <div id="contacs-${firstLetterContainer}-headline" class="contacts-headline">
            <span>${firstLetterContainer}</span>
        </div>

        <div class="contacts-${firstLetterContainer}-data">
            
        </div>
    </div>

        `
    }

    renderSavedContacts()

}

function renderSavedContacts() {
    if (loggedInUser.name !== "Guest") {
      
      for (let i = 0; i < users.length; i++) {
        const currentUser = users[i];
        if(currentUser.email == loggedInUser.email){
              for (let j = 0; j < currentUser.contacts.length; j++) {
                const contact = currentUser.contacts[j];
                // users.pop(contact)

                contact_emails.push(contact.contact_email)
                contact_names.push(contact.contact_name)
                contact_phones.push(contact.contact_phone)
    
        let first_letter_contact = contact.contact_name[0].toUpperCase()
                
        document.querySelector(`#contacts-${first_letter_contact}`).classList.remove("d-none")

        document.querySelector(`.contacts-${first_letter_contact}-data`).innerHTML += 
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
  } else {
      for (let j = 0; j < loggedInUser.contacts.length; j++) {
        const contact = loggedInUser.contacts[j];
        // users.pop(contact)

        contact_emails.push(contact.contact_email)
        contact_names.push(contact.contact_name)
        contact_phones.push(contact.contact_phone)
  
      console.log(loggedInUser.contacts.length)
      console.log(j, contact.contact_name)

      let first_letter_contact = contact.contact_name[0].toUpperCase()
              
      document.querySelector(`#contacts-${first_letter_contact}`).classList.remove("d-none")

      document.querySelector(`.contacts-${first_letter_contact}-data`).innerHTML += 
      `
      <div onclick="renderContactInformation('${contact.contact_email}','${contact.contact_name}')" class="contact-info">
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
            getUserColor()
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
        "contact_phone": small_add_contacts_phone,
        "contact-background-color": ""
    }

    if (loggedInUser.name == "Guest") {
      loggedInUser.contacts.push(contact)
      getUserColor()  
    } else {
      for (let i = 0; i < users.length; i++) {
        const currentUser = users[i];
          if(currentUser.email == loggedInUser.email){
            currentUser.contacts.push(contact)
            getUserColor()  
        } 
    }
  }

    if (loggedInUser.name !== "Guest") {  
    let small_add_contacts_name = document.getElementById("small-add-contacts-name").value

    await backend.setItem('users', JSON.stringify(users))
    let first_letter = small_add_contacts_name[0].toUpperCase()

    document.querySelector(`#contacts-${first_letter}`).classList.remove("d-none")

    document.querySelector(`.contacts-${first_letter}-data`).innerHTML += 
        `
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
      loadContactBackgroundColor()
      showPopup("task-popup")
      closeSmallContacts()

    } else {
      let small_add_contacts_name = document.getElementById("small-add-contacts-name").value
  
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser)); 
      let first_letter = small_add_contacts_name[0].toUpperCase()

      document.querySelector(`#contacts-${first_letter}`).classList.remove("d-none")

      document.querySelector(`.contacts-${first_letter}-data`).innerHTML += 
        `
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
        loadContactBackgroundColor()
        showPopup("task-popup")
        closeSmallContacts()
    }
      //  setTimeout(() => {
      //    location.reload(true)
      //  }, 2000)
      
    }

    