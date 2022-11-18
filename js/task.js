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

      switch(id) {
        case "Backoffice": 
          category_color.classList.add("turquoise")
          break;
        case "Sales":
          category_color.classList.add("pink")
          break;
        case "Media":
          category_color.classList.add("yellow")
          break;
        case "Design":
          category_color.classList.add("orange")
          break;
        case "Marketing":
          category_color.classList.add("blue")
          break;
        }  
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
  
    let title = document.getElementById('input-title').value
    let due_date = document.getElementById('due-date').value
    let description = document.getElementById('textarea').value
    
    if (checkIfCreatedTaskIsEmpty(title,due_date,description) && loggedInUser.name !== "Guest") {
      for (let i = 0; i < users.length; i++) {
        const currentUser = users[i];
        for (let j = 0; j < currentUser.tasks.length; j++) {
          const currentTask = currentUser.tasks[j];
          if (id_task == currentTask.id_task) {
            console.log(currentTask)
            currentTask.title = title
            currentTask.assignedContacts = selected_options
            currentTask["due-date"] = due_date
            currentTask.description = description
            currentTask.priority = selected_priority
            currentTask.priority_img_path = priority_img_path
            saveUsersArray() 
          }
        }
      }
    } else {
      for (let j = 0; j < loggedInUser.tasks.length; j++) {
        const currentTask = loggedInUser.tasks[j];
        if (id_task == currentTask.id_task) {
          console.log(currentTask)
          currentTask.title = title
          currentTask.assignedContacts = selected_options
          currentTask["due-date"] = due_date
          currentTask.description = description
          currentTask.priority = selected_priority
          currentTask.priority_img_path = priority_img_path
          saveLoggedInUser()

        }
      }
    }
    
  location.reload(true)
}

async function saveTask()  {
  await downloadFromServer();
  let idTaskFromBackend = parseInt(JSON.parse(backend.getItem('id_task')));

  if (idTaskFromBackend) {
    id = idTaskFromBackend
    console.log(id)
  } 

  if (loggedInUser.name == "Guest") {
    id = JSON.parse(localStorage.getItem("task_id"))
  }
 
  let title = document.getElementById('input-title').value
  let due_date = document.getElementById('due-date').value
  let description = document.getElementById('textarea').value

  let task = {
      'title': title,
      'assignedContacts': selected_options,
      'due-date': due_date,
      'description': description,
      'category': selected_category,
      'priority': selected_priority,
      'priority_img_path': priority_img_path,
      'subtask': selected_subtasks,
      'id_task': id,
      'status':'todo',
  }
  
  if (checkIfCreatedTaskIsEmpty(title,due_date,description)) {
    addTask(task, id)
    showPopup("task-popup")
  }  
}

function checkIfCreatedTaskIsEmpty(title,due_date,description) {
    return title !== "" && due_date !== "" && description !== "" && selected_category !== "" 
            && selected_priority !== "" && priority_img_path !== "" && id !== ""
  }

async function addTask(task,id) {
  if (loggedInUser.name !== "Guest") {
    for (let i = 0; i < users.length; i++) {
      const currentUser = users[i];
      if(currentUser.email == loggedInUser.email){
        // task.task_id = id
        id++
        console.log(id)
        await backend.setItem('id_task', JSON.stringify(id)); 
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

 function setPriotity(id) {

  let priorities = document.querySelectorAll('.priority')
  
  for (let index = 0; index < priorities.length; index++) {
    const priority = priorities[index];
    priority.style.color = 'black'
    priority.style.backgroundColor = 'white'
    if(document.getElementById('urgent-btn')) {
      document.getElementById('urgent-btn-priority-img').setAttribute('src', 'kanban_img/priority_icons/urgent-red.png')
    } if (document.getElementById('medium-btn')) {
      document.getElementById('medium-btn-priority-img').setAttribute('src', 'kanban_img/priority_icons/middle-urgent-orange.png')
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
    document.getElementById('medium-btn-priority-img').setAttribute('src', 'kanban_img/priority_icons/medium_urgent_white.png')
    document.getElementById(id).style.color = 'white'
    priority_img_path = 'kanban_img/priority_icons/middle-urgent-orange.png'
    selected_priority = "Medium"
  } else if(id == 'non-urgent-btn') {
    document.getElementById(id).style.backgroundColor = 'lightgreen'
    document.getElementById('non-urgent-btn-priority-img').setAttribute('src', 'kanban_img/priority_icons/non_urgent_white.png')
    document.getElementById(id).style.color = 'white'
    priority_img_path = 'kanban_img/priority_icons/non-urgent-green.png'
    selected_priority = "Low"
  }
  
 }


function clear() {
    document.getElementById("input-title").value = ""
    document.getElementById("due-date").value = ""

    let checkboxes = document.querySelectorAll('input[type="checkbox"]');

    for (let j = 0; j < checkboxes.length; j++) {
      const checkbox = checkboxes[j];
      if (checkbox.checked) {
        checkbox.checked = false
        selected_options.pop(selected_options[j])
      } 
    }
    
    if (selected_options.length ==  0) {
      document.querySelector("#first-select-contacts").innerHTML = "Select contacts to assign"
    }

    selected_category = ""

    if (selected_category == "") {
      document.querySelector("#first-select-task-category").innerHTML = "Select task category"
    }

    let priorities = document.querySelectorAll('.priority')

    for (let index = 0; index < priorities.length; index++) {
      const priority = priorities[index];
      priority.style.color = 'black'
      priority.style.backgroundColor = 'white'
      if(document.getElementById('urgent-btn')) {
        document.getElementById('urgent-btn-priority-img').setAttribute('src', 'kanban_img/priority_icons/urgent-red.png')
      } if (document.getElementById('medium-btn')) {
        document.getElementById('medium-btn-priority-img').setAttribute('src', 'kanban_img/priority_icons/middle-urgent-orange.png')
      } if(document.getElementById('non-urgent-btn')){
        document.getElementById('non-urgent-btn-priority-img').setAttribute('src', 'kanban_img/priority_icons/non-urgent-green.png')
      }
    }

    priority_img_path = ""
    selected_priority = ""

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

  let tasks = document.querySelectorAll(".task-topic")

  for (let i = 0; i < tasks.length; i++) {
      let task = tasks[i].textContent;
      console.log(task)
      document.getElementById(`added-task-${i}`).style.display = "none";

      if (task.includes(input)) {
          document.getElementById(`added-task-${i}`).style.display = "block"
      }
  }

}