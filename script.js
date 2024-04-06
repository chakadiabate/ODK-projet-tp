// Get the required HTML elements
const taskContainer = document.querySelector('.task-container');
const taskNameInput = document.querySelector('#task-name');
const taskPriorityInput = document.querySelector('#task-priority');
const taskDateInput = document.querySelector('#task-date');
const addTaskButton = document.querySelector('#add-task');

// Function to create a new task element
// Fonction pour créer un élément de tâche
function createTaskElement(name, priority, date) {
  const taskElement = document.createElement('div');
  taskElement.classList.add('task');

  const taskName = document.createElement('span');
  taskName.textContent = name;
  taskElement.appendChild(taskName);

  const taskPriority = document.createElement('span');
  taskPriority.textContent = `Priorité: ${priority}`;
  taskElement.appendChild(taskPriority);

  const taskDate = document.createElement('span');
  taskDate.textContent = `Date: ${date}`;
  taskElement.appendChild(taskDate);

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.textContent = 'Supprimer';
  taskElement.appendChild(deleteButton);

  return taskElement;
}

// Fonction pour afficher les tâches dans un tableau
function displayTasksInTable(tasks) {
  // Créer le tableau
  const table = document.createElement('table');

  // Créer la ligne d'en-tête
  const headerRow = document.createElement('tr');
  const headerName = document.createElement('th');
  headerName.textContent = 'Nom';
  headerRow.appendChild(headerName);
  const headerPriority = document.createElement('th');
  headerPriority.textContent = 'Priorité';
  headerRow.appendChild(headerPriority);
  const headerDate = document.createElement('th');
  headerDate.textContent = 'Date';
  headerRow.appendChild(headerDate);
  table.appendChild(headerRow);

  // Ajouter chaque tâche comme une ligne de tableau
  for (const task of tasks) {
    const taskElement = createTaskElement(task.name, task.priority, task.date);

    // Ajout de l'écouteur d'événement sur le bouton
    taskElement.querySelector('.delete-button').addEventListener('click', () => {
      deleteTask(taskElement);
    });

    table.appendChild(taskElement);
  }

  // Ajouter le tableau au DOM
  const targetContainer = document.getElementById('targetContainer');
  targetContainer.appendChild(table);
}

// Fonction pour supprimer une tâche
function deleteTask(taskElement) {
  taskElement.parentNode.removeChild(taskElement);
}

// Exemple d'utilisation
const tasks = [
  { name: 'Terminer le rapport', priority: 'Haute', date: '2024-04-10' },
  { name: 'Faire les courses', priority: 'Moyenne', date: '2024-04-07' },
  { name: 'Séance de sport', priority: 'Basse', date: '2024-04-08' },
];

displayTasksInTable(tasks);





// Function to handle the "Ajouter" button click
function handleAddTask() {
  const name = taskNameInput.value.trim();
  const priority = taskPriorityInput.value;
  const date = taskDateInput.value;

  if (!name) {
    alert('Veuillez entrer un nom de tâche.');
    return;
  }

  const taskElement = createTaskElement(name, priority, date);
  taskContainer.appendChild(taskElement);

  // Clear the input fields
  taskNameInput.value = '';
  taskPriorityInput.value = '';
  taskDateInput.value = '';
}

// Add an event listener to the "Ajouter" button
addTaskButton.addEventListener('click', handleAddTask);