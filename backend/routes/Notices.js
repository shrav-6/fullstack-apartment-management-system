/**
 * Express router to handle notice-related routes.
 * @module Routes/Notices
 */

const express = require('express');
const router = express.Router();
const { validateToken } = require('../Middleware/middleware');
const service = require('../Service/Notices');

/**
 * Route to get a particular notice by ID.
 * @name GET/:noticeId
 * @function
 * @memberof module:Routes/Notices
 * @inner
 * @param {string} path - Express route path ("/:noticeId").
 * @param {function} middleware - Middleware function to validate the user's token.
 * @param {function} callback - Express route callback.
 */
router.get('/:noticeId', validateToken, async (req, res) => {
  try {
    const noticeId = req.params.noticeId;
    const role = req.user.role;
    const user_id = req.user.id;

    // Retrieve notice using the data layer function
    const notice = await service.getNoticeById(noticeId, role, user_id);

    // Respond with the result
    if (notice !== null) {
      res.json({ success: true, message: 'Retrieved successfully', data: notice });
    } else {
      res.json({
        success: false,
        error: "User doesn't have the permission to see the notices",
      });
    }
  } catch (error) {
    console.error('Error in get notice by ID:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

/**
 * Route to get all notices for tenants.
 * @name GET/
 * @function
 * @memberof module:Routes/Notices
 * @inner
 * @param {string} path - Express route path ("/").
 * @param {function} middleware - Middleware function to validate the user's token.
 * @param {function} callback - Express route callback.
 */
router.get('/', validateToken, async (req, res) => {
  try {
    const role = req.user.role;
    const user_id = req.user.id;

    // Retrieve all notices using the data layer function
    const notices = await service.getAllNoticesTenant(role, user_id);

    // Respond with the result
    if (notices !== null) {
      res.json({ success: true, message: 'Retrieved successfully', data: notices });
    } else {
      res.json({ success: false, error: "User doesn't have the permission" });
    }
  } catch (error) {
    console.error('Error in get all notices:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

/**
 * Route to get all notices for a manager based on buildingId.
 * @name GET/manager/:buildingId
 * @function
 * @memberof module:Routes/Notices
 * @inner
 * @param {string} path - Express route path ("/manager/:buildingId").
 * @param {function} middleware - Middleware function to validate the user's token.
 * @param {function} callback - Express route callback.
 */
router.get('/manager/:buildingId', validateToken, async (req, res) => {
  try {
    const buildingId = req.params.buildingId;
    const role = req.user.role;
    const user_id = req.user.id;

    // Retrieve all notices using the data layer function
    const notices = await service.getAllNoticesManager(role, user_id, buildingId);

    // Respond with the result
    if (notices !== null) {
      res.json({ success: true, message: 'Retrieved successfully', data: notices });
    } else {
      res.json({ success: false, error: "User doesn't have the permission" });
    }
  } catch (error) {
    console.error('Error in get all notices:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

/**
 * Route to post a new notice.
 * @name POST/
 * @function
 * @memberof module:Routes/Notices
 * @inner
 * @param {string} path - Express route path ("/").
 * @param {function} middleware - Middleware function to validate the user's token.
 * @param {function} callback - Express route callback.
 */
router.post('/', validateToken, async (req, res) => {
  try {
    const notice = req.body;
    const user_id = req.user.id;
    const role = req.user.role;
    const buildingName = req.body.buildingName;

    // Create a new notice using the data layer function
    const result = await service.createNotice(notice, user_id, role, buildingName);

    // Respond with the result
    if (result) {
      res.json({ success: true, message: 'Created successfully' });
    } else {
      res.json({
        success: false,
        error: "User doesn't have the permission to create a notice",
      });
    }
  } catch (error) {
    console.error('Error in create notice:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

/**
 * Route to delete a notice.
 * @name DELETE/:noticeId
 * @function
 * @memberof module:Routes/Notices
 * @inner
 * @param {string} path - Express route path ("/:noticeId").
 * @param {function} middleware - Middleware function to validate the user's token.
 * @param {function} callback - Express route callback.
 */
router.delete('/:noticeId', validateToken, async (req, res) => {
  try {
    const noticeId = req.params.noticeId;
    const user_id = req.user.id;
    const role = req.user.role;

    // Delete a notice using the data layer function
    const result = await service.deleteNotice(noticeId, user_id, role);

    // Respond with the result
    if (result) {
      res.json({ success: true, message: 'Deleted successfully' });
    } else {
      res.json({ success: false, error: "User doesn't have the permissions" });
    }
  } catch (error) {
    console.error('Error in delete notice:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

/**
 * Route to update a notice.
 * @name PUT/:noticeId
 * @function
 * @memberof module:Routes/Notices
 * @inner
 * @param {string} path - Express route path ("/:noticeId").
 * @param {function} middleware - Middleware function to validate the user's token.
 * @param {function} callback - Express route callback.
 */
router.put('/:noticeId', validateToken, async (req, res) => {
  try {
    const noticeId = req.params.noticeId;
    const title = req.body.title;
    const description = req.body.description;
    const dateAndTime = req.body.dateAndTime;
    const user_id = req.user.id;
    const role = req.user.role;
    const priority=req.body.priority;

    // Update a notice using the data layer function
    const result = await service.updateNotice(
      noticeId,
      title,
      description,
      dateAndTime,
      user_id,
      role,
      priority
    );

    // Respond with the result
    if (result) {
      res.json({ success: true, message: 'Updated successfully' });
    } else {
      res.json({ success: false, error: "User doesn't have the permissions" });
    }
  } catch (error) {
    console.error('Error in update notice:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Export the router
module.exports = router;
