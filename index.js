const express = require('express')
const app = express()
const fileHandler = require('fs')
let webProjects = require('./config/webProjects.json')
app.use(express.json())
const helmet = require('helmet')
app.use(helmet())

//server reference
require('dotenv').config()

//get request to read the array in the webProjects.json file
app.get('/api', (req,res) => {
    res.status(200).json({
        webProjects
    })
})

//post request adds a new item to the list in the webProjects.json file
app.post('/api/add', (req,res) => {
    const newId = webProjects[webProjects.length - 1].id + 1
    const newProject = Object.assign({id: newId}, req.body)
    //pushes newProject to the existing webProjects.json file
    webProjects.push(newProject)
    fileHandler.writeFile('./config/webProjects.json', JSON.stringify(webProjects), err => {        
        res.status(201).json({
            status: 'success',
            data: {
                webProjects
            }
        })
    })
})

//delete request to remove an item using its id from the webProjects list
app.delete('/api/:id', (req, res) =>{
    //check if id/item exists
    const id = req.params.id * 1
    const item = webProjects.find((el) => el.id == id)
    const update = webProjects.filter(item => item.id != id)

    if (!item) {
        err
    } else {
        //update content after removing id
        webProjects = update

        fileHandler.writeFile('./config/webProjects.json', JSON.stringify(webProjects), err =>{
            res.status(201).json({
                status:'success',
                data: {
                    webProjects
                }
            })
        })
    }
})

//put request to update title or description of an item on the list
app.put('/api/:id', (req, res) => {
    const id = Number(req.params.id)
    const title = req.body.title
    const description = req.body.description
    const URL = req.body.URL
 
    const edited = {
        id,
        title,
        description,
        URL
    }

    // array to store the content
    const updated = [];
 
    webProjects.map(item => {
        if (item.id === id) {
            updated.push(edited)
        } else {
            updated.push(item)
        }
    })
    // assign updated value to content variable  
    webProjects = updated
 
    fileHandler.writeFile('./config/webProjects.json', JSON.stringify(webProjects), err => {
        res.json({
            status: 'success',
            content: { webProjects }
        })
    })
 })
 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})