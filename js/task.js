loadLoggedInUser()

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

function returnSelectedSubtasks(el, id) {
  if (el.checked) {
    selected_subtasks.push(el.value)
  }
  else {
    selected_subtasks.pop(el.value)
  }
  
}

function saveTask()  {
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
        'description': description,
        'subtask': selected_subtasks
    }

    addTask(task)  
  }

async function addTask(task) {
    for (let i = 0; i < users.length; i++) {
      const currentUser = users[i];
      if(currentUser.email == loggedInUser.email){
        currentUser.tasks.push(task)
        await backend.setItem('users', JSON.stringify(users));
      }
    }
  }

async function taskToUser() {
  
}  


 function setPriotity(id) {

  let priorities = document.querySelectorAll('.priority')
  
  for (let index = 0; index < priorities.length; index++) {
    const priority = priorities[index];
    priority.style.color = 'black'
    priority.style.backgroundColor = 'white'
    if(document.getElementById('urgent-btn')) {
      document.getElementById('urgent-btn-priority-img').setAttribute('src', '../kanban_img/priority_icons/urgent-red.png')
    } if (document.getElementById('medium-btn')) {
      document.getElementById('medium-btn-priority-img').setAttribute('src', '../kanban_img/priority_icons/middle-urgent-orange.png')
    } if(document.getElementById('non-urgent-btn')){
      document.getElementById('non-urgent-btn-priority-img').setAttribute('src', '../kanban_img/priority_icons/non-urgent-green.png')
    }
  }
  
  if(id== 'urgent-btn') {
    document.getElementById(id).style.backgroundColor = 'red'
    document.getElementById('urgent-btn-priority-img').setAttribute('src', '../kanban_img/priority_icons/urgent_white.png')
    document.getElementById(id).style.color = 'white'
    selected_priority =  'urgent'
  } else if(id == "medium-btn") {
    document.getElementById(id).style.backgroundColor = 'orange'
    document.getElementById('medium-btn-priority-img').setAttribute('src', '../kanban_img/priority_icons/medium_urgent_white.png')
    document.getElementById(id).style.color = 'white'
    selected_priority = 'middle'
  } else if( id == 'non-urgent-btn') {
    document.getElementById(id).style.backgroundColor = 'lightgreen'
    document.getElementById('non-urgent-btn-priority-img').setAttribute('src', '../kanban_img/priority_icons/non_urgent_white.png')
    document.getElementById(id).style.color = 'white'
    selected_priority = 'low'
  }
    
 }