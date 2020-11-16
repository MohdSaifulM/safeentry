const QRCode = require("qrcode");
async function generateQR(text) {
  try {
    let result = await QRCode.toDataURL(text);
    return result;
  } catch (err) {
    console.error(err);
    return "error";
  }
}

module.exports = {
  generateQR,
};
