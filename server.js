import express from 'express'

let app = express()

import init from './init.js'
import routes from './routes/index.js'

init(app)

app.use('/api', routes)

app.use((pack, req, res, next) => {
	let {
		status,
		data,
		feedback
	} = pack

	res.status(status).json({data, feedback})
})

app.listen(process.env.PORT || 5000, () => 'Server is running...')