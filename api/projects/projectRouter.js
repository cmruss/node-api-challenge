const express = require('express');

const Project = require('../../data/helpers/projectModel');
const Action = require('../../data/helpers/actionModel');
const midWare = require('./projectMiddleware'); 

const router = express.Router();

// POST
router.post('/', midWare.validateProject, (req, res) => {
    Project.insert(req.body)
    .then(proj => {
        res.status(201).json(proj)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Could not add project data."})
    })
})

// GET
router.get('/', (req, res) => {
    Project.get()
    .then(proj => {
        res.status(200).json(proj)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "The project data could not be retrieved."})
    });
});

// GET BY ID
router.get('/:id', midWare.validateId, (req, res) => {
    res.status(200).json(req.proj)
});

// GET PROJECT ACTIONS
router.get('/:id/actions', midWare.validateId, (req, res) => {
    Project.getProjectActions(req.params.id)
    .then(act => {
        if (act.length < 1 ){
            res.status(200).json({ message: "There are no actions yet."})
        } else {
            res.status(200).json(act)
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Could not retrieve actions for this project."})
    });
});



//PUT
router.put('/:id', midWare.validateId, midWare.validateProject, (req, res) => {
    Project.update(req.params.id, req.body)
    .then(upd => {
        if (upd === null) {
            res.status(500).json({ error: "The project could not be updated."})
        } else {
            res.status(200).json(upd)
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "The project was not modified."})
    });
});

// DELETE
router.delete('/:id', midWare.validateId, (req, res) => {
    Project.remove(req.params.id)
    .then(_res => {
        res.status(200).json({ message: "Project deleted." });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Project could not be deleted" });
    });
});


module.exports = router;