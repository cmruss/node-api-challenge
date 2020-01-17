const Action = require('../../data/helpers/actionModel');

module.exports = {
    validateId,
    validateAction
};

function validateId (req, res, next) {
    if (req.params.id) {
        Action.get(req.params.id)
        .then(act => {
            if (act === null){
                res.status(400).json({ message: "Invalid action ID."})
            } else {
                req.act = act;
                next();
            }
        })
    };
};


function validateAction(req, res, next) {
    if (Object.keys(req.body).length < 1){
        res.status(400).json({ message: "Please provide action data."})
    } else if (!req.body.description || req.body.description < 1 ) {
        res.status(400).json({ message: "Please provide action description."})
    } else if (!req.body.notes || req.body.notes.length < 1 ) {
        res.status(400).json({ message: "Please provide action notes."})
    } else {
        next();
    };
};