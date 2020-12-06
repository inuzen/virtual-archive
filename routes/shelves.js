const express = require('express');
const router = express.Router();

const { Shelf, Folder } = require('../config/db');

// const getFoldersByShelf = (shelfID) => {
//     const res = Folder.findAll({
//         where: {
//             ShelfId: shelfID,
//         },
//     });
//     return res;
// };

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
        const shelves = await Shelf.findAll({
            include: {
                model: Folder,
                required: false,
                where: {
                    isSubFolder: false,
                },
            },
        });
        console.log(shelves);
        res.json(shelves);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
