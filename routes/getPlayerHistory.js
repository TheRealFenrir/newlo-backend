var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

// def getPlayerHistory( self, playerId, leagueId ):
//     self.db.query( "SELECT pg.elo, p1.playerName, p2.playerName, p3.playerName, p4.playerName, g.scoreDifference, g.date, CONCAT(CASE WHEN pg.playerId = p1.playerId OR pg.playerId = p2.playerId THEN 'won' ELSE 'lost' END) FROM PlayerGames pg INNER JOIN Games g ON pg.gameId = g.gameId AND g.leagueId = %d AND pg.playerId = %d LEFT JOIN Players p1 ON p1.playerId = g.player1Id LEFT JOIN Players p2 ON p2.playerId = g.player2Id LEFT JOIN Players p3 ON p3.playerId = g.player3Id LEFT JOIN Players p4 ON p4.playerId = g.player4Id" % ( leagueId, playerId ) )
//     r = self.db.store_result( )
//     results = r.fetch_row( maxrows = 0 )
//     formatter = "%Y-%m-%d %H:%M"
//     return [ { 'elo': x[ 0 ], 'p1Name': x[ 1 ], 'p2Name': x[ 2 ], 'p3Name': x[ 3 ], 'p4Name': x[ 4 ], 'scoreDifference': x[ 5 ], 'date': x[ 6 ].strftime( formatter ), 'result':x[7] } for x in results ]
