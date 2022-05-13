import express from 'express'
import ICsvData from '../repositories/csv/csv-data.interface'
import CsvRepository from '../repositories/csv/csv.repository'

const itensRouter = express.Router()

itensRouter.post('/csv-to-mongo', async (req, res) => {
	const data: ICsvData = req.body

	try {
		const items = await new CsvRepository().create(data)

		return res.status(200).json(items)
	} catch (error: any) {
		return res.status(400).json({
			error: error.message || error
		})
	}
	
})

export default itensRouter