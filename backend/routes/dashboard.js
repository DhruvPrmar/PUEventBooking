const express = require("express");
const router = express.Router();
const handleCreateEvent = require("../controllers/handleCreateEvent");
const handleUpdateEvent = require("../controllers/handleUpdateEvent");
const handleDeleteEvent = require("../controllers/handleDeleteEvent");
const validateEventFields = require("../middleware/validateEventFields");
const checkAndUploadEventPoster = require("../middleware/checkAndUploadEventPoster");
const checkAndUpdateEventPoster = require("../middleware/checkAndUpdateEventPoster");
// Routes
router.post(
  "/create-event",
  (req, res, next) => {
    console.log("req",req.body)
    console.log("header",req.headers)
    console.log("Event_Poster",req.body.event_poster)
    console.log("file",req.file)
    next();
  },
  checkAndUploadEventPoster,
  validateEventFields,
  handleCreateEvent
);

router.put(
  "/update-event",
  checkAndUpdateEventPoster,
  validateEventFields,
  handleUpdateEvent
);

router.delete("/delete-event", handleDeleteEvent);

module.exports = router;
