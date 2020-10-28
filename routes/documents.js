const express = require('express');
const router = express.Router();
const { Document, Folder } = require('../config/db');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
    try {
        const docs = await Document.findAll();

        res.json(docs);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});
router.get('/:id', async (req, res) => {
    try {
        const doc = await Document.findOne({
            where: {
                id: req.params.id,
            },
        });

        res.json(doc);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});
router.get('/findDocument', async (req, res) => {
    try {
        const { name, number, designation } = req.body;

        let searchObj = {};
        if (name) {
            searchObj.name = { [Op.substring]: name.toLowerCase() };
        }
        if (designation) {
            searchObj.year = { [Op.substring]: designation.toLowerCase() };
        }
        if (number) {
            searchObj.number = { [Op.substring]: number.toLowerCase() };
        }

        const docs = await Document.findAll({
            where: searchObj,
            include: {
                model: Folder,
                where: {
                    id: 1,
                },
            },
        });

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
            name: name.toLowerCase(),
            number: number ? number.toLowerCase() : '',
            designation: designation ? designation.toLowerCase() : '',
            description: description ? description.toLowerCase() : '',
            tags: tags ? tags : [],
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
