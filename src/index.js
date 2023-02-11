import './styles.css';
import { Todo, TodoList } from './clases/index'
import { crearTodoHtml } from './js/componentes';

export const todoList = new TodoList();


todoList.todos.forEach( todo => crearTodoHtml( todo ));

todoList.todos[2].imprimirClase();
 