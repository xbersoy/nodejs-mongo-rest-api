const chai = require('chai');
const server = require('../index');

describe('Starting Server', () => {
  before(function (done) {
    this.timeout(0);
    server.on('up', async () => {
      done();
    });
  });

  describe('Calling e2e Tests', () => {
    require('./e2e/records.test');
  });
});