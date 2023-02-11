import { Todo } from "../clases";
import { todoList } from '../index';

// Referencias en el HTML
const divTodoList           = document.querySelector('.todo-list');
const txtInput              = document.querySelector('.new-todo');
const btnBorrarCompletados  = document.querySelector('.clear-completed');
// const btnTodos              = document.querySelector('.todos');
// const btnPendientes         = document.querySelector('.pendientes');
// const btnCompletados        = document.querySelector('.completados');
const btnFiltro             = document.querySelector('.filters');
const anchorFiltros         = document.querySelectorAll('.filters');

export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
        <div class="view"> 
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>
    `;
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;
}

// Eventos

txtInput.addEventListener('keyup', ( event ) => {  // hace que ocurra un evento al presionar una tecla en el txt input
    // console.log( event );
    if ( event.keyCode ===13 && txtInput.value.length > 0 ) {
        
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo );
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
        todoList.guardarLocalStorage();
    }
});

divTodoList.addEventListener('click', (event) => {

    const nombreElemento =  event.target.localName;     // input, label, button
    const todoElemento   = event.target.parentElement.parentElement;
    const todoId         = todoElemento.getAttribute('data-id');

    if ( nombreElemento.includes('input')) {            // click en el check

        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');

    } else if ( nombreElemento.includes('button') ) {   // Hay que borrar el todo

        todoList.eliminarTodo( todoId );                // Elimina el objeto seleccionado del arreglo
        divTodoList.removeChild( todoElemento);         // Elimina el objeto seleccionado del html
    }

    console.log( todoList );

});

btnBorrarCompletados.addEventListener('click', () => {

    todoList.eliminarCompletados();                                 // Elimina los completados del arreglo
    console.log( todoList );
    for ( let i = divTodoList.children.length-1; i>= 0; i--){       // Recorre el arreglo html desde el final

        const elemento = divTodoList.children[i];                   // Guarda el objeto actual del arreglo en una constante
        console.log(elemento);

        if ( elemento.classList.contains('completed')){             // si el elemento contiene la clase 'completed'
            divTodoList.removeChild(elemento);                      // Elimina ese objeto del html
        }
    }

});

/*
btnTodos.addEventListener('click', () => {

    for ( let i = divTodoList.children.length-1; i>= 0; i--){       // Recorre el arreglo html desde el final

        const elemento = divTodoList.children[i];
        elemento.classList.remove('hidden');
    }

});

btnPendientes.addEventListener('click', () => {

    for ( let i = divTodoList.children.length-1; i>= 0; i--){       // Recorre el arreglo html desde el final

        const elemento = divTodoList.children[i];
        elemento.classList.remove('hidden');

        if ( elemento.classList.contains('completed')){             // si el elemento contiene la clase 'completed'
            elemento.classList.add('hidden');                     // Elimina ese objeto del html
        }
    }

});

btnCompletados.addEventListener('click', () => {


    for ( let i = divTodoList.children.length-1; i>= 0; i--){       // Recorre el arreglo html desde el final

        const elemento = divTodoList.children[i];
        elemento.classList.remove('hidden');

        if ( !elemento.classList.contains('completed')){             // si el elemento contiene la clase 'completed'
            elemento.classList.add('hidden');                     // Elimina ese objeto del html
        }
    }

});
*/

btnFiltro.addEventListener('click', () => {

    const op = event.target.text;
    if ( !op ) { return; }

    for ( let i = divTodoList.children.length-1; i>= 0; i--){

        const elemento = divTodoList.children[i];
        elemento.classList.remove('hidden');   
        const completado = elemento.classList.contains('completed');
        
        switch( op ) {
            case 'Pendientes':
                if ( completado){
                    elemento.classList.add('hidden');               
                }
                break;
            case 'Completados':
                if ( !completado ){  
                    elemento.classList.add('hidden');
                }
                break;

        }

    }
});





