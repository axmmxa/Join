let id = 0

function returnSelectedContacts(el) {
  let first_select_contact = document.getElementById("first-select-contacts")
  if (el.checked) {
    selected_options.push(el.value)
  } else {
    selected_options.pop(el.value)
  }

  if (selected_options.length == 0) {
    first_select_contact.innerHTML = `Select contacts to assign`
  }
  if (selected_options.length >= 1 || el.checked) {
    first_select_contact.innerHTML = `${selected_options.length} selected contact(s)`
  }
}


function returnSelectedCategory(id) {
  selected_category = id
  let first_select_task_category = document.getElementById("first-select-task-category")
  first_select_task_category.innerHTML = `${id} <div class="category-color-selected"></div>`

  let category_color = document.querySelector(".category-color-selected")

  returnSuitableCategoryColor(category_color, id, "")

}

function returnSelectedSubtasks(el) {
  if (el.checked) {
    selected_subtasks.push(el.value)
  }
  else {
    selected_subtasks.pop(el.value)
  }
}

async function saveEditedTask(id_task) {
 
  id_task = await setIdTaskDependingOnUserName(id_task)

  let edit_title = document.querySelector(`.input-title-${id_task}`).value
  let edit_due_date = document.querySelector(`.due-date-${id_task}`).value
  let edit_description = document.querySelector(`.textarea-${id_task}`).value
 
  if (checkIfEditedTaskIsNotEmpty(edit_title, edit_due_date, edit_description, id_task) && loggedInUser.name !== "Guest") {
    for (let i = 0; i < users.length; i++) {
      const currentUser = users[i];
      await changeTaskJSON(currentUser, id_task, edit_title, edit_due_date, edit_description)
    }
  } else if (checkIfEditedTaskIsNotEmpty(edit_title, edit_due_date, edit_description, id_task)) {
    await changeTaskJSON(loggedInUser, id_task, edit_title, edit_due_date, edit_description)
  }

  closeSmallEditTask(id_task)
  await initBoard()
  // location.reload(true)
}


async function changeTaskJSON(user, id_task, edit_title, edit_due_date, edit_description) {
  let contact_options = document.querySelectorAll(".contact-option")
  selected_options = []
  for (let j = 0; j < contact_options.length; j++) {
    if (contact_options[j].checked == true && selected_options[selected_options.length - 1] !== contact_options[j].value) {
      selected_options.push(contact_options[j].value)
    }
  }

  for (let j = 0; j < user.tasks.length; j++) {
    const currentTask = user.tasks[j];
    if (id_task == j) {
      console.log(currentTask)
      currentTask.title = edit_title
      currentTask.assignedContacts = selected_options
      currentTask["due-date"] = edit_due_date
      currentTask.description = edit_description
      currentTask.priority = selected_priority
      currentTask.priority_img_path = priority_img_path
      await saveDependingOnUserName()
    }
  }
}

function setId(idTaskFromBackend) {
  if (idTaskFromBackend) {
    id = idTaskFromBackend
    console.log(id)
  }

  if (loggedInUser.name == "Guest") {
    id = JSON.parse(localStorage.getItem("task_id"))
  }
}

function returnTaskJSON(title, due_date, description) {
  console.log(selected_options)
  return {
    'title': title,
    'assignedContacts': selected_options,
    'due-date': due_date,
    'description': description,
    'category': selected_category,
    'priority': selected_priority,
    'priority_img_path': priority_img_path,
    'subtask': selected_subtasks,
    'id_task': id,
    'status': 'todo',
  }
}

function styleCorrectButtonAccordingToSuccesOrFailure(title, due_date, description, task, id) {
  if (checkIfCreatedTaskIsEmpty(title, due_date, description)) {
    document.querySelector(".create-btn").style.border = '1px solid rgb(0, 255, 0)';
   
    console.log(task)
    addTask(task, id)
    if (document.querySelector("#addTask-body") || document.querySelector("#board-body")) {
      showPopup("task-popup")
    }
  } else {
    document.querySelector(".create-btn").style.border = '1px solid rgb(255, 0, 0)';
    
  }
}

async function saveTask() {
  await downloadFromServer();
  let idTaskFromBackend = parseInt(JSON.parse(backend.getItem('id_task')));

  setId(idTaskFromBackend)

  let title = document.getElementById('input-title').value
  let due_date = document.getElementById('due-date').value
  let description = document.getElementById('textarea').value

  let task = returnTaskJSON(title, due_date, description)
  
  styleCorrectButtonAccordingToSuccesOrFailure(title, due_date, description, task, id)

  if (document.querySelector("#board-body")) {
    await initBoard()
    closeSmallAddTask()
    document.querySelector(".create-btn").disabled = true
    document.querySelector(".create-btn").style.border = "1px solid rgba(0, 0, 0, 0.2)"
    document.querySelector(".create-btn").style.backgroundColor = "#95bcff"
    document.querySelector(".create-btn").style.boxShadow = "none"
  } else {
    clearForm()
    document.querySelector(".create-btn").disabled = true
    document.querySelector(".create-btn").style.border = "1px solid rgba(0, 0, 0, 0.2)"
    document.querySelector(".create-btn").style.backgroundColor = "#95bcff"
    document.querySelector(".create-btn").style.boxShadow = "none"
    if (document.querySelector("#contacts-body")) {
      showPopup("task-popup")
      closeSmallAddTask()
    }
    // setTimeout(() => {
    //   window.location.href = "board.html"  
    // }, 1000);
  }
}

