const db = require('../models');
const Destination = db.Destination;
const Account = db.Account;

const createDestination = async (req, res) => {
  try {
    const { accountId, url, httpMethod, headers } = req.body;

    if (!accountId || !url || !httpMethod || !headers || typeof headers !== 'object') {
      return res.status(400).json({ message: "All fields are required" });
    }
    const account = await Account.findOne({
      where: { accountId }
    });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    const destination = await Destination.create({
      AccountId: account.id,
      url,
      httpMethod: httpMethod,
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
    const destinations = await Destination.findAll();
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

    if (req.body.hasOwnProperty('url')) {
      destination.url = url;
    }
    if (req.body.hasOwnProperty('httpMethod')) {
      destination.httpMethod = httpMethod;
    }
    if (req.body.hasOwnProperty('headers')) {
      destination.headers = headers;
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
module.exports = {
  deleteDestination,
  updateDestination,
  getDestination,
  getDestinations,
  createDestination,

}