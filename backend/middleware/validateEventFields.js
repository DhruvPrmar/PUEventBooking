// middleware/checkEventFields.js

// Middleware function to validate event fields
function validateEventFields(req, res, next) {
  const { date, time, deadline } = req.body;

  // Validate date and time
  const eventDateTime = new Date(`${date}T${time}`);
  const currentDateTime = new Date();
  const eventDeadline = new Date(deadline);
  if (eventDateTime <= currentDateTime) {
    return res
      .status(400)
      .json({ error: true, msg: "Event date and time must be in the future." });
  } else if (eventDeadline > eventDateTime || eventDeadline < currentDateTime) {
    return res
      .status(400)
      .json({
        error: true,
        msg: "Deadline must be between current date and event date.",
      });
  } else {
    next();
  }
}

module.exports = validateEventFields;
