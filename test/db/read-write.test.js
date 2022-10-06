import tap from 'tap';
import { getTodos, saveTodos } from '../../src/utils/db/index.js';
import 'must/register.js';

tap.mochaGlobals();

describe('DB should work', async () => {
  it('should be able to read from DB', async () => {
    const db = await getTodos();

    db.todos.must.not.be.null();
  });

  it('should be able to write to DB', async () => {
    const db = await getTodos();
    const date = new Date().getTime();
    db.test = date;
    await saveTodos(db);

    const newDB = await getTodos();
    newDB.test.must.be.equal(db.test);
  });
}
);
