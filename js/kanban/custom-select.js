/**
 * Show options in add task
 *
 * @param {integer} index - array number for the selected option
 *
 */

function showCustomSelectOptions(index) {
  let selects = document.querySelectorAll(
    ".custom-select-options-container-add-task"
  );

  if (
    document.getElementById("addTask-body") ||
    document.getElementById("contacts-body") ||
    document.getElementById("board-body")
  ) {
    selects[index].classList.toggle("d-none");
  }
}

/**
 * show options in edit task
 *
 * @param {integer} index - array number for the selected option
 */

function showCustomSelectOptionEditTask(id_task) {
  document.querySelectorAll(
    ".custom-select-options-container"
  )[id_task].classList.toggle("d-none");
}

// function showCustomSelectOptionsTaskInfo(id_task) {
//   document
//     .querySelectorAll(".custom-select-options-task-info-container")[id_task]
//     .classList.toggle("d-none");
// }

/**
 * removes the first option container
 *
 * @param {integer} index - array number of option container
 */

function showAddContact(index) {
  let custom_select = document.querySelectorAll(".custom-select");
  let add_option = document.querySelectorAll(".add-option")
  let arrow_down = document.querySelectorAll(".arrow-down");

  console.log(add_option);

  custom_select[index].classList.add("d-none");
  arrow_down[index].classList.add("d-none");
  add_option[index].classList.remove("d-none");
}


function showAddTask(index, id) {
  let custom_select = document.querySelectorAll(".custom-select");
  let add_option = document.querySelectorAll(id);
  let arrow_down = document.querySelectorAll(".arrow-down");

  console.log(add_option);

  custom_select[index].classList.add("d-none");
  arrow_down[index].classList.add("d-none");
  add_option[index].classList.remove("d-none");
}

/**
 * show the first option container again
 *
 * @param {integer} index - array number of option container
 */

function closeAddContact(index) {
  let custom_select = document.querySelectorAll(".custom-select");
  let add_option = document.querySelectorAll(".add-option");
  let arrow_down = document.querySelectorAll(".arrow-down");

  for (let i = 0; i < add_option.length; i++) {
    if (i == index) {
      custom_select[index].classList.remove("d-none");
      arrow_down[index].classList.remove("d-none");
      add_option[index].classList.add("d-none");
    }
  }
}

/**
 * reset selected contact options
 *
 * @param {array} checkboxes - all contact options
 * @param {integer} index - array number of option container
 */

function resetContactOptions(checkboxes, index) {
  for (let j = 0; j < checkboxes.length; j++) {
    const checkbox = checkboxes[j];
    if (checkbox.checked) {
      selected_options.pop(selected_options[j]);
    }
  }
  if (selected_options.length == 0) {
    let first_select_contact = document.getElementById("first-select-contacts");
    first_select_contact.innerHTML = `Select contacts to assign`;
  }
  if (index == 0) {
    addSelectContactOption(index);
  }
}

/**
 * add a new contact or category option
 *
 * @param {integer} index - array number of option container
 */

function addNewContactOption(index) {
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');

  resetContactOptions(checkboxes, index);

  if (document.getElementById("addTask-body") || document.getElementById("board-body")) {
    let custom_select_category_container_add_task = document.querySelectorAll(".custom-select-options-container-add-task");
    let add_category_input = document.getElementById("add-category-input").value;

    if (index == 1) {
      console.log(custom_select_category_container_add_task);
      custom_select_category_container_add_task[index].innerHTML += `<label onclick="returnSelectedCategory(id)" id="${add_category_input}" class="custom-select-option-category light-green">${add_category_input} <span class="category-color"></span></label>`;
      
      let custom_select_option_category = document.querySelectorAll(".custom-select-option-category")
      removeGreenMarking(custom_select_option_category)

      let category_color = document.querySelectorAll(".category-color");
      setColorCategory(category_color, add_category_input);
    }
    closeAddContact(index);
  }
}

/**
 * set the color for each category
 *
 * @param {array} category_color - array with all random colors
 * @param {string} add_category_input - category name
 */

function setColorCategory(category_color, add_category_input) {
  returnSuitableCategoryColor(category_color, add_category_input, category_color.length - 1);
}

function showAddSubtask() {
  let subtask_category_container = document.querySelector("#subtask-category");
  let add_option_subtask = document.querySelector(".add-option-subtask");
  let plus_select = document.querySelector(".plus-select-subtask");

  subtask_category_container.classList.add("d-none");
  plus_select.classList.add("d-none");
  add_option_subtask.classList.remove("d-none");
}

function closeAddSubtask() {
  let subtask_category_container = document.querySelector("#subtask-category");
  let add_option_subtask = document.querySelector(".add-option-subtask");
  let plus_select = document.querySelector(".plus-select-subtask");

  subtask_category_container.classList.remove("d-none");
  plus_select.classList.remove("d-none");
  add_option_subtask.classList.add("d-none");
}

function addNewSubtask() {
  let category_container = document.querySelector(".category-container");
  let add_subtask_input = document.getElementById("add-subtask-input").value;

  selected_subtasks = [];

  category_container.innerHTML += `<label for="${add_subtask_input}"><input value="${add_subtask_input}" onclick="returnSelectedSubtasks(this)" type="checkbox" id="${add_subtask_input}"><span class="category-span">${add_subtask_input}</span></label>`;
}
