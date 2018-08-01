const express = require('express')
const postController = require('./post.controller')

const router = express.Router()

router.route('/').get(postController.listConfirmed)

module.exports = router
