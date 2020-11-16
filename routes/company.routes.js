const router = require("express").Router();
require("dotenv").config();
const { generateQR } = require("../lib/func");
const Company = require("../models/company.model");
/**
 * @method POST
 * @returns {}
 * @route /api/v1/company
 */
router.post("/", async (req, res) => {
  // chicken rice-haven
  try {
    let { firstname, lastname, email, business_reg, name, location } = req.body;
    let slug = name.split(" ").join("-");
    //is frontend app
    let qrcode = await generateQR(
      `http://${process.env.IPADDRESS}/company/${slug}`
    );

    let company = new Company({
      firstname,
      lastname,
      email,
      business_reg,
      name,
      slug,
      location,
      qrcode,
    });
    // console.log(company);
    await company.save();

    res.status(201).json({
      message:
        "We have accepted your request, you QRcode will soon be with you! Cheers mate!",
    });
  } catch (error) {
    res.status(400).json({
      message: "something went wrong",
    });
  }
  /**
     *  firstname: String,
  lastname: String,
  slug: String,
  email: { type: String, required: true },
  business_reg: String,
  name: { type: String, required: true },
  location: { type: String, required: true },
  qrcode: String,
     */
});

router.get("/:id", async (req, res) => {
  try {
    let company = await Company.findById(req.params.id);

    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({ message: "trouble finding company data" });
  }
  //   Company.findOne({ slug: req.params.companyname });
});

router.put("/:id", async (req, res) => {
  try {
    let { nric, passport, phone, isNRIC } = req.body;

    await Company.findByIdAndUpdate(req.params.id, {
      $push: { visitors: { nric, passport, phone, isNRIC } },
    });

    res.status(200).json({ message: "Visitor added to company" });
  } catch (error) {
    res.status(400).json({ message: "trouble finding company data" });
  }
  //   Company.findOne({ slug: req.params.companyname });
});

module.exports = router;
