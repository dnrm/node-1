'use strict'

let Project = require('../models/project');
let fs = require('fs');
let path = require('path');

let controller = {
    home: function(req, res) {
        return res.status(200).send({
            message: 'I\'m home',
            time: new Date()
        })
    },

    test: function(req, res) {
        return res.status(200).send({
            message: 'I\'m test',
            time: new Date()
        })
    },

    saveProject: function(req, res) {
        let project = new Project();

        let params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = params.image;

        project.save((err, projectStored) => {
            if (err) return res.status(500).send({message: 'Error saving...'});

            if (!projectStored) return res.status(404).send({message: 'Unable to save project...'});

            return res.status(200).send({project: projectStored});
        });
    },

    getProject: function(req, res) {
        let projectId = req.params.id;

        if (projectId == null) return res.status(404).send({message: 'Document not found'})
        
        Project.findById(projectId, (err, project) => {
            if (err) return res.status(500).send({message: 'Error retreiving document'});
            if (!project) return res.status(404).send({message: 'Document not found'});
            return res.status(200).send({
                project
            });
        })
    },

    getProjects: function(req, res) {
        Project.find({}).sort('-year').exec((err, projects) => {
            if (err) return res.status(500).send({
                message: 'Error retreiving data'
            })
            if (!projects) return res.status(404).send({
                message: 'There are no projects'
            })
            return res.status(200).send({
                host: req.headers.host,
                time: new Date(),
                projects,
                copyright: 'Daniel Medina 2020'
            });
        })
    },

    updateProject: function(req, res) {
        let projectId = req.params.id;
        let update = req.body;

        Project.findByIdAndUpdate(projectId, update, (err, projectUpdated) => {
            if (err) return res.status(500).send({message: 'Error updating project', error: err});
            if (!projectUpdated) return res.status(404).send({message: 'Proejct does not exist'});
            return res.status(200).send({
                project: projectUpdated
            })
        });
    },

    deleteProject: function(req, res) {
        let projectId = req.params.id;
        Project.findByIdAndRemove(projectId, (err, projectDeleted) => {
            if (err) return res.status(500).send({message: 'Error deleting project'});
            if (!projectDeleted) return res.status(404).send({message: 'Proejct does not exist'});
            return res.status(200).send({
                project: projectDeleted
            })
        })
    },

    uploadImage: function(req, res) {
        let projectId = req.params.id;
        if (req.files) {
            let filePath = req.files.image.path;
            let fileSplit = filePath.split('/');
            let fileName = fileSplit[1];
            let extSplit = fileName.split('\.');
            let fileExt = extSplit[1];

            if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {
                Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true}, (err, projectUpdated) => {
                    if (err) return res.status(500).send({message: 'Error uploading file'})
                    if (!projectUpdated) return res.status(404).send({message: 'Project does not exist'})
                    return res.status(200).send({
                        project: projectUpdated
                    })
                })
            } else {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({
                        message: "Extension is not valid"
                    });
                })
            }
        } else {
            console.log('files' + req.files);
            return res.status(500).send({
                message: 'Image not uploaded'
            })
        }
    },

    getImageFile: function(req, res) {
        let file = req.params.image;
        let path_file = './uploads/' + file;

        fs.exists(path_file, (exists) => {
            if (exists) {
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(200).send({
                    message: "Image does not exist"
                })
            }
        })
    },

    dannermm: function(req, res) {
        return res.status(200).send({
            url: '/dannermm',
            time: new Date()
        })
    }
}

module.exports = controller;