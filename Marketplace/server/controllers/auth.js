const User = require('mongoose').model('User');

module.exports = {
  login(request, response){
    User.findOne({ email: request.body.email })
      .then(user => {
        if(!user) throw new Error();
        
        return User.validatePassword(request.body.password, user.password)
          .then(() => {
            completeLogin(request, response, user);
          })
      })
      .catch(() => {
        response.status(401).json('Email/password is invalid');
      });
  },
  register(request, response){
    User.create({
      email: request.body.email,
      first_name: request.body.first_name,
      last_name: request.body.last_name,
      password: request.body.password
    })
      .then(user => {
        completeLogin(request, response, user);
      })
      .catch((error) => {
        response.status(500).json('Email is already taken');
      });
  },
  logout(request, response){
    request.session.destroy();
    request.clearCookie('userID');
    request.clearCookie('expiration');
    response.json(true);
  },
  user(request, response) {
    console.log('got the request body--', request.cookies.userID)
    User.findOne({ _id: request.cookies.userID })
        .then(user => {
           
            if(!user) { throw new Error(); }

            return response.json(user);
        })
        .catch(() => {
            response.status(500).json('User not found');
        });
  },
  show(request, response) {
    console.log("I'm in the auth controller - get one", request.params.id);
    User.findById(request.params.id)
        .then(user => response.json(user))
        .catch(console.log);
  }                
}

function completeLogin(request, response, user){

  request.session.user = user;
  delete request.session.user.password;

  response.cookie('userID', user._id.toString());
  response.cookie('expiration', Date.now() + 86400 * 1000);

  response.json(user);
}