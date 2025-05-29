
const { Destination, Account } = require('../models');

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
    console.log("des", Destination);

    const destination = await Destination.create({
      accountId: accountId,
      url,
      httpMethod,
      headers
    });

    res.setHeader('APP_SECRET', account.appSecretToken);

    res.status(201).json({
      message: "Destination created successfully",
      destination,
      appSecret: account.appSecretToken
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};


const getDestinations = async (req, res) => {
  const destinations = await Destination.findAll();
  res.json(destinations);
};


const getDestinationsByAccount = async (req, res) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    if (!destination) return res.status(404).json({ message: "Destination not found." });
    res.json(destination);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const updateDestination = async (req, res) => {
  const destination = await Destination.findByPk(req.params.id);
  if (!destination) return res.status(404).json({ error: 'Not Found' });
  await destination.update(req.body);
  res.json(destination);
};

const deleteDestination = async (req, res) => {
  const destination = await Destination.findByPk(req.params.id);
  if (!destination) return res.status(404).json({ error: 'Not Found' });
  await destination.destroy();
  res.json({ message: 'Destination deleted' });
};
module.exports = {
  createDestination,
  getDestinations,
  getDestinationsByAccount,
  updateDestination,
  deleteDestination
}