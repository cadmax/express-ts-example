import csvtojson from "csvtojson";
import ICsvData from "./csv-data.interface";
import mongoose from 'mongoose'
import Env from "../../commons/Env";
import { sleep } from "../../helpers/functions";

export default class CsvRepository {
	async create(data: ICsvData) {

		const arrayJson = await csvtojson().fromFile(data.csv_path)

		await mongoose.connect(Env.DATABASE_URI);

		const connection = mongoose.connection;

		const chunkSize: number = 10;
		const chunks: any[] = []
		const sleepMS: number = 100

		for (let i = 0; i < arrayJson.length; i += chunkSize) {
			const chunk: any[] = arrayJson.slice(i, i + chunkSize);

			chunks.push(chunk)
		}

		const inserts: any[] = []
		let totalItems = 0

		for (const items of chunks) {
			const payload = items.map((i: any) => {
				Object.keys(i).forEach(k => {
					if (i[k]) {
						const value = this.isNumeric(i[k]) ? parseInt(i[k], 10) : i[k]
						i[k] = value
					}
				})

				return i
			})

			const insert = await connection.useDb(data.database_name).collection(data.collection).insertMany(payload);

			totalItems += insert.insertedCount

			inserts.push(insert)

			await sleep(sleepMS)
		}

		return {
			totalInserts: inserts.length,
			totalItems
		}
	}

	isNumeric(num: any){
		return !isNaN(num)
	  }
}