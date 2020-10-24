const express = require('express');
const router = express.Router();

const { Shelf, Folder } = require('../config/db');

const getFoldersByShelf = (shelfID) => {
    const res = Folder.findAll({
        where: {
            ShelfId: shelfID,
        },
    });
    return res;
};

router.get('/', async (req, res) => {
    try {
        const shelves = await Shelf.findAll();

        res.json(shelves);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});
router.get('/withFolders', async (req, res) => {
    try {
        const shelves = await Shelf.findAll();
        let result = [];

        let foldersByShelves = await Promise.all(
            shelves.map((shelf) => {
                return getFoldersByShelf(shelf.id);
            }),
        );
        shelves.forEach((shelf) => {
            result.push({
                ...shelf.get({ plain: true }),
                folders: foldersByShelves.find((folderArray) => {
                    if (folderArray.length) {
                        return folderArray[0].ShelfId === shelf.id;
                    }
                    return [];
                }),
            });
        });

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});
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
