const mongoose = require("mongoose");
const { Schema } = mongoose;

const visitorSchema = new Schema({
  nric: String,
  passport: String,
  phone: String,
  timeIn: { type: Date, default: Date.now },
  timeOut: Date,
  isNRIC: { type: Boolean, default: true },
});

const companySchema = new Schema({
  firstname: String,
  lastname: String,
  slug: String,
  email: { type: String, required: true },
  business_reg: String,
  name: { type: String, required: true },
  location: { type: String, required: true },
  qrcode: String,
  visitors: [visitorSchema],
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
