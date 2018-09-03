var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

// def getExpectedScore( self, p1Id, p2Id, p3Id, p4Id, leagueId ):
//     self.db.query( "SELECT playerId, leagueElo " + 
//                 "FROM LeaguePlayer " +
//                 ( "WHERE leagueId = %d AND (" % leagueId ) +
//                 ( "playerId = %d OR playerId = %d OR playerId = %d OR playerId = %d) " % ( p1Id, p2Id, p3Id, p4Id ) ) )
//     r = self.db.store_result( )
//     results = r.fetch_row( maxrows = 0 )
//     if len( results ) != 4:
//         return None

//     currentElos = { x[ 0 ]: x[ 1 ] for x in results }
//     return elo.calculateExpectedScore( self.SPREAD_CONSTANT, [ self.mean( [ currentElos[ p1Id ], currentElos[ p2Id ] ] ), self.mean( [ currentElos[ p3Id ], currentElos[ p4Id ] ] ) ], 5, True )

// def calculateExpectedScore( spread, elos, scale, rounded ):
//     """Calculate the expected score of a game given a list of elos of the competitors.
//        The scores will be scaled to give the winner a certain value.
//     :param elos: List of a elos of the competitors
//     :param scale: The amount of points the winner should have
//     :param rounded: Whether the results should be rounded or left as floating points
//     :return: The expected scores of each competitor"""
//     eloSum = sum( elos )
//     expectedScores = [ 1.0 / ( 1.0 + 10.0 ** ( ( eloSum - x - x ) / float( spread ) ) ) for x in elos ]
//     multiplier = scale / max( expectedScores )
//     if rounded:
//         return [ int( round( multiplier * x ) )  for x in expectedScores ]
//     else:
//         return [  multiplier * x for x in expectedScores ]