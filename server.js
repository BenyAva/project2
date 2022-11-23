const express = require('express');
const mongoose = require('mongoose');
const app = express();
const methodOverride = require('method-override')
const Schema = require('./models/schema.js')
const Data = require('./models/data.js')
////// USE BELOW
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(express.static(__dirname + "/public"))

////create data

// Schema.create(Data, (err, data) => {
//   if (err) {
//     console.log(err.message)
//   } else {
//     console.log(data)
//   }
// })


// Schema.collection.drop()


///get
app.get('/', (req, res) => {
    Schema.find({}, (error, allCars) => {
        res.render('index.ejs', {data: allCars})
    })
})

app.get('/new', (req,res) => {
    res.render('new.ejs')
})

app.get('/:id/edit', (req,res) => {
    Schema.findById(req.params.id, (err, editedCar) =>{
        res.render('edit.ejs', {
            data: editedCar
        })
    })
})
app.get('/show/:id',(req,res) => {
    console.log("THIS IS MY ID"+req.params.id)
    Schema.findById(req.params.id, (err, cars) => {
        console.log(cars)
        res.render('show.ejs' , {
            data: cars
        })
    })
})
/// put routes
app.delete('/:id', (req, res) => {
    console.log(req.params.id)
    Schema.findByIdAndRemove(req.params.id, { new: true }, (error, car) => {
      res.redirect('/')
    })
  })
app.put('/:id', (req,res) => {
    Schema.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedModel) => {
        
        res.redirect(`/`)
    })
})

app.post('/', (req, res) =>{
    Schema.create(req.body, (error, entry )=> {
        console.log(req.body)
        res.redirect('/')
})
});


app.listen(3000, ()=>{
    console.log('listening');
});



mongoose.connect('mongodb://localhost:27017/carsDatabase', () => {
  console.log('The connection with mongod is established')
})


