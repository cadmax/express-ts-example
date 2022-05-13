import * as dotenv from 'dotenv'

dotenv.config({
	path: '.env'
})

const envs: any = process.env

export default envs