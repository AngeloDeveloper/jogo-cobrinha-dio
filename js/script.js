let canvas = document.getElementById('snake')
let context = canvas.getContext('2d')
let box = 32
let comidas=0;
let snake = []
    snake[0] = {
    x: 8 * box,
    y: 8 * box
    }
let direction = 'right'
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBg(){

    var grd = context.createLinearGradient(0, 0, 512, 0);
    grd.addColorStop(0, "red");
    grd.addColorStop(1, "yellow");

    context.fillStyle = grd
    context.fillRect(0, 0, 16 * box, 16 * box)
}
function criarSnake(){
    for (i = 0; i < snake.length; i++){
        context.fillStyle = 'green'
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}
function drawFood(){
    context.fillStyle = 'black'
    context.fillRect(food.x, food.y, box, box)
}
document.addEventListener('keydown', update)
function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left'
    if(event.keyCode == 38 && direction != 'down') direction = 'up'
    if(event.keyCode == 39 && direction != 'left') direction = 'right'
    if(event.keyCode == 40 && direction != 'up') direction = 'down'
}


function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

function iniciarJogo(){
    if(snake[0].x > 15 * box && direction == 'right') snake[0].x = 0
    if(snake[0].x > 15 * box && direction == 'up') snake[0].x = 0
    if(snake[0].x > 15 * box && direction == 'down') snake[0].x = 0

    if(snake[0].x < 0  && direction == 'left') snake[0].x = 15 * box
    if(snake[0].x < 0  && direction == 'up') snake[0].x = 15 * box
    if(snake[0].x < 0  && direction == 'down') snake[0].x = 15 * box

    if(snake[0].y > 15 * box && direction == 'down') snake[0].y = 0
    if(snake[0].y > 15 * box && direction == 'right') snake[0].y = 0
    if(snake[0].y > 15 * box && direction == 'left') snake[0].y = 0

    if(snake[0].y < 0 && direction == 'up') snake[0].y = 15 * box
    if(snake[0].y < 0 && direction == 'right') snake[0].y = 15 * box
    if(snake[0].y < 0 && direction == 'left') snake[0].y = 15 * box

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo)
            alert('Você comeu '+comidas+" comidas")
        }
    }
    criarBg()
    criarSnake()
    drawFood()
    let snakeX = snake[0].x
    let snakeY = snake[0].y
    if(direction == 'right') snakeX += box
    if(direction == 'left') snakeX -= box
    if(direction == 'up') snakeY -= box
    if(direction == 'down') snakeY += box

    if(snakeX != food.x || snakeY != food.y){
        snake.pop()
    } else{
        comidas=comidas+1;
        food.x = Math.floor(Math.random() * 15 + 1) * box
        food.y = Math.floor(Math.random() * 15 + 1) * box
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead)
}

const dif=getUrlParameter('dificuldade');
var jogo;
switch (dif){
    case"facil":
     jogo = setInterval(iniciarJogo, 150)
    break;
    case"medio":
     jogo = setInterval(iniciarJogo, 100)
    break;
    case"dificil":
     jogo = setInterval(iniciarJogo, 60)
    break;
}




