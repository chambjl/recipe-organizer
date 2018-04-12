var express = require('express');
var router = express.Router();
var path = require("path");

router.get('/api/recipes', function(req,res){
  var recipes = req.db.collection('recipes');
  recipes.find({}).toArray(function(err,items){
    if(err) throw err;
    res.send(items);
    // console.log(JSON.stringify(items));
    // var response = '<ul>';
    // for(var i = 0; i < items.length; i++){
    //   console.log(i + ': ' + items[i]);
    //   response += `
    //     <li>${items[i].title}</i>
    //   `;
    // }
    // response += '</ul>'
    // res.send(response);
  });
});

module.exports = router;
