const express = require('express')
const path  = require('path')
const port = 8000

const db = require('./config/mongoose')
// below line could be used for storing data into mongodb , we imported the schema from other module which we have created in onther file 
const Contact = require('./models/contact')
const app = express()


app.set('view engine', 'ejs')
// set is setting a value for a property
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded())
// above statement is used for parsing the content
app.use(express.static('assets'));
// middlewares - before sending data to browser the middlewares take the data that is req, response and converts the following into data and object which can be easily sent to browser
// app.use(function(req, res, next){
//     console.log("middle ware 1 is called")
//     // next function should be written else control is not passed after this next line
//     next()

// })
// app.use(function(req, res, next){
    
// console.log('middle ware 2 called')
// next()
// })
var ContactsList = [
    {
        name:"Yashwanth",
        phone:"399994399"
    },
    {
        name:"Ajay vellore",
        phone:"49994994994"
    },
    {
        name:"Srm University",
        phone:"48848884884"
    }
]

app.get('/', function(req, res){
    // res.send('cool, it is running! or is it')
    // below title 
    Contact.find({}, function(err, contacts){
        if(err){console.log('Error in fetching contact from db');  return;}
        return res.render('home', { 
            title:"Contacts List",
            contacts_list:contacts
        
        }) 
    })
    
    // we just provided the name of the website 'home', and  the data is collected from the website
})
app.get('/practice',function(req, res){
    return res.render('practice', {
        title: "Let us play with ejs"
    })
})
// when create-contact action is created or clicked or submitted or triggered the function is called and the page is created

app.post('/create-contact', function(req, res){
    // below contact is imported contact - where we can create a contact- 
    // it creates a model of contact and stores all the data in database-robo-3t which used to see the data 
    Contact.create({
        name: req.body.name,
        phone:req.body.phone
     }, function(err, newContact){
        if(err){console.log("error in creating a contact!");return;}
        console.log('*****', newContact)
        return res.redirect('back')
     })
     
     
    // back jus redirecs to same page
})
// for deleting the contact  
app.get('/delete-contact', function(req, res){
    // get the id from query in the url  
    
    let id = req.query.id;
    //  find the contact in the database using id and delete 
    Contact.findByIdAndDelete(id, function(err){
        if(err) {console.log('error in deleting an object from database'); return;}
        return res.redirect('back')
    })
    
})


app.listen(port, function(err){
    if(err){
        console.log("error in tne server ",err)
        return
    }
    console.log("You my express server is runing on port", port)
    
    // nodemon index.js - for running application
})