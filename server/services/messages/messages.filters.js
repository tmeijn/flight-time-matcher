/* eslint no-console: 1 */
console.warn('You are using the default filter for the messages service. For more information about event filters see https://docs.feathersjs.com/api/events.html#event-filtering'); // eslint-disable-line no-console

module.exports = function (data, connection, hook) { // eslint-disable-line no-unused-vars
  
  // Is the connection authenticated?
  if(!connection.user) {
    return false;
  }

  // Is the message sender the same as the connected user?
  if(data.userId.equals(connection.user._id)) {
    return false;
  }
  
  return data;
};
