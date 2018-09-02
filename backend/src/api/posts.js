const express = require('express')
const { listConfirmed } = require('../services/post')

const router = express.Router()

router.route('/').get(listConfirmed)

module.exports = router
