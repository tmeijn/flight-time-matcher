const assert = require('assert');
const app = require('../../server/app');

describe('\'flights\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/flights');

    assert.ok(service, 'Registered the service');
  });
});
