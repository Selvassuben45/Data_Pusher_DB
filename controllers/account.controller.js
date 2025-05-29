const db = require('../models');
const Account = db.Account;
const Destination = db.Destination; // Import Destination model

// Create Account
const createAccount = async (req, res) => {
  try {
    const { email, accountName, website } = req.body;

    if (!email || !accountName) {
      return res.status(400).json({ message: "email and accountName are required." });
    }

    const account = await Account.create({ email, accountName, website });
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Accounts
const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll();
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Account by ID
const getAccount = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (!account) return res.status(404).json({ message: "Account not found." });
    res.json(account);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Account
const updateAccount = async (req, res) => {
  try {
    const { accountName, website, email } = req.body;
    const account = await Account.findByPk(req.params.id);
    if (!account) return res.status(404).json({ message: "Account not found." });
    account.email = email || account.email;
    account.accountName = accountName || account.accountName;
    account.website = website || account.website;
    await account.save();

    res.json(account);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Account and its Destinations
const deleteAccount = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (!account) return res.status(404).json({ message: "Account not found." });

    await account.destroy();
    res.json({ message: "Account deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDestinations = async (req, res) => {
  try {
    const { id } = req.params;

    const account = await Account.findByPk(id, {
      include: [{ model: Destination, as: 'Destinations' }]
    });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json(account);
  } catch (error) {
    console.error("Error fetching account with destinations:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = {
  createAccount,
  getAccounts,
  getAccount,
  updateAccount,
  deleteAccount
}