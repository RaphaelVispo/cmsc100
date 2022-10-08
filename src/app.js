import Fastify from 'fastify';
import openAPIGlue from 'fastify-openapi-glue';
import swagger from '@fastify/swagger';

import { Service } from './services/index.js';

import sensible from '@fastify/sensible';
import { specification } from './specification/index.js';

const prefix = '/api';

export async function build () {
  const fastify = Fastify({ logger: true });
  fastify.register(sensible);

  const service = new Service();

  const openAPIGlueOptions = {
    specification,
    service,
    prefix
  };

  const swaggerOptions = {
    openapi: specification,
    routePrefix: '/docs',
    exposeRoute: true
  };

  fastify.register(swagger, swaggerOptions);
  fastify.register(openAPIGlue, openAPIGlueOptions);

  // fastify.get(prefix, general);

  // // creating todo
  // fastify.post(`${prefix}/todo`, createTodo);

  // // get many to do
  // fastify.get(`${prefix}/todo`, getManyTodos);

  // // get one todo using a param
  // fastify.get(`${prefix}/todo/:todoId`, gettodos);

  // // update a todo using ta param
  // fastify.put(`${prefix}/todo/:todoId`, updateTodo);

  // // delete todo
  // fastify.delete(`${prefix}/todo/:todoId`, deletetodos);

  return fastify;
}
