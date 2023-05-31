const connection = require('../../connection');

module.exports = {
  getAllPatients: (req, res) => {
    console.log("inside all patient", req.query);

    // Pagination parameters
    const page = req.query.page || 1; // Default to page 1
    const limit = 20; // Number of records per page
    const offset = (page - 1) * limit; // Offset calculation

    const getAllPatientsSql = `SELECT * FROM patient LIMIT ${limit} OFFSET ${offset}`;
    connection.query(getAllPatientsSql, (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Error fetching patients");
      }

      // Fetch total count of patients for pagination
      const countSql = 'SELECT COUNT(*) AS count FROM patient';
      connection.query(countSql, (error, countResult) => {
        if (error) {
          console.error(error);
          return res.status(500).send("Error fetching patient count");
        }

        const totalCount = countResult[0].count;
        const totalPages = Math.ceil(totalCount / limit);

        res.status(200).send({
          data: results,
          page: parseInt(page),
          totalPages,
          totalCount,
        });
      });
    });
  },
};
