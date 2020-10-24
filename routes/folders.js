const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { Op } = require('sequelize');
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
router.get('/findFolder', async (req, res) => {
    try {
        const { name, year, number, format } = req.body;
        let searchObj = {};
        if (name) {
            searchObj.name = name;
        }
        if (year) {
            searchObj.year = year;
        }
        if (number) {
            searchObj.number = number;
        }
        if (format) {
            searchObj.format = format;
        }

        const folders = await Folder.findAll({
            where: searchObj,
        });

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
    try {
        const { name, year, number, format, isSubFolder, shelfID, parentFolderId } = req.body;

        if (isSubFolder) {
            if (!parentFolderId) {
                res.status(400).send('Folder is marked as Subfolder but doesnt contain parent ID');
            }
        }

        if (!name || !year || !number || !format) {
            res.send(400).send('One or more of the required fields is missing');
        }
        if (format !== 'A3' && format !== 'A4') {
            res.status(400).send('Invalid format');
        }

        const folder = await Folder.create({
            name,
            year,
            number,
            format,
            isSubFolder,
            parentFolderId: isSubFolder ? parentFolderId : null,
            ShelfId: shelfID,
        });

        // await user.save();
        res.json({ folder }); // Returns the new user that is created in the database
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let folder = await Folder.findOne({
            where: {
                id: req.params.id,
            },
        });
        // console.log(folder);
        if (!folder) return res.status(404).json({ msg: 'Folder not found' });

        await Folder.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.json({ msg: 'Folder removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route PUT api/contacts/:id
// @desc Update contact
// @access Private
router.put('/:id', async (req, res) => {
    const { name, year, number, format, isSubFolder, shelfID, parentFolderId } = req.body;

    try {
        console.log(req.body);

        if (isSubFolder) {
            if (!parentFolderId) {
                res.status(400).send('Folder is marked as Subfolder but doesnt contain parent ID');
            }
        }

        if (!name || !year || !number || !format) {
            res.send(400).send('One or more of the required fields is missing');
        }
        if (format !== 'A3' && format !== 'A4') {
            res.status(400).send('Invalid format');
        }

        const folder = await Folder.update(
            {
                name,
                year,
                number,
                format,
                isSubFolder,
                parentFolderId: isSubFolder ? parentFolderId : null,
                ShelfId: shelfID,
            },
            {
                where: {
                    id: req.params.id,
                },
            },
        );

        // await user.save();
        res.json({ folder }); // Returns the new user that is created in the database
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
