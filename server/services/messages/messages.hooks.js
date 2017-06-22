const { authenticate } = require('feathers-authentication').hooks;
const { populate } = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');

const processMessage = require('../../hooks/process-message');
const restrict = [
  authenticate('jwt'),
  restrictToOwner({
    idField: '_id',
    ownerField: 'userId'
  })
];

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [processMessage()],
    update: [processMessage()],
    patch: [processMessage()],
    remove: [...restrict]
  },

  after: {
    all: [
      populate({
        schema: {
          include: [{
            service: 'api/users',
            nameAs: 'sentBy',
            parentField: 'userId',
            childField: '_id'
          }]
        }
      })
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [
      
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
