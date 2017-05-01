// flights-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const flights = new mongooseClient.Schema({
    creator: { type: String, required: true },
    aircraft: { type: String, required: true },
    slots: { type: Number, required: true },
    pilots: [
      {
        slot: Number,
        userId: {type: String, required: true },
      }
    ],
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    missionType: { type: String, required: true },
    description: { type: String, required: true },
  }, {timestamps: true});

  return mongooseClient.model('flights', flights);
};
