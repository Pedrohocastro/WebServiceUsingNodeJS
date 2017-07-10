var sqlite3 = require('sqlite3').verbose()


var db = new sqlite3.Database('./db')

db.run('CREATE TABLE IF NOT EXISTS dog(name TEXT, breed TEXT)',(err) =>{

if(err){
  console.log('Error creating table' + err)
}


} )

var insertDog = (dog, callback) =>{

  var query =  db.prepare('INSERT INTO dog VALUES (?, ?)')
  query.run(dog.name, dog.breed, callback)


}

var getAllDogs = (callback) => {

  db.all('SELECT rowid AS id, * FROM dog', callback)

}

var getDog = (dogId, callback) =>{

  db.all(`SELECT * FROM dog WHERE rowid = ${dogId}`,callback)


}
var deleteDog = (dogId, callback) => {
  var query = db.prepare('DELETE FROM DOG WHERE rowid = (?)')
  query.run(dogId,callback)

}

var updateDog = (dogId, newDog, callback) => {

  getDog(dogId,(err, rows) =>{
    if (!err){
        var oldDog = rows
        if (newDog.name){
          oldDog.name = newDog.name
        }
        if(newDog.breed){
          oldDog.breed = newDog.breed
        }

        var query = db.prepare('UPDATE DOG SET name = (?), breed = (?) where rowid = (?)')
        query.run(oldDog.name, oldDog.breed, dogId, callback)
    }else{
      console.log('deu merda')
    }

  })

}


module.exports = {
  insertDog,
  getAllDogs,
  deleteDog,
  getDog,
  updateDog
}
