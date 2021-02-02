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

router.get('/byFolder/:folderId', async (req, res) => {
    try {
        const docs = await Document.findAll({
            where: {
                FolderId: req.params.folderId,
            },
        });

        res.json(docs);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.post('/findDocument', async (req, res) => {
    try {
        const { name, number, designation, doc_type, date_in_arch, folderId } = req.body;

        let searchObj = {};
        if (name) {
            searchObj.name = { [Op.substring]: name.toLowerCase() };
        }
        if (designation) {
            searchObj.designation = { [Op.substring]: designation.toLowerCase() };
        }
        if (number) {
            searchObj.number = { [Op.substring]: number.toString() };
        }
        if (doc_type) {
            searchObj.doc_type = { [Op.substring]: doc_type.toLowerCase() };
        }
        if (date_in_arch) {
            searchObj.date_in_arch = { [Op.substring]: date_in_arch.toLowerCase() };
        }
        if (folderId) {
            searchObj.FolderId = folderId;
        }

        const docs = await Document.findAll({
            where: searchObj,
            include: Folder,
        });

        const high = docs.reduce(
            (acc, curr) => {
                acc.documents.push(curr.id);
                acc.folders.push(curr.Folder.id);
                acc.shelves.push(curr.Folder.ShelfId);
                if (curr.Folder.isSubFolder) {
                    acc.folders.push(curr.Folder.parentFolderId);
                }
                return acc;
            },
            {
                documents: [],
                folders: [],
                shelves: [],
            },
        );

        res.json({
            documents: high.documents,
            folders: [...new Set(high.folders)],
            shelves: [...new Set(high.shelves)],
        });
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
// @route     POST api/documents
// @desc      Create a document
// @access    Public
router.post('/', async (req, res) => {
    try {
        const { name, number, designation, doc_type, date_in_arch, description, tags, folderId } = req.body;

        if (!name || !folderId) {
            res.send(400).send('Either name or folderId is missing!');
        }
        const document = await Document.create({
            name: name.toLowerCase(),
            number: number ? number.toLowerCase() : '',
            designation: designation ? designation.toLowerCase() : '',
            doc_type: doc_type.toLowerCase(),
            date_in_arch: date_in_arch.toLowerCase(),
            description: description ? description.toLowerCase() : '',
            tags: tags ? tags : [],
            FolderId: folderId,
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
        const { name, number, designation, doc_type, date_in_arch, description, tags, folderId } = req.body;

        if (!name || !folderId) {
            res.send(400).send('Either name or folderId is missing!');
        }
        const document = await Document.update(
            {
                name,
                number,
                designation,
                doc_type,
                date_in_arch,
                description,
                tags,
                FolderId: folderId,
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
