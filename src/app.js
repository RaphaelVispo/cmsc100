import Fastify from 'fastify';
import { getManyTodos } from './services/todos/get-many-todo.js';
import { createTodo } from './services/todos/create-todo.js';
import { general } from './services/general/index.js';
import { gettodos } from './services/todos/get-todo.js';
import { updateTodo } from './services/todos/update-todo.js';
import { deletetodos } from './services/todos/delete-todo.js';
import sensible from '@fastify/sensible';

const prefix = '/api';

export async function build () {
  const fastify = Fastify({ logger: true });
  fastify.register(sensible);

  fastify.get(prefix, general);

  // creating todo
  fastify.post(`${prefix}/todo`, createTodo);

  // get many to do
  fastify.get(`${prefix}/todo`, getManyTodos);

  // get one todo using a param
  fastify.get(`${prefix}/todo/:todoId`, gettodos);

  // update a todo using ta param
  fastify.put(`${prefix}/todo/:todoId`, updateTodo);

  // delete todo
  fastify.delete(`${prefix}/todo/:todoId`, deletetodos);

  return fastify;
}
