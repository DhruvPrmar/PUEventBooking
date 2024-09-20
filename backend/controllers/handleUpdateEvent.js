const pool = require("../connections");

async function handleUpdateEvent(req, res) {
    const { id, title, description, date, time, price, venue, category, deadline, max_registrations, details, terms_conditions, refund_policy, last_updated_by } = req.body;

    try {
        // Update main event details
        await pool.execute(
            `UPDATE events SET title = ?, description = ?, date = ?, time = ?, price = ?, venue = ?, category = ?, deadline = ?, max_registrations = ?, details = ?, terms_conditions = ?, refund_policy = ?, last_updated_by = ? WHERE id = ?`,
            [title, description, date, time, price, venue, category, deadline, max_registrations, details, terms_conditions, refund_policy, last_updated_by, id]
        );

        // Update event poster if req.file exists
        if (req.file) {
            await pool.execute(`UPDATE events SET event_poster = ? WHERE id = ?`, [req.file.filename, id]);
        }

        // Send success response
        return res.status(200).json({ error: false, msg: "Event updated successfully." });
    } catch (error) {
        console.error("Error updating event:", error);
        return res.status(500).json({ error: "An error occurred while updating the event." });
    }
}

module.exports = handleUpdateEvent;
