/**
 * Express router to handle user-related routes.
 * @module Routes/Users
 */

const express = require('express');
const router = express.Router();
const userService = require('../Service/Users');

/**
 * Route for user signup.
 * @name POST/signup
 * @function
 * @memberof module:Routes/Users
 * @inner
 * @param {string} path - Express route path ("/signup").
 * @param {function} callback - Express route callback.
 */
router.post('/signup', async (req, res) => {
  try {
    const result = await userService.signUpUser(req.body);
    res.json(result);
  } catch (error) {
    console.error('Error in /signup route:', error);
    res.json({
      success: false,
      data: 'An error occurred while processing your request.',
    });
  }
});

/**
 * Route for user login.
 * @name POST/login
 * @function
 * @memberof module:Routes/Users
 * @inner
 * @param {string} path - Express route path ("/login").
 * @param {function} callback - Express route callback.
 */
router.post('/login', async (req, res) => {
  try {
    const result = await userService.loginUser(req.body);
    res.json(result);
  } catch (error) {
    console.error('Error in /login route:', error);
    res.json({
      success: false,
      data: 'An error occurred while processing your request.',
    });
  }
});

// Export the router
module.exports = router;
