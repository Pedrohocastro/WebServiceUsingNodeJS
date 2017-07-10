var express = require('express')
var database = require('./database')
var app = express()


app.get('/',(req,res,err) =>{

  res.send('Servidor up')

})

app.get('/dogs',(req,res,err) =>{

  database.getAllDogs((err, rows)=>{
    if(!err){
      res.status(200).json(rows)
    }else{
      res.status(500).json('Internal server error: '+ err)

    }
  })
})

app.get('/dog/:dogId', (req,res,err) =>{

  var dogId = req.params.dogId
  database.getDog(dogId, (err, rows) =>{
    if(!err){
      res.status(200).json(rows)
    }else{
      res.status(500).json('deu merda no get dog' + err)

    }

  })
})


app.put('/dog/:dogId', (req, res, err) =>{

  var dogId = req.params.dogId
  var dog = req.query
  database.updateDog(dogId,dog, (err) =>{
    if(!err){
      res.status(200).json(dog)
    }else {
      res.status(400).json('Invalid update' + err)
    }
  })
})


app.post('/',(req,res,err) =>{

  var dog = req.query
  if (dog.name && dog.breed){

    database.insertDog(dog,(err) =>{
      if (!err){
        res.status(200).json(dog)
      }else{
        res.status(400).json('Invalid Insertion' + err)
      }
    })
  }else{
    res.send('invalid dog data')
  }
})

app.delete('/dogs/:dogId', (req,res,err) =>{
  var dogId = req.params.dogId
  database.deleteDog(dogId,(err)=>{
    if (!err){
      res.status(200).json('excluido')
    }else{
      res.status(400).json('invalid delete ' + err)
    }
  })


})


app.listen(3000)
