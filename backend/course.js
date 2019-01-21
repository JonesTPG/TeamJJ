

/* Tietokanta-skeema genrelle, sisältää genren nimen sekä kysymysten määrän. Kysymysten määrä päivittyy aina jos käyttäjä
käy tekemässä uusia kysymyksiä genreen. */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var courseSchema = new Schema({

    coursename         : String,
    courseid           : String,
    rating             : Number,
    credit             : Number,
    ratingLength       : Number

});


module.exports = mongoose.model('course', courseSchema);