//-- Imports
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//-- creating Mongoose Schema for MongoDB
const entrySchema = new Schema(
  {
    name: {   
            type: String,
            trim: true,
            required: "ERROR: Name is required"
    },
    value: {
            type: Number,
            required: "ERROR: Must enter a numerical value",
            get: getPrice
    },
    date: {
           type: Date,
           default: Date.now
    }
  },
  { toJSON: { getters: true } }
);

function getPrice(value){ return (value).toFixed(2); }

const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;
