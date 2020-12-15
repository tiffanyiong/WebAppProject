var express = require('express');
const TodoTask = require('../models/TodoTask');
var router = express.Router();
const Task = require('../models/TodoTask')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('feature');
});

router.get('/game', function(req, res) {
  res.render('feature/game');
});

router.get('/video', function(req, res) {
  res.render('feature/video');
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

//update
router.get('/edit/:id', (req, res) => {
  const id= req.params.id;
  TodoTask.find({}, (err, task)=>{
    res.render('feature/todoEdit', {todoTask: task, idTask: id});
  })
 
});

router.post('/edit/:id', (req, res)=> {
  const id = req.params.id;

  TodoTask.findByIdAndUpdate(id,{ task:req.body.task }, err =>{
  
    if (err) return res.send(500, err);
    res.redirect('todotask');
  });
})


//delete


router.get('/remove/:id', (req, res) => {
  const id= req.params.id;
  TodoTask.findByIdAndRemove(id, err =>{
    if (err) return res.send(500, err);
    res.redirect('/feature/todotask');
  });
 
});


module.exports = router;
