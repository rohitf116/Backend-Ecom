exports.showRespnse = (object, activity) => {
  if (activity === "register" || activity === "login") {
    const { ...x } = object;
    const { password, otp, ...rest } = x._doc;
    return rest;
  }
  return "Not Found";
};
