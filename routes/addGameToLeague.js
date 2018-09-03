var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

// def addGame( self, p1Id, p2Id, p3Id, p4Id, scoreDifference, leagueId, gameId = None ):
//         '''
//         Adds a completed game to the database
//         Returns the gameId
//         '''
//         self.db.query( "SELECT playerId, leagueElo " + 
//                        "FROM LeaguePlayer " +
//                        ( "WHERE leagueId = %d AND (" % leagueId ) +
//                        ( "playerId = %d OR playerId = %d OR playerId = %d OR playerId = %d) " % ( p1Id, p2Id, p3Id, p4Id ) ) )
//         r = self.db.store_result( )
//         results = r.fetch_row( maxrows = 0 )
//         if len( results ) != 4:
//             return None

//         currentElos = { x[ 0 ]: x[ 1 ] for x in results }
//         eloChange = elo.calculateNewElos( self.K_CONSTANT, self.SPREAD_CONSTANT, [ 5, 5 - scoreDifference ], [ self.mean( [ currentElos[ p1Id ], currentElos[ p2Id ] ] ), self.mean( [ currentElos[ p3Id ], currentElos[ p4Id ] ] ) ] )

//         if gameId == None:
//             self.c.execute( """INSERT INTO Games ( player1Id, player2Id, player3Id, player4Id, scoreDifference, date, leagueId ) VALUES ( %d, %d, %d, %d, %d, NOW( ), %d )""" % ( p1Id, p2Id, p3Id, p4Id, scoreDifference, leagueId ) )
//             gameId = self.c.lastrowid;
//             self.c.execute( """INSERT INTO PlayerGames ( playerId, gameId, elo ) VALUES ( %d, %d, %d )""" % ( p1Id, gameId, round( currentElos[ p1Id ] + eloChange[ 0 ] ) ) )
//             self.c.execute( """INSERT INTO PlayerGames ( playerId, gameId, elo ) VALUES ( %d, %d, %d )""" % ( p2Id, gameId, round( currentElos[ p2Id ] + eloChange[ 0 ] ) ) )
//             self.c.execute( """INSERT INTO PlayerGames ( playerId, gameId, elo ) VALUES ( %d, %d, %d )""" % ( p3Id, gameId, round( currentElos[ p3Id ] + eloChange[ 1 ] ) ) )
//             self.c.execute( """INSERT INTO PlayerGames ( playerId, gameId, elo ) VALUES ( %d, %d, %d )""" % ( p4Id, gameId, round( currentElos[ p4Id ] + eloChange[ 1 ] ) ) )
//         else:
//             self.c.execute( """UPDATE PlayerGames SET elo = %d WHERE gameId = %d AND playerId = %d""" % ( round( currentElos[ p1Id ] + eloChange[ 0 ] ), gameId, p1Id ) )
//             self.c.execute( """UPDATE PlayerGames SET elo = %d WHERE gameId = %d AND playerId = %d""" % ( round( currentElos[ p2Id ] + eloChange[ 0 ] ), gameId, p2Id ) )
//             self.c.execute( """UPDATE PlayerGames SET elo = %d WHERE gameId = %d AND playerId = %d""" % ( round( currentElos[ p3Id ] + eloChange[ 1 ] ), gameId, p3Id ) )
//             self.c.execute( """UPDATE PlayerGames SET elo = %d WHERE gameId = %d AND playerId = %d""" % ( round( currentElos[ p4Id ] + eloChange[ 1 ] ), gameId, p4Id ) )
//         self.c.execute( """UPDATE LeaguePlayer SET leagueElo = %d WHERE playerId = %d AND leagueId = %d""" % ( round( currentElos[ p1Id ] + eloChange[ 0 ] ), p1Id, leagueId ) )
//         self.c.execute( """UPDATE LeaguePlayer SET leagueElo = %d WHERE playerId = %d AND leagueId = %d""" % ( round( currentElos[ p2Id ] + eloChange[ 0 ] ), p2Id, leagueId ) )
//         self.c.execute( """UPDATE LeaguePlayer SET leagueElo = %d WHERE playerId = %d AND leagueId = %d""" % ( round( currentElos[ p3Id ] + eloChange[ 1 ] ), p3Id, leagueId ) )
//         self.c.execute( """UPDATE LeaguePlayer SET leagueElo = %d WHERE playerId = %d AND leagueId = %d""" % ( round( currentElos[ p4Id ] + eloChange[ 1 ] ), p4Id, leagueId ) )

//         self.db.commit( )
//         return gameId

// def calculateNewElos( k, spread, scores, elos ):
//     """Calculate new Elo scores based on a game result
//     :param k: The 'k' parameter for this Elo system
//     :param spread: The 'spread' parameter for this Elo system
//     :param scores: The scores in this game. Should be normalized such that the sum of this list is 1, otherwise the scores will be normalized automatically.
//     :param elos: A list elos of the players in this game
//     :return: The changes to each players elos"""
//     eloSum = sum( elos )
//     scoreSum = sum( scores )
//     normalizedScores = [ x / float( scoreSum ) for x in scores ]
//     expectedScores = [ 1.0 / ( 1.0 + 10.0 ** ( ( eloSum - x - x ) / float( spread ) ) ) for x in elos ]
//     eloChanges = [ k * ( normalized - expected ) for normalized, expected in zip( normalizedScores, expectedScores ) ]
//     #print expectedScores
//     #print normalizedScores
//     #print eloChanges
//     return eloChanges
