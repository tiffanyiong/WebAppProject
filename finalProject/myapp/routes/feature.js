var express = require('express');
var router = express.Router();
const Task = require('../models/TodoTask')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('feature');
});

router.get('/game', function(req, res) {
  res.render('feature/game');
});

router.get('/todotask', function(req, res) {
  // Task.find({},(err, task) => {
    res.render('feature/todotask');
  // })
 
});


router.post('/todotask', async(request,response) =>{
  console.log(request.body);
  let task = new Task({
    task:request.body.task
  });

  try{
    task = await task.save(); //it return an id
    console.log(task.id);
    response.redirect('todotask');
  }catch(error){
    console.log(error);
    response.redirect('todotask');
  }
});



module.exports = router;
