// catogory Schema


const mongoose = require('mongoose');



const catogorySchema = new mongoose.Schema({
  name:{
    type: 'String',
    trim: true, //to remove white spaces
    required: true,
    minlength:[3, "Too short"],
    maxlength:[32, "Too long"],

  },
  slug: {
    type: 'String',
    unique: true,
    lowercase: true,
    index:true,
  }
},
{timestamps: true}
);

module.exports = mongoose.model("Catogory", catogorySchema);