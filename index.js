import express from 'express';

const app = express()
const port = process.env.PORT || 8000
app.use(express.json())

let teaData = []
let nextId = 1

// create tea 
app.post('/teas', (req, res) => {
    const { name, price } = req.body
    const teaObject = { id: nextId++, name, price };
    teaData.push(teaObject)
    res.status(200).send(teaObject)
});

// get all teas
app.get('/teas', (req, res) => {
    res.status(200).send(teaData)
});

// get tea by id
app.get('/teas/:id', (req, res) => {
    const tea = teaData.find((t) => t.id === parseInt(req.params.id));
    if (!tea) {
        res.status(404).send('Tea not found')
    } else {
        res.status(201).send(tea)
    }
});

// update tea
app.put('/teas/:id', (req, res) => { 
    const tea = teaData.find((t) => t.id === parseInt(req.params.id));
    const { name, price } = req.body
    if (!tea) {
        res.status(404).send('Tea not found')
    }  
    tea.name = name
    tea.price = price
    res.status(200).send(tea)
})

// delete tea 
app.delete('/teasDelete/:id', (req, res) => { 
    const tea = teaData.find((t) => t.id === parseInt(req.params.id));
    teaData.pop(tea)
    res.status(200).send(teaData)
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}...`)
});

