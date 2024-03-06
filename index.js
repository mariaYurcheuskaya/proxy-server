const express = require('express')
const app = express()

const { people } = require('./data')
const { logger } = require('./logger')


app.get('/people', logger, (req, res) => {
    const newPeople = people.map((person) => {
        let { id, name } = person;
        return { id, name }
    })
    res.json(newPeople)
})

app.get('/people/:personId', logger, (req, res) => {
    const { personId } = req.params;
    const foundPerson = people.find((person) => person.id === Number(personId))
    if (!foundPerson) {
        return res.status(404).send("Person does not exist")
    }
    res.json(foundPerson)
})

app.get('/api/v1/query', logger, (req, res) => {
    const { search, limit } = req.query

    let sortedPeople = [...people]

    if (search) {
        sortedPeople = people.filter((person) => {
            return person.name.startsWith(search)
        })
    }

    if (limit) {
        sortedPeople = sortedPeople.slice(0, Number(limit))
    }

    if (sortedPeople.length < 1) {
        return res.status(200).json({ sucess: true, data: [] })
    }
    return res.status(200).json(sortedPeople)
})


app.listen(5000, () => {
    console.log('server listens to port 5000')
})