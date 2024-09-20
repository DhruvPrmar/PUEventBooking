const  pool  = require("../connections");

async function handleCreateEvent(req, res) {
  console.log("Handlecreateevent req body:", req.body)
  try {
    const {
      event_poster,
      created_by,
      title,
      description,
      date,
      time,
      deadline,
      max_registrations,
      price,
      venue,
      category,
      details,
      terms_conditions,
      refund_policy,
    } = req.body;

    // Check if all required fields are provided
    const requiredFields = [
      title,
      description,
      date,
      time,
      price,
      max_registrations,
      venue,
      deadline,
      category,
      created_by
    ];

    if (requiredFields.some(field => !field)) {
      return res.status(400).json({ error: true, msg: "Fill all the required fields." });
    }

    const query = `
      INSERT INTO events (
          event_poster, 
          title, 
          description, 
          date, 
          time, 
          deadline,
          max_registrations,
          price, 
          venue, 
          category, 
          details, 
          terms_conditions, 
          refund_policy, 
          created_by,
          last_updated_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      event_poster,
      title,
      description,
      date,
      time,
      deadline,
      max_registrations,
      price,
      venue,
      category,
      details,
      terms_conditions,
      refund_policy,
      created_by,
      created_by
    ];

    const result = await pool.query(query, values)
    console.log("Event creation query",result)
    res.status(200).json({ error: false, msg: "Event created successfully." });
  } catch (error) {
    console.error(`Error creating event at ${new Date().toISOString()}. Error: ${error}`);
    res.status(500).json({
      error: true,
      msg: error,
    });
  }
}

module.exports = handleCreateEvent;
