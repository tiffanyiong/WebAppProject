const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");
canvas.width=800;
canvas.height=480;



let spacePressed = false;
let angle = 0
let hue = 0;
let score = 0;
let frame=0;
let gameSpeed= 2;




 function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    handleObstacles();
    bird.update();  
    bird.draw();
    ctx.font = '90px Arial Black';
    ctx.fillStyle ="#FFD42A";
    ctx.fillText(score, 680, 70);

    handleBang();
    if(handleBang()) return;

    requestAnimationFrame(animate);

    angle+=0.12;
    frame++;
};
// animate();

//prevent "space bar scrolling"
document.onkeypress = function(e) {
    e = e || window.event;
    var charCode = e.keyCode || e.which;
    if (charCode === 32) {
        e.preventDefault();
        return false;
    }
}
window.addEventListener('keydown', function(e){
    if(e.code === 'Space') spacePressed = true;         

});

window.addEventListener('keyup', function(e){
    if(e.code === 'Space') spacePressed = false;

});


const bang = new Image();
bang.src="http://www.pngall.com/wp-content/uploads/5/Blank-Comic-Boom-PNG-Download-Image.png";
function handleBang(){
    for (let i = 0; i < obstaclesArray.length; i++){
        if(bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
            bird.x + bird.width > obstaclesArray[i].x &&
            ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) ||
            (bird.y > canvas.height - obstaclesArray[i].bottom &&
                bird.y + bird.height < canvas.height))){
                    //show image
                    let audio = new Audio ("../../audio/boom.mp3");
                    audio.play();
                    ctx.drawImage(bang, bird.x, bird.y, 60, 60);
                    ctx.font ="30px Arial Black";
                    ctx.fillStyle = 'black';
                    ctx.fillText('GAME OVER - Your Score: ' + score, 200, canvas.height/2 - 10);
                    return true;
                }
    }
}

function playgame(){
    var playbtn = document.getElementById("playBtn");
    playbtn.style.display="none";
    animate();
}