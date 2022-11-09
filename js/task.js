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
  first_select_task_category.innerHTML = id
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
    
  for (let i = 0; i < users.length; i++) {
    const currentUser = users[i];
    
    for (let j = 0; j < currentUser.tasks.length; j++) {
      const currentTask = currentUser.tasks[j];
      if (id_task == currentTask.id_task) {
        console.log(currentTask)
        currentTask.title = title
        currentTask.assignedContacts = selected_options
        currentTask["due_date"] = due_date
        currentTask.description = description
        currentTask.priority = selected_priority
        currentTask.priority_img_path = priority_img_path
        saveUsersArray() 
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

  id = JSON.parse(localStorage.getItem("task_id"))
  
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
      'description': description,
      'subtask': selected_subtasks,
      'id_task': id,
      'status':'todo',
  }
  addTask(task, id)
  
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
  } else if( id == 'non-urgent-btn') {
    document.getElementById(id).style.backgroundColor = 'lightgreen'
    document.getElementById('non-urgent-btn-priority-img').setAttribute('src', 'kanban_img/priority_icons/non_urgent_white.png')
    document.getElementById(id).style.color = 'white'
    priority_img_path = 'kanban_img/priority_icons/non-urgent-green.png'
    selected_priority = "Low"
  }
  
 }


 function searchTask() {

  let input = document.getElementById("search-task").value;

  console.log(input)

  input = input.toLowerCase();

  // if (input == "") {
  //     document.querySelectorAll(`.added-task`).forEach(entry => {
  //         entry.style.display = "block"
  //     });
  // }

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