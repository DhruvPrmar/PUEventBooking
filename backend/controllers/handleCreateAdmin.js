const pool = require("../connections");
const bcrypt = require("bcryptjs");

async function handleCreateAdmin(req, res) {
  //admin is the session data of admin creating another
  const { email, role, admin } = req.body;
  let {valid_till} = req.body

  console.log("req body: ", req.body);
  // console.log("Parsed form data: ", email, role, granted_by, valid_till, valid_from);

  const [rows] = await pool.execute(
    "SELECT email FROM admins where email = ?",
    [email]
  );

  if (rows.length !== 0) {
    return res.status(400).json({
      error: true,
      msg: "This person is already a admin.",
    });
  }

  const [row] = await pool.execute("SELECT email FROM users where email = ?", [
    email,
  ]);

  if (row.length === 0) {
    return res.status(400).json({
      error: true,
      msg: "This person does not exist.",
    });
  }

  const currentDate = new Date();
  const tillDate = new Date(valid_till);
  console.log("CurrrentDate: ", currentDate);
  console.log("tillDate: ", tillDate);
  if (tillDate < currentDate - 1) {
    return res.status(400).json({
      error: true,
      msg: "Valid_till cannot be in the past",
    });
  }

  if (admin.role === "admin") {
    return res.status(400).json({
      error: true,
      msg: "Admin cannot create any roles",
    });
  }
// master cannot create developer
  if (admin.role === "master" &&  (role === "developer" || role === "master")) {
    return res.status(401).json({
      error: true,
      msg: "Master cannot create developer or admin.",
    });
  }
  
  const randomPassword = Math.random().toString(36).slice(-8); // Generate random 8-character password
  const hashedPassword = await bcrypt.hash(randomPassword, 10);
  const sql = `
    INSERT INTO admins (email, password, valid_till, granted_by, role, valid_from) 
    VALUES (?, ?, ?, ?, ?, CURRENT_DATE())
`;
  let values = [];

  if(role == "developer" || role == "master"){
    values = [email, hashedPassword, null, admin.email, role]
  }
  else{
    if(!valid_till){
      return res.status(400).json({
        error: true,
        msg: "Valid_till field missing."
      });
    }
    values = [email, hashedPassword, valid_till, admin.email, role];s
  }
  try {
    const newAdmin = await pool.execute(sql, values);
    console.log(
      `New admin inserted email: ${email} password: ${randomPassword}`
    );
    return res.status(200).json({
      error: false,
      msg: "Admin created successfully",
      newAdmin,
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    return res.status(500).json({ error: true, msg: "Failed to create admin" });
  }
}

module.exports = handleCreateAdmin;



// Jeet Password - 0f3tqra8
// 200346620010@paruluniversity.ac.in - jatin