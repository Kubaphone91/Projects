const Bike = require('mongoose').model('Bike');
const User = require('mongoose').model('User');

module.exports = {
  index(request, response){
    Bike.find({})
      .then(bikes => response.json(bikes))
      .catch(console.log);
  },
  create(request, response){
    let userID = request.body.user._id;
    User.findOne({ _id: userID })
      .then(user => {
        let bike = new Bike(request.body);
        bike.user = user._id;
        bike.save(function(error){
          user.bikesPosted.push(bike);
          user.save(function(error){
            if(error){
              console.log('Error', error);
            }
          });
        })
        response.json(bike)
      })
      .catch(error => console.log(error))
  },
  update(request, response){
    Bike.findById(request.params.id)
      .then(bike => {
        bike.title = request.body.title;
        bike.description = request.body.description;
        bike.price = request.body.price;
        bike.location = request.body.location;
        bike.img_url = request.body.img_url;
        bike.save(function(error){
          User.findOne({_id: bike.user})
            .then(user => {
              let i = user.bikesPosted.findIndex(x => x._id == bike.id);
              let currentBike = user.bikesPosted[i];

              currentBike.title = request.body.title;
              currentBike.description = request.body.description;
              currentBike.price = request.body.price;
              currentBike.location = request.body.location;
              currentBike.img_url = request.body.img_url;

              User.update({ _id: bike.user }, {$set: { bikesPosted: user.bikesPosted }})
                .then(user => {})
                .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
          if(error){
            console.log('Error', error);
          }
          else {
            return response.json(bike);
          }
        });
      })
      .catch(console.log);
  },
  show(request, response){
    Bike.findById(request.params.id)
      .then(bike => response.json(bike))
      .catch(console.log);
  },
  destroy(request, response){
    Bike.findByIdAndRemove(request.params.id)
      .then(bike => {
        User.findOne({ _id: bike.user })
          .then((user) => {
            user.bikesPosted.splice(user.bikesPosted.indexOf(bike.id), 1);
            user.save(function(error){
              if(error){
                console.log('Error', error);
              }
              else{
                return response.json(user);
              }
            });
          })
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
  }
}