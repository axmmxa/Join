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

function returnSelectedSubtasks(el) {
  if (el.checked) {
    selected_subtasks.push(el.value)
  } else {
    selected_subtasks.pop(el.value)
  }
  
}

function saveTask()  {
    let title = document.getElementById('input-title').value
    let due_date = document.getElementById('due-date').value
    let priority;
    let description = document.getElementById('textarea').value
    
    let task = {
        'title': title,
        'due-date': due_date,
        'description': description,
        'loggedInUser': loggedInUser.name
    }

    addTask(task)  
  }
  
async function addTask(task) {
    tasks.push(task)
    await backend.setItem('tasks', JSON.stringify(task));
  }
