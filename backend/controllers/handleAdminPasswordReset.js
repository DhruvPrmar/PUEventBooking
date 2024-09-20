const pool = require("../connections");
const bcrypt = require("bcryptjs");

async function handleAdminPasswordReset(req, res) {
  const { sessionEmail, newPassword, repeatPassword } = req.body;
  console.log('HandleAdminPasswordReset req.body: ', req.body)

  if (newPassword !== repeatPassword) {
    return res.status(400).json({
      error: true,
      msg: "Passwords do not match. Please try again.",
    });
  }
  

  if (newPassword.length < 8) {
    return res.status(400).json({
      error: true,
      msg: "Password is too short. It must be at least 8 characters long.",
    });
  } 

  if (!sessionEmail) {
    return res.status(400).json({
      error: true,
      msg: "No session running. Login from the account you want to change password for.",
    });
  }

  try {
    const [adminData] = await pool.execute(
      "SELECT email FROM admins WHERE email = ?",
      [sessionEmail]
    );
    // console.log(
    //   "adminData from handleAdminPasswordReset",
    //   adminData,
    //   sessionEmail
    // );

    if (adminData[0].email !== sessionEmail) {
      return res.status(401).json({
        error: true,
        msg: "Unauthorized.",
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const [dbres] = await pool.execute(
      "UPDATE admins SET password = ? WHERE email = ?",
      [hashedPassword, adminData[0].email]
    );

    // console.log("DB response: ", dbres);
    if (dbres.affectedRows > 0) {
      res.clearCookie('token');
      return res.status(200).json({
        error: false,
        msg: `Password updated successfully.`,
      });
    } else {
      return res.status(500).json({
        error: true,
        msg: "Failed to update password. Please try again.",
      });
    }
  } catch (error) {
    console.error(`Error reseting password ${sessionEmail}: `, error);
    return res.status(500).json({
      error: false,
      msg: "Unexpected error occured.",
    });
  }
}

module.exports = handleAdminPasswordReset;
