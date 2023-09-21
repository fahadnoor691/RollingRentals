const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  booking: {
    items: [
      {
        carId: {
          type: Schema.Types.ObjectId,
          ref: "Cars",
          required: true,
        },
        total: { type: Number, required: true },
      },
    ],
  },
});

module.exports = mongoose.model("user", userSchema);
