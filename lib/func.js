const QRCode = require("qrcode");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function generateQR(text) {
  try {
    let result = await QRCode.toDataURL(text);
    return result;
  } catch (err) {
    console.error(err);
    return "error";
  }
}

//user validity check
function checkToken(req, res, next) {
  const token = req.header("x-auth-ebere");

  if (!token) {
    return res.status(401).json({ message: "not allowed to view this" });
  }

  try {
    //this validates and verifies the token
    const decoded = jwt.verify(token, process.env.SECRET);

    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "your token is not valid " });
  }
}

module.exports = {
  generateQR,
  checkToken,
};
