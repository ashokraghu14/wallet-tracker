const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Wallet = new Schema({
  date :{
    type: String
  },
  description :{
    type: String
  },
  income :{
    type: Number
  },
  amount :{
    type: Number
  }
})

module.exports = mongoose.model('Wallet', Wallet)
