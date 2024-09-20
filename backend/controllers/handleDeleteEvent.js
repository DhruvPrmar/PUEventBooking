const pool = require("../connections");
const fs = require('fs')
const path = require('path')

async function handleDeleteEvent(req, res) {
  const { event_id, event_poster } = req.body;
  const filePath = path.join(".", "uploads", "event_posters", event_poster)

  try {
    const result  = await pool.execute(`DELETE FROM events WHERE id = ?`, [event_id]);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.log("File name", event_poster)
        console.error('Error deleting the file:', err);
      } else {
        console.log("File name", event_poster)
        console.log('File deleted successfully');
      }
    });

    if (result[0].affectedRows === 1) {
       return res.status(200).json({ error: false, msg: "Event deleted successfully." });
    } else {
     return res.status(500).json({ error: true, msg: "Unexpected error occured" });
    }
  } catch (error) {
    console.error("Error deleting event:", error);
    return res.status(500).json({ error: true, msg: "An error occurred while deleting the event." });
  }
}

module.exports = handleDeleteEvent;
