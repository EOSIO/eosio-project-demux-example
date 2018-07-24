const express = require('express')
const postController = require('./post.controller')

const router = express.Router()

router.route('/').get(postController.listConfirmed)

router.route('/newEmpty').get(postController.createEmpty)

module.exports = router
