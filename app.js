const app = new Vue({
  el: 'todo-app',
  template: `<h1>TODO App</h1>`
})
const LOCAL_STORAGE_KEY = 'todo-app-vue';
const todoApp= new Vue({
 
  el: '.todoapp',
  data:
  {
    title : ' Vue App!',
    todos: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [
      { text: 'Learn JavaScript ES6+ goodies', isDone: true },
      { text: 'Learn Vue', isDone: false },
      { text: 'Build something awesome', isDone: false },
    ],
    editing: null,
 
  },
  methods:
  {
    createTodo(event)
    {
      const textbox=event.target;
      this.todos.push ({text:textbox.value, isDone: false});
      textbox.value=' ';

      
    },
    startEditing(todo)
    {
      this.editing=todo;   
     },

   
  finishEditing(event) {
    if (!this.editing) { return; }
    const textbox = event.target;
    this.editing.text = textbox.value;
    this.editing = null;
  },
  cancelEditing() {
    this.editing = null;
  },
  deleteTask(todo)
  {
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
  },
  
},
computed: {
  activeTodos() {
    return this.todos.filter(t => !t.isDone);
  },
  clearCompleted() {
    this.todos = this.activeTodos;
  },
  completedTodos() {
    return this.todos.filter(t => t.isDone);
  }
},
watch: {
  todos: {
    deep: true,
    handler(newValue) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValue));
    }
  }
},

})