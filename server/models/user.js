const mongoose = require('mongoose');
const { Object } = mongoose.Schema;

const userSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    lowercase: true,
    required: true,
    index:true,
  },
  role:{
    type: String,
    default: 'subscriber',
  },
  cart: {
    type:Array,
    default: [],
  },
  address: String,
 // wishlist:[{ type: ObjectId, ref: "Product" }],
},
{timestamps: true}
);

module.exports = mongoose.model('User',userSchema);