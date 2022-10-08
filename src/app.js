import Fastify from 'fastify';
import openAPIGlue from 'fastify-openapi-glue';
import swagger from '@fastify/swagger';

import sensible from '@fastify/sensible';

const prefix = '/api';

export async function build () {
  const fastify = Fastify({ logger: true });
  fastify.register(sensible);

  const openAPIGlueOptions ={
    prefix
  }

  const swaggerOptions = {
    exposeRoute: true
  }

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
