const users = require('./users/users.service.js');
const flights = require('./flights/flights.service.js');
const messages = require('./messages/messages.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(flights);
  app.configure(messages);
};
