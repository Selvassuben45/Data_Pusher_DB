const { Account } = require('../models');

const createAccount = async (req, res) => {
  try {
    const account = await Account.create(req.body);
    res.status(201).json(account);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAccounts = async (req, res) => {
  const accounts = await Account.findAll();
  res.json(accounts);
};

const getAccount = async (req, res) => {
  const account = await Account.findByPk(req.params.id);
  if (!account) return res.status(404).json({ error: 'Not Found' });
  res.json(account);
};

const updateAccount = async (req, res) => {
  const account = await Account.findByPk(req.params.id);
  if (!account) return res.status(404).json({ error: 'Not Found' });
  await account.update(req.body);
  res.json(account);
};

const deleteAccount = async (req, res) => {
  const account = await Account.findByPk(req.params.id);
  if (!account) return res.status(404).json({ error: 'Not Found' });
  await account.destroy();
  res.json({ message: 'Account deleted' });
};
module.exports = {
  createAccount,
  getAccounts,
  getAccount,
  updateAccount,
  deleteAccount
};