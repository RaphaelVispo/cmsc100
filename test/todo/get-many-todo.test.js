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
  it('should return a list of objects  with the default limit', async () => {
    const respose = await app.inject({
      method: 'GET',
      url: `${prefix}/todo`

    });

    respose.statusCode.must.be.equal(200);

    const result = await respose.json();

    // expect that id exist
    result.length.must.not.be.above(5);
  });

  it('should return a list of objects with limit=2', async () => {
    const respose = await app.inject({
      method: 'GET',
      url: `${prefix}/todo?limit=2`

    });

    respose.statusCode.must.be.equal(200);
    const result = await respose.json();

    // expect that id exist
    result.length.must.not.be.above(2);
  });
});
