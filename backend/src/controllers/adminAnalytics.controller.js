const userModel = require("../models/user.model");

async function adminAnalyticsController(req, res) {

  try {

    const users = await userModel.find();

    // CURRENT YEAR

    const currentYear = new Date().getFullYear();

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    const monthlyUsers = months.map((month, index) => {

      const count = users.filter((user) => {

        const createdDate = new Date(user.createdAt);

        const userMonth = createdDate.getMonth();

        const userYear = createdDate.getFullYear();

        // MATCH CURRENT YEAR + MONTH

        return (
          userMonth === index &&
          userYear === currentYear
        );

      }).length;

      return {
        name: month,
        users: count
      };

    });

    res.status(200).json({
      success: true,
      currentYear,
      monthlyUsers
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

}

module.exports = adminAnalyticsController;