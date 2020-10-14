'use strict'

let express = require('express');
let ProjectControler = require('../controllers/project');

let router = express.Router();

let multipart = require('connect-multiparty');
let multipartMiddleware = multipart({uploadDir: './uploads'});

router.get('/', ProjectControler.home);
router.post('/test', ProjectControler.test);
router.post('/save-project', ProjectControler.saveProject);
router.get('/project/:id?', ProjectControler.getProject);
router.get('/projects', ProjectControler.getProjects);
router.put('/project/:id', ProjectControler.updateProject);
router.delete('/project/:id', ProjectControler.deleteProject);
router.post('/upload-image/:id', multipartMiddleware, ProjectControler.uploadImage);
router.get('/dannermm', ProjectControler.dannermm);

module.exports = router;