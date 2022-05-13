import express from 'express'
import ItemRepository from '../repositories/item-repository'

const itensRouter = express.Router()

itensRouter.post('/csv-to-mongo', async (req, res) => {
	console.log('ok')
	const data: any = req.body

	try {
		const items = await new ItemRepository().create(data)

		return res.status(200).json({
			ok: 'ok'
		})
	} catch (error: any) {
		return res.status(400).json({
			error: error.message || error
		})
	}
	
})

export default itensRouter