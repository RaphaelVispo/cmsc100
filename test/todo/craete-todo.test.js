import tap from 'tap';
import 'must/register.js';

import { build } from '../../src/app.js';

tap.mochaGlobals();

const prefix = '/api';

describe('creating a todo should work', async () => {
  let app;

  before(async () => {
    app = await build();
  });
  it('should return the object that was created with id iwth deaul isDOne', async () => {
    const newTodo = {
      title: 'NewTOdo',
      description: 'dfdsf'
    };
    const respose = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });

    respose.statusCode.must.be.equal(200);

    const result = await respose.json();

    // expect that id exist
    result.id.must.not.be.null();

    // expect that all of teh vallues should be equal to new todo
    result.title.must.be.equal(newTodo.title);
    result.description.must.be.equal(newTodo.description);

    // expect that isDone is flase because it was not given
    result.isDone.must.be.false();

    // expect createdDate and updatedDate is not null
    result.createdDate.must.not.be.null();
    result.updatedDate.must.not.be.null();
  });

  it('should return the object that was created with id with isDOne is set with a given object', async () => {
    const newTodo = {
      title: 'NewTOdo 2',
      description: 'dfsfds2',
      isDone: true

    };
    const respose = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });

    respose.statusCode.must.be.equal(200);
    const result = await respose.json();

    // expect that id exist
    result.id.must.not.be.null();

    // expect that all of teh vallues should be equal to new todo
    result.title.must.be.equal(newTodo.title);
    result.description.must.be.equal(newTodo.description);

    // expect that isDone is flase because it was not given
    result.isDone.must.be.equal(newTodo.isDone);

    // expected createdDate and updateDate is null
    result.createdDate.must.not.be.null();
    result.updatedDate.must.not.be.null();
  });
});
