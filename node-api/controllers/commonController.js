const db = require("../config/db"); // Your MySQL connection

exports.getBusinessTypes = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT id, business FROM business_type");
        res.json({ data: rows });
    } catch (error) {
        console.error("Error in getBusinessTypes:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
