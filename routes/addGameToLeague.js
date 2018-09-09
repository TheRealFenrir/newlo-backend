var express = require('express');
var router = express.Router();

getMmrQuery = function(id1, id2, id3, id4) {
  return 'SELECT playerId, leagueElo FROM LeaguePlayer WHERE leagueId = 1 AND (playerId = ' + id1 +
    ' OR playerId = ' + id2 + 
    ' OR playerId = ' + id3 + 
    ' OR playerId = ' + id4 +
    ')';
}

addGameQuery = function(id1, id2, id3, id4, diff) {
  return 'INSERT INTO Games ( player1Id, player2Id, player3Id, player4Id, scoreDifference, date, leagueId ) VALUES ( ' +
    id1 + ', ' +
    id2 + ', ' +
    id3 + ', ' +
    id4 + ', ' +
    diff + ', ' +
    Date.now() + ', 1 )';
}

updatePlayerGamesQuery = function(id, gameId, newMmr) {
  return 'INSERT INTO PlayerGames ( playerId, gameId, elo ) VALUES ( ' +
    id + ', ' + 
    gameId + ', ' +
    newMmr + ' )';
}

updateLeaguePlayerQuery = function(id, newMmr) {
  return 'UPDATE LeaguePlayer SET leagueElo = ' +
    newMmr + ' WHERE playerId = ' +
    id + ' AND leagueId = 1';
}

calculateNewElos = function (scores, mmrs) {
  const k = 128;
  const spread = 1000;

  mmrSum = mmrs[0] + mmrs[1];
  scoreSum = scores[0] + scores[1];
  normalizedScores = [
    score[0] / scoreSum,
    score[1] / scoreSum
  ];
  expectedScores = [
    1.0 / ( 1.0 + 10.0 ** ( ( mmrSum - mmrs[0] - mmrs[0] ) / spread ) ),
    1.0 / ( 1.0 + 10.0 ** ( ( mmrSum - mmrs[1] - mmrs[1] ) / spread ) )
  ];
  mmrChanges = [ k * ( normalizedScores[0] - expectedScores[0] ), k * ( normalizedScores[1] - expectedScores[1] ) ];
  return mmrChanges;
}

/* GET users listing. */
router.get('/:id1/:id2/:id3/:id4/:scoreDiff', function(req, res, next) {
  // Get current MMRs
  var playersCurrent;
  res.locals.connection.query(getMmrQuery(req.params.id1, req.params.id2, req.params.id3, req.params.id4), function (error, results, fields) {
    if(error){
      res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
      return;
    } else {
      playersCurrent = results;
    }
  });

  if (playersCurrent.length !== 4) {
    res.send(JSON.stringify({"status": 500, "error": 'not enough players returned', "response": null})); 
    return;
  }

  var gameId;
  res.locals.connection.query(addGameQuery(req.params.id1, req.params.id2, req.params.id3, req.params.id4, req.params.scoreDiff), function (error, results, fields) {
    if(error){
      res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
      return;
    } else {
      gameId = results;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results})); 
    }
  });

  var changes = calculateNewElos([5, 5 - req.params.scoreDiff], [average(playersCurrent[0].leagueElo, playersCurrent[1].leagueElo), average(playersCurrent[2].leagueElo, playersCurrent[3].leagueElo)]);

  p1Mmr = playersCurrent[0].leagueElo + changes[0];
  p2Mmr = playersCurrent[1].leagueElo + changes[0];
  p3Mmr = playersCurrent[2].leagueElo + changes[1];
  p4Mmr = playersCurrent[3].leagueElo + changes[1];
  res.locals.connection.query(updatePlayerGamesQuery(req.params.id1, gameId, p1Mmr), function (error, results, fields) {
    if(error){
      res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
      return;
    }
  });

  res.locals.connection.query(updatePlayerGamesQuery(req.params.id2, gameId, p2Mmr), function (error, results, fields) {
    if(error){
      res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
      return;
    }
  });

  res.locals.connection.query(updatePlayerGamesQuery(req.params.id3, gameId, p3Mmr), function (error, results, fields) {
    if(error){
      res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
      return;
    }
  });

  res.locals.connection.query(updatePlayerGamesQuery(req.params.id4, gameId, p4Mmr), function (error, results, fields) {
    if(error){
      res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
      return;
    }
  });

  res.locals.connection.query(updateLeaguePlayerQuery(req.params.id1, p1Mmr), function (error, results, fields) {
    if(error){
      res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
      return;
    }
  });

  res.locals.connection.query(updateLeaguePlayerQuery(req.params.id2, p2Mmr), function (error, results, fields) {
    if(error){
      res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
      return;
    }
  });

  res.locals.connection.query(updateLeaguePlayerQuery(req.params.id3, p3Mmr), function (error, results, fields) {
    if(error){
      res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
      return;
    }
  });

  res.locals.connection.query(updateLeaguePlayerQuery(req.params.id4, p4Mmr), function (error, results, fields) {
    if(error){
      res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
      return;
    }
  });

  // res.send(JSON.stringify({"status": 200, "error": null, "response": gameId}));
});

module.exports = router;
