var express = require('express');
var router = express.Router();
var Utils = require('../utils');
var colors = require('colors');

var utils = new Utils();

router.post('/api/feedback/client/log', function(req, res, next) {
  res.status = 404;
  res.send({
    error: '404'
  });
});

router.post('/*', function(req, res, next) {
  // console.log(req.body);
  utils.defaultPost(req.headers, req.body, req.originalUrl, function(err, headers, body) {
    if (err) {
      console.error(err);
      return callback(err);
    } else {
      // console.log(body);
      // console.log(utils);
      next();
    }
  });
});

router.post('/eapi/v3/song/detail', function(req, res, next) {
  utils.modifyDetailApi();
  next();
});
router.post('/eapi/v3/playlist/detail', function(req, res, next) {
  utils.modifyDetailApi();
  next();
});
router.post('/eapi/v1/album/', function(req, res, next) {
  utils.modifyDetailApi();
  next();
});
router.post('/eapi/batch', function(req, res, next) {
  utils.modifyDetailApi();
  next();
});
router.post('/eapi/cloudsearch/pc', function(req, res, next) {
  utils.modifyDetailApi();
  next();
});
router.post('/eapi/v1/artist', function(req, res, next) {
  utils.modifyDetailApi();
  next();
});
router.post('/eapi/batch', function(req, res, next) {
  utils.modifyDetailApi();
  next();
});
router.post('/eapi/v1/search/get', function(req, res, next) {
  utils.modifyDetailApi();
  next();
});
router.post('/eapi/song/enhance/privilege', function(req, res, next) {
  utils.modifyDetailApi();
  next();
});
router.post('/eapi/v1/discovery/new/songs', function(req, res, next) {
  utils.modifyDetailApi();
  next();
});
router.post('/eapi/v1/play/record', function(req, res, next) {
  utils.modifyDetailApi();
  next();
});

router.post('/eapi/song/enhance/player/url', function(req, res, next) {
  if (utils.getPlaybackReturnCode() != 200 || utils.getPlaybackBitrate() < 320000) {
    utils.modifyPlayerApi(function(err) {
      if (err) {
        return console.error(err.red);
      } else {
        next();
      }
    });
  } else {
    console.log('Playback bitrate is not changed. The song URL is '.green + utils.getPlaybackUrl().green);
    next();
  }
});

router.post('/*', function(req, res, next) {
  // console.log(utils.headers);
  // console.log(utils.body);
  res.set(utils.headers);
  res.send(utils.body);
});

module.exports = router;
