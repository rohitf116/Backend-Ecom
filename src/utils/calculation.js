exports.generateOTP = () => Math.floor(100000 + Math.random() * 900000);

exports.generateExpiry = () => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + 10);
  return date;
};
