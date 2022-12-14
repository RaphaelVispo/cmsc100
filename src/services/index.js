import { general } from './general/index.js';
import { createTodo } from './todos/create-todo.js';
import { deletetodos } from './todos/delete-todo.js';
import { getManyTodos } from './todos/get-many-todo.js';
import { gettodos } from './todos/get-todo.js';
import { updateTodo } from './todos/update-todo.js';
import { registerUser } from './users/register-user.js';
import { login } from './users/login.js';
import { logout } from './users/logout.js';

export class Service {
  constructor (app) {
    this.app = app;
  }

    general=general
    createTodo=createTodo
    deletetodos=deletetodos
    getManyTodos=getManyTodos
    gettodos=gettodos
    updateTodo=updateTodo

    // userFunctions
    registerUser=registerUser
    login=login
    logout=logout
}
