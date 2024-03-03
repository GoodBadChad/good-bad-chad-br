// Mongoose is our tool to connect to mongodb.
import mongoose from '../node_modules/mongoose';
const mongoLogin = import('./mongo_login.js')
// (0) Connect to our database.
const dbConnectionString = `mongodb+srv://${mongoLogin.un}:${mongoLogin.pw}@good-bad-chad-cluster.gnqrnan.mongodb.net/saves?retryWrites=true&w=majority`
mongoose.connect(dbConnectionString);
// (1) Make a Schema.
const saveSchema = new mongoose.Schema({
  // player data:
  un: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    type: Number,
    required: true,
  },
  // save data:
  chad: {
    type: Object,
    required: true
  },
  inventory: {
    type: Object,
    required: true
  },
  story: {
    type: Object,
    required: true
  },
  zone: {
    type: String,
    required: true
  }
}, {
  // the name of our mongodb collection
  collection: 'saves'
});

// (2) Make a Model from said schema
const Save = new mongoose.model('Save', saveSchema);

// (3) Test: 
// (async () => { 
//   const saves = await Save.find({});
//   console.log(saves);
// })();
// ^ That worked. I'm connected.
export { Save };