import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import demux from './services/demux'
import posts from './routes/posts'
import io from './utils/io'

let app = express()

app.use(cors())

app.use('/posts', posts())

const server = app.listen(process.env.PORT, () => console.info(`Example app listening on port ${process.env.PORT}!`))

io.connect(server)

demux.watch()
