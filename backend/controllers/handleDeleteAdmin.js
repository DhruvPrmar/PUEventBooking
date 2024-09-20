const pool = require("../connections");


async function handleDeleteAdmin(req, res) {
    console.log("Handle delete admin req: ", req.body);
    const { adminEmail, adminRole, grantedBy, admin } = req.body;

    // Check if the adminRole is 'admin', which is not allowed to be deleted
    if (admin.role === 'admin') {
        return res.status(401).json({
            error: true,
            msg: "Unauthorized"
        });
    }

    // Master cannot remove developer
    if (admin.role === 'master' && adminRole === "developer") {
        return res.status(401).json({
            error: true,
            msg: "Unauthorized"
        });
    }

    // Master can only remove master which they created
    if (admin.role === 'master' && adminRole === "master") {
        if (grantedBy !== admin.email) {
            return res.status(401).json({
                error: true,
                msg: "You do not have permission to remove this admin."
            });
        }
    }
    
    if(admin.email === adminEmail){
        return res.status(400).json({
            error: true,
            msg: "Bhai suicide?"
        });
    }


    if(admin.email !== grantedBy && adminRole == "developer"){
        return res.status(400).json({
            error: true,
            msg: "You do not have permission to remove this admin"
        });
    }

    try {
        const [result] = await pool.execute('DELETE FROM admins WHERE email = ?', [adminEmail]);

        if (result.affectedRows > 0) {
            return res.status(200).json({
                error: false,
                msg: "Admin deleted successfully."
            });
        } else {
            return res.status(404).json({
                error: true,
                msg: "Admin not found."
            });
        }
    } catch (error) {
        console.error("Database error: ", error);
        return res.status(500).json({
            error: true,
            msg: "Internal server error."
        });
    }
}

module.exports = handleDeleteAdmin;
