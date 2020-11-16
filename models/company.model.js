const mongoose = require("mongoose");
const { Schema } = mongoose;
/**
 * { 
          nric : optional
          passport: optional
          phone: String
          timeIn: Date
          timeOut: Date
          isNRIC: Boolean default true
      }
 */
const companySchema = new Schema({
  firstname: String,
  lastname: String,
  slug: String,
  email: { type: String, required: true },
  business_reg: String,
  name: { type: String, required: true },
  location: String,
  qrcode: String,
  visitors: [],
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
