// const mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// var contactSchema = new Schema({
//   name: {
//     type: String,
//   },
//   phoneNumber: {
//     type: String,
//   },
//   emailId: {
//     type: String,
//   },
//   address: {
//     type: String,
//   },

//   messages: {
//     type: String,
//   },
// });

// module.exports = mongoose.model("contact", contactSchema);

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const Contact = sequelize.define('Contact', {
  name: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  emailId: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  messages: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
}, {
  tableName: 'contacts', 
});

module.exports = Contact;