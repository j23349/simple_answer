// script.js
document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.getElementById('todoInput');
  const addButton = document.getElementById('addButton');
  const todoList = document.getElementById('todoList');

  // 加載本地存儲中的待辦事項
  loadTodos();

  // 添加待辦事項
  addButton.addEventListener('click', addTodo);
  todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
          addTodo();
      }
  });

  function addTodo() {
      const todoText = todoInput.value.trim();
      if (todoText === '') {
          alert('請輸入待辦事項');
          return;
      }

      const todoItem = {
          id: Date.now(),
          text: todoText
      };

      const todos = getTodos();
      todos.push(todoItem);
      saveTodos(todos);
      renderTodoItem(todoItem);
      todoInput.value = '';
  }

  function renderTodoItem(todoItem) {
      const li = document.createElement('li');
      li.textContent = todoItem.text;
      li.dataset.id = todoItem.id;


      const searchButton = document.createElement('button');
      searchButton.textContent = '搜尋';
      searchButton.addEventListener('click', () => {
        callApi(todoItem.text)

      });

      li.appendChild(searchButton);
      const deleteButton = document.createElement('button');
      deleteButton.textContent = '刪除';
      deleteButton.addEventListener('click', () => {
        deleteTodoItem(todoItem.id);
      });

      li.appendChild(deleteButton);


  

      todoList.appendChild(li);
  }

  function deleteTodoItem(id) {
      let todos = getTodos();
      todos = todos.filter(todo => todo.id !== id);
      saveTodos(todos);
      document.querySelector(`li[data-id="${id}"]`).remove();
  }

  function getTodos() {
      return JSON.parse(localStorage.getItem('todos')) || [];
  }

  function saveTodos(todos) {
      localStorage.setItem('todos', JSON.stringify(todos));
  }

  function loadTodos() {
      const todos = getTodos();
      todos.forEach(todo => renderTodoItem(todo));
  }
});