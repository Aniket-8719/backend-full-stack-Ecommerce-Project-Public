// apiKeyMiddleware.js
const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key']; // Get the API key from the request headers
    const expectedApiKey = process.env.API_KEY; // Get the expected API key from environment variables
  
    if (apiKey && apiKey === expectedApiKey) {
      // API key is valid
      next(); // Proceed to the next middleware or route handler
    } else {
      // API key is missing or invalid
      res.status(403).json({ message: 'Forbidden: Invalid API key' });
    }
  };
  
  module.exports = apiKeyMiddleware;
  