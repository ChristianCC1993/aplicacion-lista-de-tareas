import { Todo } from  './todo.class';

export class TodoList {

    constructor() {

        //this.todos = [];            // El constructor crea un arreglo de todos y lo inicializa vacio
        this.cargarLocalStorage();
    }

    nuevoTodo( todo ) {
        this.todos.push( todo );    // Inserta un nuevo todo en el arreglo
    }

    eliminarTodo( id ) {

        this.todos = this.todos.filter( todo => todo.id != id ) // Esto devuelve un nuevo arreglo con todo menos el objeto que conincida con el id que se le pasa a la función
        this.guardarLocalStorage();
    }

    marcarCompletado( id ) {
        
        for ( const todo of this.todos ) {

            if ( todo.id == id ) {
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
        
    }

    eliminarCompletados() {

        this.todos = this.todos.filter( todo => !todo.completado )      // Crea un nuevo arreglo sin los objetos completados
        this.guardarLocalStorage();
    }

    guardarLocalStorage() {

        localStorage.setItem('todos',JSON.stringify(this.todos) );

    }
    
    cargarLocalStorage() {

        this.todos = ( localStorage.getItem('todos') ) 
                        ? JSON.parse( localStorage.getItem('todos')) 
                        : [] ;

        this.todos = this.todos.map( Todo.fromJson );
    }

}
