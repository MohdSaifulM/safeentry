const router = require("express").Router();
require("dotenv").config();
const { generateQR, checkToken } = require("../lib/func");
const Company = require("../models/company.model");
const { body, oneOf, validationResult } = require("express-validator");

router.get("/", checkToken, async (req, res) => {
  console.log("current signed in user", req.user);
  try {
    let companies = await Company.find();
    res.status(200).json({ companies });
  } catch (error) {
    res.status(400).json({ message: "companies not found " });
  }
});

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
      `http://${process.env.IPADDRESS}:3000/company/${slug}`
      // `http://d7601ab400a5.ngrok.io/company/${slug}`
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

router.put(
  "/:id",
  [
    body("phone")
      .exists()
      .withMessage("phone must exist")
      .isMobilePhone("en-SG")
      .withMessage("must be a valid SG number"),
    oneOf([
      body("passport").exists().withMessage("either passport or nric"),
      // .notEmpty()
      // // .isEmpty()
      // .isLength({ min: 9, max: 9 })
      // .withMessage("must be 9 chars"),
      body("nric").exists().withMessage("either nric or passport"),
    ]),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let { nric, passport, phone, isNRIC } = req.body;

      // let c = await Company.findByIdAndUpdate(req.params.id, {
      //   $push: { visitors: { nric, passport, phone, isNRIC } },
      // });

      res.status(200).json({ message: "Visitor added to company", s });
    } catch (error) {
      res.status(400).json({ message: "trouble finding company data" });
    }
    //   Company.findOne({ slug: req.params.companyname });
  }
);

module.exports = router;
