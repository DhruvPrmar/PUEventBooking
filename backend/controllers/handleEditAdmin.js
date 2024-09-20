const pool = require("../connections");

async function handleEditAdmin(req, res) {
  console.log("HandleEditAdmin body", req.body);
  // HandleEditAdmin body {
  //     email: "example@paruluniverity.com",
  //     role: 'master',
  //     valid_till: '2024-09-28',
  //     admin: {
  //       id: 9,
  //       email: '2303031087041@paruluniversity.ac.in',
  //       valid_till: null,
  //       valid_from: null,
  //       granted_by: 'self',
  //       role: 'developer',
  //       iat: 1721730447,
  //       exp: 1722594447
  //     }
  //   }
  const { email, role, admin } = req.body;
  let valid_till = req.body.valid_till;

  //admin role unauthorized
  if (admin.role == "admin") {
    return res.status(400).json({
      error: true,
      msg: "Unauthorized",
    });
  }
  //Prohibits master from making developer
  if (role == "developer" && admin.role == "master") {
    return res.status(400).json({
      error: true,
      msg: "Master cannot make developer.",
    });
  }
// Making himself admin
  if(email === admin.email){
    return res.status(400).json({
        error: true,
        msg: "Unauthorized request.",
      });
  }

  if (role == "admin" && !valid_till) {
    return res.status(400).json({
      error: true,
      msg: "Provide valid_till date.",
    });
  }
  try {
    //Formated date: 2024-09-28 05:30:00
    // const formated_valid_till = formatToMySQLDate(valid_till);
    const granted_by = admin.email;
    console.log("Email of email", email);
    let query = ""

    if (role == "developer" || role == "master") {
        query = "UPDATE admins SET role = ?, valid_till = ?, granted_by = ? WHERE email = ?;"
        valid_till = null;
    } else {
      query = "UPDATE admins SET role = ?, valid_till = ?, granted_by = ? WHERE email = ?;"
    }
    const [rows] = await pool.execute(
        `UPDATE admins SET role = ?, valid_till = ?, granted_by = ? WHERE email = ?;`,
        [role, valid_till, granted_by, email]
      );
    if (rows.affectedRows > 0) {
      return res.status(200).json({
        error: false,
        msg: `${email} updated successfully.`,
      });
    } else {
      return res.status(200).json({
        error: false,
        msg: "No rows where updated",
      });
    }
  } catch (error) {
    console.error("Error in handleEditAdmin: ", error);
    return res.status(500).json({
      error: false,
      msg: "Internal server error.",
    });
  }
}

// function formatToMySQLDate(dateStr) {
//   const date = new Date(dateStr);
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const day = String(date.getDate()).padStart(2, "0");
//   const hours = String(date.getHours()).padStart(2, "0");
//   const minutes = String(date.getMinutes()).padStart(2, "0");
//   const seconds = String(date.getSeconds()).padStart(2, "0");

//   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
// }
module.exports = handleEditAdmin;
