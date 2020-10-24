const express = require('express');
const router = express.Router();

const { Shelf } = require('../config/db');

// @route     POST api/users
// @desc      Regiter a user
// @access    Public
router.post('/', async (req, res) => {
    const { name, number } = req.body;

    try {
        console.log(req.body);

        const shelf = await Shelf.create({ name, number });

        // await user.save();
        res.json({ shelf }); // Returns the new user that is created in the database
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
