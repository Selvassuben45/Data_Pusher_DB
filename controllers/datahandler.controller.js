//   const db = require('../models');
//   const axios = require('axios');

//   // exports.receiveData = async (req, res) => {
//   //   const token = req.headers['cl-x-token'];

//   //   if (!token) {
//   //     return res.status(401).json({ message: "Un Authenticate" });
//   //   }

//   //   try {
//   //     // Check content type
//   //     if (req.method === 'GET' && typeof req.body !== 'object') {
//   //       return res.status(400).json({ message: "Invalid Data" });
//   //     }

//   //     // Find account
//   //     const account = await db.Account.findOne({
//   //       where: { appSecret: token },
//   //       // include: [db.Destination]
//   //         include: [{ model: db.Destination, as: 'Destinations' }]

//   //     });

//   //     if (!account) {
//   //       return res.status(401).json({ message: "Invalid token" });
//   //     }

//   //     const destinations = account.Destinations;

//   //     const promises = destinations.map(dest => {
//   //       const config = {
//   //         method: dest.httpMethod.toLowerCase(),
//   //         url: dest.url,
//   //         headers: dest.headers
//   //       };

//   //       if (dest?.method?.toUpperCase() === 'GET') {
//   //         config.params = req.body; // JSON → query params
//   //       } else if (['POST', 'PUT'].includes(dest?.method?.toUpperCase())) {
//   //         config.data = req.body; // JSON → body
//   //       } else {
//   //         return Promise.resolve({ message: `Unsupported method: ${dest.method}` });
//   //       }

//   //       return axios(config)
//   //         .then(response => ({ status: 'success', dest: dest.url }))
//   //         .catch(error => ({
//   //           status: 'failed',
//   //           dest: dest.url,
//   //           error: error.message
//   //         }));
//   //     });

//   //     const results = await Promise.all(promises);
//   //     res.status(200).json({
//   //       message: "Data pushed to destinations.",
//   //       results
//   //     });
//   //   } catch (err) {
//   //     console.error("Error forwarding data:", err);
//   //     res.status(500).json({ message: "Internal Server Error" });
//   //   }
//   // };


//   exports.receiveData = async (req, res) => {
//   const token = req.headers['cl-x-token'];

//   if (!token) {
//     return res.status(401).json({ message: "Un Authenticate" });
//   }

//   try {
//     // Check content type
//     if (req.method === 'GET' && typeof req.body !== 'object') {
//       return res.status(400).json({ message: "Invalid Data" });
//     }

//     // Find account
//     const account = await db.Account.findOne({
//       where: { appSecret: token },
//       include: [{ model: db.Destination, as: 'Destinations' }]
//     });

//     if (!account) {
//       return res.status(401).json({ message: "Invalid token" });
//     }

//     const destinations = account.Destinations;

//     const promises = destinations.map(dest => {
//       const method = dest.httpMethod?.toUpperCase();

//       const config = {
//         method: method?.toLowerCase(),
//         url: dest.url,
// headers: typeof dest.headers === 'string' ? JSON.parse(dest.headers) : (dest.headers || {})
//       };

//       if (method === 'GET') {
//         config.params = req.body;
//       } else if (['POST', 'PUT'].includes(method)) {
//         config.data = req.body;
//       } else {
//         return Promise.resolve({ status: 'skipped', message: `Unsupported method: ${method}` });
//       }

//       // return axios(config)
//       //   .then(response => ({ status: 'success', dest: dest.url }))
//       //   .catch(error => ({
//       //     status: 'failed',
//       //     dest: dest.url,
//       //     error: error.message
//       //   }));
//       return axios(config)
//   .then(response => ({
//     status: 'success',
//     dest: dest.url,
//     response: response.data,
//   }))
//   .catch(error => {
//     console.error(`Failed to push to ${dest.url}:`, error.toJSON ? error.toJSON() : error.message);
//     return {
//       status: 'failed',
//       dest: dest.url,
//       error: error.toJSON ? error.toJSON() : error.message
//     };
//   });

//     });

//     const results = await Promise.all(promises);

//     res.status(200).json({
//       message: "Data pushed to destinations.",
//       results
//     });
//   } catch (err) {
//     console.error("Error forwarding data:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
// const db = require('../models');
// const axios = require('axios');

// exports.receiveData = async (req, res) => {
//   const token = req.headers['cl-x-token'];

//   if (!token) {
//     return res.status(401).json({ message: "Unauthenticated: Missing token" });
//   }

//   try {
//     // Optional: Restrict only to allowed content-type
//     if (req.method === 'GET' && typeof req.body !== 'object') {
//       return res.status(400).json({ message: "Invalid data format for GET request" });
//     }

//     // Find account by token
//     const account = await db.Account.findOne({
//       where: { appSecret: token },
//       include: [{ model: db.Destination, as: 'Destinations' }]
//     });

//     if (!account) {
//       return res.status(401).json({ message: "Invalid token: No matching account found" });
//     }

//     const destinations = account.Destinations || [];

//     const promises = destinations.map(dest => {
//       const method = dest.httpMethod?.toUpperCase();

//       // Parse headers safely
//       let headers = {};
//       if (typeof dest.headers === 'string') {
//         try {
//           headers = JSON.parse(dest.headers);
//         } catch (err) {
//           console.warn(`Invalid JSON in headers for ${dest.url}`);
//         }
//       } else if (typeof dest.headers === 'object') {
//         headers = dest.headers;
//       }

//       const config = {
//         method: method?.toLowerCase(),
//         url: dest.url,
//         headers
//       };

//       if (method === 'GET') {
//         config.params = req.body;
//       } else if (['POST', 'PUT'].includes(method)) {
//         config.data = req.body;
//       } else {
//         return Promise.resolve({
//           status: 'skipped',
//           dest: dest.url,
//           message: `Unsupported HTTP method: ${method}`
//         });
//       }

//       return axios(config)
//         .then(response => ({
//           status: 'success',
//           dest: dest.url,
//           response: response.data
//         }))
//         .catch(error => {
//           const errorInfo = error.toJSON ? error.toJSON() : { message: error.message };
//           console.error(`Error pushing to ${dest.url}:`, errorInfo);
//           return {
//             status: 'failed',
//             dest: dest.url,
//             error: errorInfo
//           };
//         });
//     });

//     const results = await Promise.all(promises);

//     return res.status(200).json({
//       message: "Data pushed to destinations.",
//       results
//     });

//   } catch (err) {
//     console.error("Internal Server Error:", err);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };
const { Account } = require('../models');
// const WebhookService = require('../services/webhookServices');
exports.receiveData=async(req, res)=> {
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