function enableEditTaskButton(id, id_task) {
  
  let edit_title = document.querySelector(`.input-title-${id_task}`).value
  let edit_due_date = document.querySelector(`.due-date-${id_task}`).value
  let edit_description = document.querySelector(`.textarea-${id_task}`).value

  if (checkIfEditedTaskIsNotEmpty(edit_title, edit_due_date, edit_description)) {
    document.querySelector(`${id}`).style.backgroundColor = "#4589FF"
    document.querySelector(`${id}`).disabled = false 

    document.querySelector(`${id}`).addEventListener("mouseover", () => {
      document.querySelector(`${id}`).style.backgroundColor = "blue"
      document.querySelector(`${id}`).style.boxShadow = "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
    })
    
    document.querySelector(`${id}`).addEventListener("mouseout", () => {
      document.querySelector(`${id}`).style.backgroundColor = "#4589FF"
      document.querySelector(`${id}`).style.boxShadow = "none"
    })
  } else {
    document.querySelector(`${id}`).disabled = true
    document.querySelector(`${id}`).style.backgroundColor = "#95bcff"
  }
}


function enableButton(id) {
  if (window.innerWidth < 684) {
    id = ".create-btn-mobile"
  }
  
  let title = document.querySelector("#input-title").value
  let due_date = document.querySelector("#due-date").value
  let description = document.querySelector("#textarea").value

  if (checkIfCreatedTaskIsEmpty(title, due_date, description)) {
    document.querySelector(`${id}`).style.backgroundColor = "#4589FF"
    document.querySelector(`${id}`).disabled = false 

    document.querySelector(`${id}`).addEventListener("mouseover", () => {
      document.querySelector(`${id}`).style.backgroundColor = "blue"
      document.querySelector(`${id}`).style.boxShadow = "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
    })
    
    document.querySelector(`${id}`).addEventListener("mouseout", () => {
      document.querySelector(`${id}`).style.backgroundColor = "#4589FF"
      document.querySelector(`${id}`).style.boxShadow = "none"
    })

  }
}

function enableAddContactButton(btn, id) {
    if (checkIfContactsInputIsNotEmpty(btn)) {
      document.querySelector(`${id}`).style.backgroundColor = "#4589FF"
      document.querySelector(`${id}`).disabled = false 
  
      document.querySelector(`${id}`).addEventListener("mouseover", () => {
        document.querySelector(`${id}`).style.backgroundColor = "blue"
        document.querySelector(`${id}`).style.boxShadow = "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
      })
      
      document.querySelector(`${id}`).addEventListener("mouseout", () => {
        document.querySelector(`${id}`).style.backgroundColor = "#4589FF"
        document.querySelector(`${id}`).style.boxShadow = "none"
      })
    }
}

function checkIfContactsInputIsNotEmpty(btn) {
  setCorrectInputValueFromAddContact(btn) 
  return small_add_contacts_name !== "" && small_add_contacts_email !== "" && small_add_contacts_phone  !== ""
}

function checkIfCreatedTaskIsEmpty(title, due_date, description) {
  return title !== "" && due_date !== "" && description !== "" && selected_category !== ""
    && selected_priority !== "" && priority_img_path !== "" && id !== ""
}

function checkIfEditedTaskIsNotEmpty(edit_title, edit_due_date, edit_description) {
  return  edit_title !== "" && edit_due_date !== "" && edit_description !== "" 
  && selected_priority !== "" && priority_img_path !== ""
}

async function addTask(task, id) {
  if (loggedInUser.name !== "Guest") {
    for (let i = 0; i < users.length; i++) {
      const currentUser = users[i];
      if (currentUser.email == loggedInUser.email) {
        // task.task_id = id
        id++
        console.log(id)
        await backend.setItem('id_task', JSON.stringify(id));
        console
        currentUser.tasks.push(task)
        await backend.setItem('users', JSON.stringify(users));
      }
    }
  } else {
    id++
    console.log(id)
    localStorage.setItem("task_id", JSON.stringify(id));
    loggedInUser.tasks.push(task)
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    console.log(loggedInUser)
  }
}

