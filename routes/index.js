var express = require('express');
var router = express.Router();

/* GET home page. */
/* //We are not includding this, because it already is included with the jade functions
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

router.get('/candidates', function(req, res, next) {
  Comment.find(function(err, comments){
    if(err){ return next(err); }
    console.log(comments);
    res.json(comments);
  });
});

router.post('/candidates', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.save(function(err, comment){
    if(err){ return next(err); }
    console.log(comment);
    res.json(comment);
  });
});

router.param('candidates', function(req, res, next, id) {
  var query = Comment.findById(id);
  query.exec(function (err, comment){
    if (err) { return next(err); }
    if (!comment) { return next(new Error("can't find candidates")); }
    req.candidate = comment;
    return next();
  });
});

router.get('/candidates/:candidate', function(req, res) {
  console.log(req.candidate);
  res.json(req.candidate);
});

router.put('/candidates/:candidate/upvote', function(req, res, next) {
  req.comment.upvote(function(err, comment){
    if (err) { return next(err); }
    console.log(comment);
    res.json(comment);
  });
});

router.delete('/candidates/:id', async (req, res) => {
  try {
    console.log("in delete candidate");
    await Comment.deleteOne({
      _id: req.params.id
    });
    console.log(req.params.id + " is the id sent back");

  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router; //Once we have added everything to router, we export it?
