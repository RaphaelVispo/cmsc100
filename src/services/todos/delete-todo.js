import { getTodos, saveTodos } from '../../utils/db/index.js';

export const deletetodos = async (request, reply) => {
  const { params } = request;
  const { todoId: id } = params;
  const db = await getTodos();

  delete db.todos[id];
  await saveTodos(db);

  return {
    success: true
  };
};
