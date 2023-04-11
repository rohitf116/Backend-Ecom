// Import axios
const axios = require("axios");

// Replace your SMSHorizon credentials with the placeholders
const apiKey = "cuCc3fi0QNfrlFz66loQ";
const senderId = "rohitx220";

/**
 * Send an SMS using SMSHorizon
 *
 * @param {string} destNumber - The destination phone number
 * @param {string} message - The message content
 * @returns {Promise}
 */
exports.sendSMS = async (mobile, text) => {
  console.log(mobile, text);
  const apiUrl = `https://smshorizon.co.in/api/sendsms.php?user=rohitx220&apikey=cuCc3fi0QNfrlFz66loQ&mobile=${mobile}&message=${text}&type=txt`;
  const { data } = await axios.get(apiUrl);
  console.log(data);
  return data;
};

// Example usage
