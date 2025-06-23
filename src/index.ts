import express from 'express'
import route from './modules/alunos/routes/AlunoRoutes'

const app = express()
app.use(express.json())

app.use('/alunos', route)

app.get('/', (req, res) => {
  res.send('API funcionando')
})

app.listen(3000, () => console.log('Server rodando na porta 3000'))
