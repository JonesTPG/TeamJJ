/*Express Router Root: /api
  Return data as json, and receives update requests from React Front-End.
*/


var express = require('express');
var router = express.Router();
var Course = require('./course');
var Comment = require('./comment');


router.get('/course', function (req, res) {
   
    var course = new Course();
    course.name = "test";

    course.save(function(err) {
        if (err)
            throw err;
        
        res.json({success: true});
    });


  });

  //returns all of the courses
router.get('/all', function(req, res) {
  Course.find({})
  .lean()
  .exec(function(err, result) {
      res.json(JSON.stringify(result));
   });

});

//returns the details of a single course
router.get('/course/:id', function (req, res) {
    let id = req.params.id;
    

    Course.findOne({_id: id})
    .lean()
    .exec(function(err, result) {
        if (err) {
            console.log(err);
            res.status(404).send();
        };
        
        res.json(JSON.stringify(result));

    })    
});

//returns the comments of a single course
router.get('/comments/:id', function(req, res) {
    let id = req.params.id;
    Comment.find({courseId: id})
    .lean()
    .exec(function(err, results) {
        if (err) {
            console.log(err)
            res.status(404).send();
        }
        
        res.json(JSON.stringify(results));
    })
});

//returns the info of a single comment
router.get('/comment/:id', function(req, res) {
    let id = req.params.id;
    Comment.findOne({_id: id})
    .lean()
    .exec(function(err, result) {
        if (err) {
            console.log(err)
            res.status(404).send();
        }
        
        res.json(JSON.stringify(result));
    })
})

//receives a new comment and saves it to the database
router.post('/comments/:courseId', function(req, res) {
    let courseid = req.params.courseId;

    let commentText = req.body.text;

    //create new Comment object and save it to the database
    let comment = new Comment();

    comment.text = commentText;
    comment.upvotes = 0;
    comment.downvotes = 0;
    comment.courseId = courseid;
    
    comment.save(function(err) {
        if (err)
            throw err;
        
        res.status(200).send();
    });
});

//receives a new rating to the server, and then calculates the new average rating
router.post('/course/:courseId/rating', function(req, res) {
    
    let courseId = req.params.courseId;
    let newRating = parseFloat(req.body.rating);
    
    if ( newRating<1 || newRating>5 || isNaN(newRating) ) {
        res.status(500).send();
        return;
    }

    Course.findOne( {_id: courseId}, function (err, doc) {
    
        let curRating = doc.rating;
        let length = doc.ratingLength;
        let newAverage = ((curRating*length) + newRating); //this is the sum of all the ratings including the new one
        newAverage = newAverage / (length+1); //new average is calculated based on the new length
        
        doc.rating = newAverage;
        doc.ratingLength = length+1;
        
        doc.save(function (err) {
          if (err) {
            console.log(err);
          }
          res.status(200).send();
        });
      });

})

//receives a new vote for the comment, it then updates the comment accordingly
router.post('/comment/:commentId/vote', function(req, res) {
  
    let commentId = req.params.commentId;
    let newVoteType = req.body.vote;
 
    Comment.findOne( {_id: commentId}, function (err, doc) {
    
        let curUpvotes = doc.upvotes;
        let curDownvotes = doc.downvotes;
        
        if (newVoteType === 'upvote') {
            doc.upvotes = curUpvotes+1;
        }

        else if (newVoteType === 'downvote') {
            doc.downvotes = curDownvotes+1;
        }

        else {
            res.status(500).send();
        }
        
        doc.save(function (err) {
          if (err) {
            console.log(err);
          }
    
          res.json({upvotes: doc.upvotes,
                    downvotes: doc.downvotes})
        });
      });

})

module.exports = router;