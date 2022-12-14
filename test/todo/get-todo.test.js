import tap from 'tap';
import 'must/register.js';

import { build } from '../../src/app.js';

tap.mochaGlobals();

const prefix = '/api';

describe('Get many to todo should work', async () => {
  let app;

  before(async () => {
    app = await build();
  });

  it('should return the object given an ID', async () => {
    const newTodo = {
      title: 'new todo',
      description: 'some des'
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });

    const { id } = await createResponse.json();

    const response = await app.inject({
      method: 'GET',
      url: `${prefix}/todo/${id}`
    });

    response.statusCode.must.be.equal(200);

    const result = await response.json();

    // expect that id exists
    result.id.must.equal(id);
    // expect that all of the values should be equal to newTodo properties
    result.title.must.be.equal(newTodo.title);
    result.description.must.be.equal(newTodo.description);
    // expect taht isDone is false because it was not given
    result.isDone.must.be.false();
    // expect createdDate and updatedDate is not null
    result.createdDate.must.not.be.null();
    result.updatedDate.must.not.be.null();
  });
});
