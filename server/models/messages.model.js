// messages-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const messages = new mongooseClient.Schema({
    userId: { type: mongooseClient.Schema.Types.ObjectId, required: true },
    text: { type: String, required: true },
  }, { timestamps: true });

  return mongooseClient.model('messages', messages);
};
