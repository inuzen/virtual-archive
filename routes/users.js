const express = require('express');
const router = express.Router();

const { User } = require('../config/db');

// @route     POST api/users
// @desc      Regiter a user
// @access    Public
router.post('/', async (req, res) => {
    const { firstName, lastName } = req.body;

    try {
        console.log(req.body);

        const user = new User(req.body);

        await user.save();
        res.json({ user }); // Returns the new user that is created in the database
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
