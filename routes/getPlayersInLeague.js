var express = require('express');
var router = express.Router();

const query = 'SELECT p.playerId, playerName, lp.leagueElo FROM Players p INNER JOIN LeaguePlayer lp ON lp.leagueId = 1 AND lp.playerId = p.playerId ORDER BY lp.leagueElo DESC';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.locals.connection.query(query, function (error, results, fields) {
    if(error){
      res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
      //If there is error, we send the error in the error section with 500 status
    } else {
      res.send(JSON.stringify({"status": 200, "error": null, "response": { id: results[0], name: results[1], elo: results[2] }}));
      //If there is no error, all is good and response is 200OK.
    }
  });
});

module.exports = router;

// def listPlayersInLeague( self, leagueId ):
//     ''' Returns a list of a (playerId, playerName, playerElo) tuples sorted by elo '''
//     self.db.query( """SELECT p.playerId, playerName, lp.leagueElo FROM Players p INNER JOIN LeaguePlayer lp ON lp.leagueId = %d AND lp.playerId = p.playerId ORDER BY lp.leagueElo DESC""" % leagueId )
//     r = self.db.store_result( )
//     results = r.fetch_row( maxrows = 0 )
//     return [ { 'id': x[ 0 ], 'name': x[ 1 ], 'elo': x[ 2 ] } for x in results ]
