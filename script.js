// Obtenez les éléments HTML requis
const taskContainer = document.querySelector('.task-container');
const taskNameInput = document.querySelector('#task-name');
const taskPriorityInput = document.querySelector('#task-priority');
const taskDateInput = document.querySelector('#task-date');
const addTaskButton = document.querySelector('#add-task');

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
  deleteButton.classList.add('.deleteButton');
  deleteButton.textContent = 'Supprimer';
  taskElement.appendChild(deleteButton);

  return taskElement;
}
// Fonction pour supprimer une tâche
function deleteButton(taskElement) {
  // Supprimer l'élément HTML du DOM
  taskElement.parentNode.removeChild(taskElement);

  // Trouver l'index de la tâche à supprimer dans le tableau
  const taskIndex = tasks.findIndex(task => task.name === taskElement.querySelector('#task-name').textContent);

  // Supprimer la tâche du tableau
  tasks.splice(taskIndex, 1);

  // Enregistrer les tâches mises à jour dans le localStorage
  saveData(tasks);

}

// Ajouter un écouteur d'événement "click" à chaque bouton de suppression
for (const taskElement of taskContainer.querySelectorAll('.deleteButton')) {
  taskElement.addEventListener('click', () => {deleteButton(taskElement)});
}

// Fonction pour enregistrer les tâches dans le stockage local (localStorage)
function saveData(tasks) {
  // Convertir les tâches en JSON pour un stockage efficace
  const tasksJSON = JSON.stringify(tasks);
  localStorage.setItem('taskList', tasksJSON);
}

// Fonction pour charger les tâches depuis le stockage local (localStorage)
function loadData() {
  const tasksJSON = localStorage.getItem('taskList');
  // Vérifier si des tâches sont stockées avant de les parser
  if (tasksJSON) {
    try {
      // Convertir le JSON en tableau d'objets
      return JSON.parse(tasksJSON);
    } catch (error) {
      console.error('Erreur lors du chargement des tâches:', error);
      // En cas d'erreur de parsing, renvoyer un tableau vide pour éviter les problèmes
      return [];
    }
  } else {
    // Si aucune tâche n'est stockée, renvoyer un tableau vide
    return [];
  }
}

// Initialiser les tâches à partir du stockage local (facultatif)
const tasks = loadData();

// Fonction permettant de gérer le clic du bouton "Ajouter"
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

  // Ajouter la nouvelle tâche au tableau de tâches
  tasks.push({ name, priority, date });

  // Enregistrer les tâches mises à jour dans le stockage local
  saveData(tasks);

  // Effacer les champs de saisie
  taskNameInput.value = '';
  taskPriorityInput.value = '';
  taskDateInput.value = '';
}

// Ajouter un écouteur d'événement au bouton "Ajouter"
addTaskButton.addEventListener('click', handleAddTask);
// Afficher les tâches chargée
for (const task of tasks) {
  const taskElement = createTaskElement(task.name, task.priority, task.date);
  taskContainer.appendChild(taskElement);
}


// Ajuster la largeur du conteneur de tâches en fonction de la taille de l'écran (facultatif)
function adjustTaskContainerWidth() {
  const screenWidth = window.innerWidth;
  if (screenWidth < 768) {
    taskContainer.style.width = '100%'; // Définir la pleine largeur pour les écrans plus petits
  } else {
    taskContainer.style.width = '500px'; // Conserver la largeur d'origine pour les écrans plus grands
  }
}

// Écouteur d'événements pour le redimensionnement de la fenêtre afin de gérer la réactivité
window.addEventListener('resize', adjustTaskContainerWidth);

// Appelez initialement la fonction pour définir la largeur
adjustTaskContainerWidth();