function setPriority(id) {
  let priorities = document.querySelectorAll('.priority')

  for (let index = 0; index < priorities.length; index++) {
    const priority = priorities[index];
    priority.style.color = 'black'
    priority.style.backgroundColor = 'white'
    if (document.getElementById('urgent-btn')) {
      document.getElementById('urgent-btn-priority-img').setAttribute('src', 'kanban_img/priority_icons/urgent-red.png')
    } if (document.getElementById('medium-btn')) {
      document.getElementById('medium-btn-priority-img').setAttribute('src', 'kanban_img/priority_icons/middle-urgent-orange.png')
    } if (document.getElementById('non-urgent-btn')) {
      document.getElementById('non-urgent-btn-priority-img').setAttribute('src', 'kanban_img/priority_icons/non-urgent-green.png')
    }
  }

  if (id == 'urgent-btn') {
    changeStyleSelectedPriorityButton('red', 'kanban_img/priority_icons/urgent_white.png', 'white', 'kanban_img/priority_icons/urgent-red.png', 'Urgent', id, "urgent-btn-priority-img")
  } else if (id == "medium-btn") {
    changeStyleSelectedPriorityButton('orange', 'kanban_img/priority_icons/medium_urgent_white.png', 'white', 'kanban_img/priority_icons/middle-urgent-orange.png', 'Medium', id, "medium-btn-priority-img")
  } else if (id == 'non-urgent-btn') {
    changeStyleSelectedPriorityButton('lightgreen', 'kanban_img/priority_icons/non_urgent_white.png', 'white', 'kanban_img/priority_icons/non-urgent-green.png', 'Low', id, "non-urgent-btn-priority-img")
  }

}


function changeStyleSelectedPriorityButton(backgroundColor, reset_img_path, color, img_path, priority, id, id_img) {
  document.getElementById(id).style.backgroundColor = backgroundColor
  document.getElementById(id_img).setAttribute('src', reset_img_path)
  document.getElementById(id).style.color = color
  priority_img_path = img_path
  selected_priority = priority
}

function clearForm() {
  clearFirstPart()
  clearSecondPart()
  clearThirdPart()
  clearFourthPart()
}

function clearFirstPart() {
  document.getElementById("input-title").value = ""
  document.getElementById("due-date").value = ""

  selected_options = []

  let checkboxes = document.querySelectorAll('input[type="checkbox"]');

  for (let j = 0; j < checkboxes.length; j++) {
    const checkbox = checkboxes[j];
    if (checkbox.checked) {
      checkbox.checked = false
      // selected_options.pop(selected_options[j])
    }
  }
}

function clearSecondPart() {
  if (selected_options.length == 0) {
    document.querySelector("#first-select-contacts").innerHTML = "Select contacts to assign"
  }
  selected_category = ""
  if (selected_category == "") {
    document.querySelector("#first-select-task-category").innerHTML = "Select task category"
  }

}

function clearThirdPart() {
  let priorities = document.querySelectorAll('.priority')

  for (let index = 0; index < priorities.length; index++) {
    const priority = priorities[index];
    priority.style.color = 'black'
    priority.style.backgroundColor = 'white'
    if (document.getElementById('urgent-btn')) {
      document.getElementById('urgent-btn-priority-img').setAttribute('src', 'kanban_img/priority_icons/urgent-red.png')
    } if (document.getElementById('medium-btn')) {
      document.getElementById('medium-btn-priority-img').setAttribute('src', 'kanban_img/priority_icons/middle-urgent-orange.png')
    } if (document.getElementById('non-urgent-btn')) {
      document.getElementById('non-urgent-btn-priority-img').setAttribute('src', 'kanban_img/priority_icons/non-urgent-green.png')
    }
  }
  priority_img_path = ""
  selected_priority = ""
}

function clearFourthPart() {
  document.getElementById("textarea").value = ""
  document.querySelector(".category-container").innerHTML =
    `<div class="category-container">
    <img class="plus-select-subtask" src="kanban_img/plus_icons/plus_blue.png">
    <label class="category-label" for="subtask-category">Subtask<input onclick="showAddSubtask()" id="subtask-category" placeholder="Add new subtask" type="text"></label>
    
    <div class="add-option-subtask d-none">
        <input id="add-subtask-input" class="add-option-input" type="text" placeholder="Add new subtask">
        <div class="add-option-btn-container-subtask">
            <img onclick="closeAddSubtask()" class="close-x-blue-btn" src="kanban_img/close_icons/close_x_blue.png">
            <img onclick="addNewSubtask()" class="blue-clear-btn" src="kanban_img/clear_icons/blue_clear.png">
        </div>
    </div>   
      
  </div>`
}


function searchTask() {
  let input = document.getElementById("search-task").value;
  input = input.toLowerCase();

  let task_headlines = document.querySelectorAll(".task-headline") 
  let tasks = document.querySelectorAll(".task-topic")
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i].textContent.toLowerCase();
    let task_headline = task_headlines[i].textContent.toLowerCase()

    console.log(task)
    document.querySelectorAll(`.added-task`)[i].style.display = "none";
    document.querySelectorAll(`.task-headline`)[i].style.display = "none";

    if (task.includes(input) || task_headline.includes(input)) {
      document.querySelectorAll(`.added-task`)[i].style.display = "block"
      document.querySelectorAll(`.task-headline`)[i].style.display = "block";
    }
  }

}