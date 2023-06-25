const $modal = document.getElementById("modal");
const $modalEdit = document.getElementById("modalEdit");
const $descriptionInput = document.getElementById("description");
const $priorityInput = document.getElementById("priority");
const $deadline = document.getElementById("deadline");
const $destiny = document.getElementById("destiny");
let tasks = 1;

// functions aux

function createDiv(className) {
  const div = document.createElement("div");
  div.classList.add(className);
  return div;
}

function creatCardContent(bold, content, type) {
  const div = createDiv("info");
  const b = document.createElement("b");
  b.innerText = bold;
  const span = document.createElement("span");
  span.innerText = content;
  span.id = type;
  div.append(b, span);
  return [div, span, b];
}

function createCard() {
  const div = createDiv("card");
  div.id = tasks;
  div.draggable = "true";
  div.innerHTML += "";
  const description = creatCardContent(
    "Descrição: ",
    $descriptionInput.value,
    `description-${tasks}`
  );
  const priority = creatCardContent(
    "Prioridade: ",
    $priorityInput.value,
    `priority-${tasks}`
  );
  const deadline = creatCardContent(
    "Prazo: ",
    $deadline.value,
    `deadline-${tasks}`
  );
  console.log($priorityInput.value);
  div.append(description[0], priority[0], deadline[0]);
  tasks++;
  return [div, description, priority, deadline];
}

// Add new task

function openModal(value) {
  $modal.style.display = "flex";
  if (value == "1") {
    $destiny.value = "1";
  } else if (value == "2") {
    $destiny.value = "2";
  } else if (value == "3") {
    $destiny.value = "3";
  } else if (value == "4") {
    $destiny.value = "4";
  }
}

function closeModal() {
  $modal.style.display = "none";
  $descriptionInput.value = " ";
  $priorityInput.value = "none";
  $deadline.value = "";
  $destiny.value = " ";
}

function create(destiny) {
  const destination = document.querySelector(destiny);
  const card = createCard("card", "info");
  destination.append(card[0]);
}

function createTask() {
  if ($destiny.value == "1") {
    create(".to-doCards");
  } else if ($destiny.value == "2") {
    create(".in-progressCards");
  } else if ($destiny.value == "3") {
    create(".completeCards");
  } else if ($destiny.value == "4") {
    create(".archivedCards");
  }
  closeModal();
  dragAndDrop();
}

//drag and drop

function dragAndDrop() {
  const cards = document.querySelectorAll(".card");
  const dropZones = document.querySelectorAll(".cardslist");

  cards.forEach((card) => {
    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", dragEnd);
  });

  function dragStart() {
    dropZones.forEach((dropzone) => dropzone.classList.add("highlight"));
    this.classList.add("is-dragging");
  }

  function dragEnd() {
    dropZones.forEach((dropzone) => dropzone.classList.remove("highlight"));
    this.classList.remove("is-dragging");
  }

  dropZones.forEach((dropzone) => {
    dropzone.addEventListener("dragover", dragover);
    dropzone.addEventListener("dragleave", dragleave);
    dropzone.addEventListener("drop", drop);
  });

  function dragover() {
    this.classList.add("is-over");
    const cardBeingDragged = document.querySelector(".is-dragging");
    this.appendChild(cardBeingDragged);
  }

  function dragleave() {
    this.classList.remove("is-over");
  }

  function drop() {
    this.classList.remove("is-over");
  }
}
