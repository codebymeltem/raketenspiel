const app = new PIXI.Application();
const ufoList = [];
let score = 0;

const backgroundMusic = new Audio('assets/arcade-game-sound.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.2;

backgroundMusic.play();

const laserSound = new Audio('assets/laser.mp3');
laserSound.volume = 0.5; 

document.body.appendChild(app.view);

const rocket = PIXI.Sprite.from('assets/rocket.png')
rocket.x = 350;
rocket.y = 510;
rocket.scale.x = 0.05;
rocket.scale.y = 0.05;
app.stage.addChild(rocket);


gameInterval(function() {
    const ufo = PIXI.Sprite.from('assets/ufo1.png')
    ufo.x = random(0, 700);
    ufo.y = -25;
    ufo.scale.x = 0.1;
    ufo.scale.y = 0.1;
    app.stage.addChild(ufo);
    ufoList.push(ufo);
    flyDown(ufo, 2);

    waitForCollision(ufo, rocket).then(function() {
        app.stage.removeChild(rocket);
        stopGame();
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fontWeight: 'bold',
            fill: ['#ffffff']
        });

        const gameOverText = new PIXI.Text(`You lost! Your score: ${score}`, style)
gameOverText.x = app.screen.width / 2 - gameOverText.width / 2;
gameOverText.y = app.screen.height / 2 - gameOverText.height / 2;
app.stage.addChild(gameOverText);
    });

}, 300);


function leftKeyPressed(){
    rocket.x = rocket.x - 5;
}

function rightKeyPressed(){
    rocket.x = rocket.x + 5;
}

function spaceKeyPressed(){ 

    laserSound.currentTime = 0; 
    laserSound.play();
    const bullet = PIXI.Sprite.from('assets/bullet.png')
    bullet.x = rocket.x + 14;
    bullet.y = 500;
    bullet.scale.x = 0.02;
    bullet.scale.y = 0.02;
    flyUp(bullet)
    app.stage.addChild(bullet);

    waitForCollision(bullet, ufoList).then(function([bullet, ufo]) {
        app.stage.removeChild(bullet);
        app.stage.removeChild(ufo);

        score++;
    });
}