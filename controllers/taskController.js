
exports.getIndex = (req, res) => {
  res.render("tasks/index");
}

exports.getCreateTask = (req, res) => {
  res.render("tasks/create");
}

exports.getEditTask = (req, res) => {
  res.render("tasks/edit");
}