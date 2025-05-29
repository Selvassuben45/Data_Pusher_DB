
const { Account } = require('../models');

const receiveData = async (req, res) => {
  // Check for secret token in headers
  const secretToken = req.headers['cl-x-token'];
  if (!secretToken) {
    return res.status(401).json({ error: 'Un Authenticate' });
  }

  // Check if data is JSON
  if (!req.is('application/json')) {
    return res.status(400).json({ error: 'Invalid Data' });
  }

  try {
    // Find account by secret token
    const account = await Account.findOne({
      where: { appSecretToken: secretToken },
      include: ['destinations']
    });

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    if (!account.destinations || account.destinations.length === 0) {
      return res.json({
        message: 'Data received but no destinations configured',
        data: req.body
      });
    }

    // Send data to all destinations
    const results = await Promise.all(
      account.destinations.map(destination =>
        WebhookService.sendToDestination(destination, req.body)
      ));

    // Count successes and failures
    const successCount = results.filter(r => r.status === 'success').length;
    const failureCount = results.filter(r => r.status === 'failed').length;

    return res.json({
      message: `Data processed. Success: ${successCount}, Failed: ${failureCount}`,
      results: results,
      data: req.body
    });
  } catch (error) {
    console.error('Error processing data:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
}
module.exports = {
  receiveData
};