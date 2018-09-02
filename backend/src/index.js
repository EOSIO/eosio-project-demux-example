require('dotenv').config()
const app = require('express')()
const cors = require('cors')
const demux = require('./services/demux')
const postsRoutes = require('./api/posts')
const io = require('./utils/io')

app.use(cors())

app.use('/posts', postsRoutes)

const server = app.listen(process.env.PORT, () => console.info(`Example app listening on port ${process.env.PORT}!`))

io.connect(server)

demux.watch()
