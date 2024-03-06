const express = require('express')
const path = require('path');

const app = express()

//setup static and middleware
app.use(express.static('./static'))


app.get('/', (req, res) => {
    console.log('user hit get method')
    res.sendFile(path.resolve(__dirname, './html/index.html'))
    res.status(200).send('hello world')
})

app.get('/about', (req, res) => {
    console.log('user hit about method')
    res.status(200).send('about page')
})

app.all('*', (req, res) => {
    res.status(404).send('<h1>resource not found</h1>')
})


app.listen(5000, () => {
    console.log('server listens to port 5000')
})