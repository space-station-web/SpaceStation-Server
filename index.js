// const express = require('express')   // common JS
import express from 'express'          // ES6

const app = express()
const port = 3000

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})