

async function handleAdminLogout(req, res) {
    try {
        res.clearCookie('token');
        return res.status(200).json({
            error: false,
            msg: "Logout successfull."
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: true,
            msg: "Internal server error.",
          });
    }
}

module.exports = handleAdminLogout