const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../connections');

async function handleAdminLogin(req, res) {
  const { email, password } = req.body;
console.log(`Email: ${email} Password: ${password}`)
  if (!email || !password) {
    return res.status(400).json({
      error: true,
      msg: "Incomplete fields.",
    });
  }

  try {
    const [rows] = await pool.execute('SELECT * FROM admins WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(403).json({
        error: true,
        msg: "Unauthorized.",
      });
    }

    const admin = rows[0];
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(403).json({
        error: true,
        msg: "Incorrect Credentials.",
      });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        valid_till: admin.valid_till,
        valid_from: admin.valid_from,
        granted_by: admin.granted_by,
        role: admin.role
      },
      process.env.JWT_SECRET,
      { expiresIn:"10d"}
    );

    res.cookie('token', token);
    return res.status(200).json({
      error: false,
      msg: "Logged in successfully!",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      msg: "Internal server error.",
    });
  }
}

module.exports = handleAdminLogin;
