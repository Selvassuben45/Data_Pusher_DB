const { Account, Destination } = require('../models');
const axios = require('axios');

const receiveData = async (req, res) => {
  const token = req.headers['cl-x-token'];
  if (!token) return res.status(401).json({ error: 'Un Authenticate' });

  const account = await Account.findOne({ where: { appSecretToken: token } });
  if (!account) return res.status(401).json({ error: 'Invalid Token' });

  const destinations = await Destination.findAll({ where: { AccountId: account.id } });

  for (const dest of destinations) {
    try {
      const headers = dest.headers;
      if (dest.httpMethod === 'GET') {
        await axios.get(dest.url, { headers, params: req.body });
      } else if (dest.httpMethod === 'POST') {
        await axios.post(dest.url, req.body, { headers });
      } else if (dest.httpMethod === 'PUT') {
        await axios.put(dest.url, req.body, { headers });
      }
    } catch (err) {
      console.error('Error sending to destination:', err.message);
    }
  }

  res.json({ message: 'Data forwarded to destinations' });
};
module.exports = {
  receiveData
};