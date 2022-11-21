function showCustomSelectOptions(index) {
  let selects = document.querySelectorAll(".custom-select-options-container");

  if (
    document.getElementById("addTask-body") ||
    document.getElementById("contacts-body") || document.getElementById("board-body")
  ) {
    selects[index].classList.toggle("d-none");
  } else {
    selects[selects.length - 1].classList.toggle("d-none");
  }
}

function showCustomSelectOptionsTaskInfo() {
  document
    .querySelector(".custom-select-options-task-info-container")
    .classList.toggle("d-none");
}

function showAddContact(index) {
  let custom_select = document.querySelectorAll(".custom-select");
  let add_option = document.querySelectorAll(".add-option");
  let arrow_down = document.querySelectorAll(".arrow-down");

  console.log(add_option);

  custom_select[index].classList.add("d-none");
  arrow_down[index].classList.add("d-none");
  add_option[index].classList.remove("d-none");
}

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

function addNewContactOption(index) {
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');

  resetContactOptions(checkboxes, index);

  if (document.getElementById("addTask-body")) {
    let custom_select_category_container = document.querySelector(".custom-select-category-container");
    let add_category_input = document.getElementById("add-category-input").value;

    custom_select_category_container.innerHTML += `<label onclick="returnSelectedCategory(id)" id="${add_category_input}" class="custom-select-option-category">${add_category_input} <span class="category-color"></span></label>`;
    let category_color = document.querySelectorAll(".category-color");

    setColorCategory(category_color, add_category_input);
    closeAddContact(index)
  }

}

function setColorCategory(category_color, add_category_input) {
  returnSuitableCategoryColor(category_color, add_category_input)
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
