import csvtojson from "csvtojson";
import ICsvData from "./csv-data.interface";

export default class CsvRepository {
	async create (data: ICsvData) {
		const json = await csvtojson().fromFile(data.csv_path)

		return json
	}
}