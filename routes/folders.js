const express = require('express');
const router = express.Router();

const { Folder } = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const folders = await Folder.findAll();
        console.log(folders.every((folders) => folders instanceof Folder)); // true
        console.log('All folders:', JSON.stringify(folders, null, 2));

        res.json(folders);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// @route     POST api/folders
// @desc      Create a folder
// @access    Public
router.post('/', async (req, res) => {
    const { name, shelfID } = req.body;

    try {
        console.log(req.body);

        const folder = await Folder.create({
            name,
            ShelfId: shelfID,
        });

        // await user.save();
        res.json({ folder }); // Returns the new user that is created in the database
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
