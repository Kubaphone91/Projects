const router = require('express').Router();
const path = require('path');

router.all('*', function(request, response) {
  response.sendFile(path.resolve("./Market/dist/index.html"));
});

module.exports = router;