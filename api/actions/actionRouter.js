const express = require('express');

const Action = require('../../data/helpers/actionModel');
const midWare = require('./actionMiddleware');

const router = express.Router();

// POST
router.post('/project/:id', midWare.validateAction, (req, res) => {
    let action = req.body
    action = {...action, project_id: req.params.id}
    Action.insert(action)
    .then(act => {
        res.status(201).json(act)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Could not add action."})
    });
});

// GET
router.get('/', (req, res) => {
    Action.get()
    .then(act => {
        res.status(200).json(act)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "The action data could not be retrieved."})
    });
});

// GET BY ID
router.get('/:id', midWare.validateId, (req, res) => {
    res.status(200).json(req.act)
});

//PUT
router.put('/:id', midWare.validateId, midWare.validateAction, (req, res) => {
    Action.update(req.params.id, req.body)
    .then(upd => {
        if (upd === null) {
            res.status(500).json({ error: "The action could not be updated."})
        } else {
            res.status(200).json(upd)
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "The action was not modified."})
    });
});

// DELETE
router.delete('/:id', midWare.validateId, (req, res) => {
    Action.remove(req.params.id)
    .then(_res => {
        res.status(200).json({ message: "Action deleted." });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Action could not be deleted" });
    });
});

module.exports = router;