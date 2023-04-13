exports.routeNotfound = (req, res) => {
  res.status(404).json({ status: false, message: "Route not found" });
};
