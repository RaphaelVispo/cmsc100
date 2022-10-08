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

  it('should update the object given an ID', async () => {
    const newTodo = {
      title: 'new todo',
      description: 'some des'
    };

    const newerTodo = {
      title: 'newer  todo',
      description: 'new some des',
      isDone: true
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });

    const { id, createdDate, updatedDate } = await createResponse.json();

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/todo/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newerTodo)
    });

    response.statusCode.must.be.equal(200);

    const result = await response.json();

    // expect that id exists
    result.id.must.equal(id);
    // expect that all of the values should be equal to newTodo properties
    result.title.must.be.equal(newerTodo.title);
    result.description.must.be.equal(newerTodo.description);
    // expect taht isDone is false because it was not given
    result.isDone.must.be.equal(newerTodo.isDone);
    // expect createdDate and updatedDate is not null
    result.createdDate.must.be.equal(createdDate);
    result.updatedDate.must.be.above(updatedDate);
  });

  it('should update the object given an ID with only isDone ', async () => {
    const newTodo = {
      title: 'new todo',
      description: 'some des'
    };

    const newerTodo = {
      isDone: true
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });

    const { id, createdDate, updatedDate } = await createResponse.json();

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/todo/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newerTodo)
    });

    response.statusCode.must.be.equal(200);

    const result = await response.json();

    // expect that id exists
    result.id.must.equal(id);
    // expect that all of the values should be equal to newTodo properties
    result.title.must.be.equal(newTodo.title);
    result.description.must.be.equal(newTodo.description);
    // expect taht isDone is false because it was not given
    result.isDone.must.be.equal(newerTodo.isDone);
    // expect createdDate and updatedDate is not null
    result.createdDate.must.be.equal(createdDate);
    result.updatedDate.must.be.above(updatedDate);
  });

  it('Should update the object given an ID and only title is updated', async () => {
    const newTodo = {
      title: 'New Todo for get',
      description: 'Some description'
    };

    const newerTodo = {
      title: 'New Todo for update 2'
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });

    const { id, createdDate, updatedDate } = await createResponse.json();

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/todo/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newerTodo)
    });

    // this checks if HTTP status code is equal to 200
    response.statusCode.must.be.equal(200);

    const result = await response.json();

    // expect that id exists
    result.id.must.equal(id);
    // expect that all of the values should be equal to newTodo properties
    result.title.must.be.equal(newerTodo.title);
    result.description.must.be.equal(newTodo.description);
    // expect taht isDone is false because it was not given
    result.isDone.must.be.false();
    // expect createdDate and updatedDate is not null
    result.createdDate.must.equal(createdDate);
    result.updatedDate.must.above(updatedDate);
  });
});
