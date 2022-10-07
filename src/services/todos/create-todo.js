import { getTodos, saveTodos } from '../../utils/db/index.js';
import { v4 } from 'uuid';

export const createTodo = async (request, reply) => {
  const { body } = request;
  const { title, description, isDone = false } = body;
  const db = await getTodos();

  const id = v4();

  const todo = {
    title,
    description,
    isDone,
    createdDate: new Date().getTime(),
    updatedDate: new Date().getTime()
  };

  db.todos[id] = todo;

  await saveTodos(db);

  /**
     * const newObj = {
     *   id
     * }
     *
     * for (const key in todo) {
     *   newObj[key] = todo[key]
     * }
     *
     * return newObj
     */
  return {
    id,
    ...todo
  };
};
