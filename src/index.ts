import express from 'express'
import cors from 'cors'
import itensRouter from './routers/itens-router'
import * as dotenv from 'dotenv'

dotenv.config({
	path: '.env'
})

// Porta do servidor
const PORT = process.env.PORT

// App Express
const app = express()

// JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Endpoint raiz
app.get('/', (req, res) => {
	res.json({
		success: true
	})
})

// Cors
app.use(cors({
	origin: ['*']
}))

// Rotas
app.use('/api', itensRouter)

// Resposta padrão para quaisquer outras requisições:
app.all('*', (req, res) => {
	res.status(404).json({
		error: 'route not found'
	})
})

// Inicia o sevidor
app.listen(PORT, () => {
	console.log(`Server started :${PORT}`)
})