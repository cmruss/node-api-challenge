const Project = require('../../data/helpers/projectModel');

module.exports = {
    validateId,
    validateProject
};

function validateId (req, res, next) {
    if (req.params.id) {
        Project.get(req.params.id)
        .then(proj => {
            if (proj === null){
                res.status(400).json({ message: "Invalid project ID."})
            } else {
                req.proj = proj;
                next();
            }
        })
    };
};


function validateProject(req, res, next) {
    if (Object.keys(req.body).length < 1){
        res.status(400).json({ message: "Please provide project data."})
    } else if (!req.body.name || req.body.name.length < 1 ) {
        res.status(400).json({ message: "Please provide project name."})
    } else if (!req.body.description || req.body.description < 1 ) {
        res.status(400).json({ message: "Please provide project description."})
    } else {
        next();
    };
};