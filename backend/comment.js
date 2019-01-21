

/* Tietokanta-skeema genrelle, sisältää genren nimen sekä kysymysten määrän. Kysymysten määrä päivittyy aina jos käyttäjä
käy tekemässä uusia kysymyksiä genreen. */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commentSchema = new Schema({

    username         : String,
    text             : String,
    upvotes          : Number,
    downvotes        : Number,
    courseId         : String
    
});


module.exports = mongoose.model('comment', commentSchema);