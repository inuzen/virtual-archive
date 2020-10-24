const express = require('express');
const router = express.Router();

const { Document } = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const docs = await Document.findAll();
        console.log(docs.every((docs) => docs instanceof Document)); // true
        console.log('All folders:', JSON.stringify(docs, null, 2));

        res.json(docs);
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
        const { name, number, designation, description, tags, folderID } = req.body;

        if (!name || !folderID) {
            res.send(400).send('Either name or folderID is missing!');
        }
        const document = await Document.create({
            name,
            number,
            designation,
            description,
            tags,
            FolderId: folderID,
        });

        // await user.save();
        res.json({ document }); // Returns the new user that is created in the database
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route     POST api/folders
// @desc      Create a folder
// @access    Public
router.put('/:id', async (req, res) => {
    try {
        const { name, number, designation, description, tags, folderID } = req.body;

        if (!name || !folderID) {
            res.send(400).send('Either name or folderID is missing!');
        }
        const document = await Document.update(
            {
                name,
                number,
                designation,
                description,
                tags,
                FolderId: folderID,
            },
            {
                where: {
                    id: req.params.id,
                },
            },
        );

        // await user.save();
        res.json({ document }); // Returns the new user that is created in the database
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let doc = await Document.findOne({
            where: {
                id: req.params.id,
            },
        });
        // console.log(folder);
        if (!doc) return res.status(404).json({ msg: 'Document not found' });

        await Document.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.json({ msg: 'Document removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
