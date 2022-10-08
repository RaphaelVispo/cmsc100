import { getTodos } from '../../utils/db/index.js';

export const gettodos = async (request, reply) => {
  const { params } = request;
  const { todoId: id } = params;
  const db = await getTodos();

  const { todos } = db;

  if (!todos[id]) {
    return reply.notFound();
  }

  return {
    id,
    ...todos[id]
  };
};
