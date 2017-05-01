// Initializes the `flights` service on path `/api/flights`
const createService = require('feathers-mongoose');
const createModel = require('../../models/flights.model');
const hooks = require('./flights.hooks');
const filters = require('./flights.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'flights',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/flights', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/flights');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
