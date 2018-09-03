import { leagueId, initialMmr } from '../public/javascripts/constants';

var express = require('express');
var router = express.Router();

const query = [
  'INSERT INTO LeaguePlayer ( playerId, leagueId, leagueElo ) VALUES ( \'', 
  '\', \'' + leagueId.toString() + '\', ' + initialMmr.toString() + ' )'
];

/* GET users listing. */
router.get('/:name', function(req, res, next) {
  res.locals.connection.query(query[0] + req.params.name + query[1], function (error, results, fields) {
    if(error){
      res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
      //If there is error, we send the error in the error section with 500 status
    } else {
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      //If there is no error, all is good and response is 200OK.
    }
  });
});

module.exports = router;