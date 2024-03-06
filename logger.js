const logger = (req, res, next) => {
    console.log('My logger is working')
    next()
}

module.exports = { logger }