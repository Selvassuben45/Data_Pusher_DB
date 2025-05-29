const db = require('../models');
const Destination = db.Destination;
const Account = db.Account;

// Create Destination for an Account
// exports.createDestination = async (req, res) => {
//   try {
//     const { accountId, url, httpMethod, headers } = req.body;
//     if (!accountId || !url || !httpMethod || !headers) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     const account = await Account.findByPk(accountId);
//     if (!account) return res.status(404).json({ message: "Account not found." });

//     const destination = await Destination.create({ AccountId: accountId, url, httpMethod, headers });
//     res.status(201).json(destination);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// POST /api/destinations
const createDestination = async (req, res) => {
    try {
      const { accountId, url, httpMethod, headers } = req.body;

      // ✅ Validate required fields
      if (!accountId || !url || !httpMethod || !headers || typeof headers !== 'object') {
        return res.status(400).json({ message: "All fields are required" });
      }

      // 🔴 WRONG way (common mistake):
      // const account = await Account.findByPk(accountId);

      // ✅ CORRECT way: find by `accountId` field
      const account = await Account.findOne({
        where: { accountId }
      });

      if (!account) {
        return res.status(404).json({ message: "Account not found" });
      }

      // ✅ Create Destination
      const destination = await Destination.create({
        AccountId: account.id,
        url,
        httpMethod: httpMethod, // ✅ rename to match model
        headers
      });
                    res.setHeader('APP_SECRET', account.appSecret);
console.log(account.appSecret);

      res.status(201).json({

        message: "Destination created successfully",
        destination,
          appSecret: account.appSecret // 👈 Include this here

      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

// Get all destinations
const getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.findAll(
  //       {  include: Account, // Only if you want account data
  // }
);
    res.json(destinations);
    console.log(res);

  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);

  }
};

// Get Destination by ID
const getDestination = async (req, res) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    if (!destination) return res.status(404).json({ message: "Destination not found." });
    res.json(destination);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Destination
const updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    if (!destination) return res.status(404).json({ message: "Destination not found." });

    const { url, httpMethod, headers } = req.body;
    // destination.url = url || destination.url;
    // destination.httpMethod = httpMethod || destination.httpMethod;
    // destination.headers = headers || destination.headers;
 if (req.body.hasOwnProperty('url')) {
      // Assuming url is required and should not be empty if provided for an update
      destination.url = url;
    }
    if (req.body.hasOwnProperty('httpMethod')) {
      // Assuming httpMethod is required and should be a valid method string
      destination.httpMethod = httpMethod;
    }
    if (req.body.hasOwnProperty('headers')) {
      destination.headers = headers; // headers can be set to null as per schema
    }
    await destination.save();
    res.json(destination);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Destination
const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    if (!destination) return res.status(404).json({ message: "Destination not found." });

    await destination.destroy();
    res.json({ message: "Destination deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports={
  deleteDestination,
  updateDestination,
  getDestination,
  getDestinations,
  createDestination,

}