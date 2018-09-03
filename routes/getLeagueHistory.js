var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

// def getLeagueHistory( self, leagueId ):
//     self.db.query( "SELECT g.gameId, g.date, p1.playerName, p2.playerName, p3.playerName, p4.playerName, g.scoreDifference FROM Games g LEFT JOIN Players p1 ON p1.playerId = g.player1Id LEFT JOIN Players p2 ON p2.playerId = g.player2Id LEFT JOIN Players p3 ON p3.playerId = g.player3Id LEFT JOIN Players p4 ON p4.playerId = g.player4Id WHERE g.leagueId = %d order by g.date DESC limit 10" % leagueId )
//     r = self.db.store_result( )
//     results = r.fetch_row( maxrows = 0 )
//     formatter = "%Y-%m-%d %H:%M"
//     return [ { 'gameId': x[ 0 ], 'date': x[ 1 ].strftime( formatter ), 'player1': x[ 2 ], 'player2': x[ 3 ], 'player3': x[ 4 ], 'player4': x[ 5 ], 'scoreDifference': x[ 6 ] } for x in results ]
