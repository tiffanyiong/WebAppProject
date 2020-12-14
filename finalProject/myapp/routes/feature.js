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
  Task.find({},(err, tasks) => {
    res.render('feature/todotask',{ todoTask: tasks});
  })
 
});


router.post('/todotask', async(request,response) =>{
  console.log(request.body);
  let todoTask = new Task({
    task:request.body.task
  });

  try{
    todoTask = await todoTask.save(); //it return an id
    console.log(todoTask.id);
    console.log('Sucessfully added');
    response.redirect('todotask');    
  }catch(error){
    console.log(error);
    response.redirect('todotask');
  }
});



module.exports = router;
