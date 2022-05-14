let myGunSound = new Audio('audio/3z.mp3')
let enemyGunSound = new Audio("audio/enemySound.mp3")
let music = new Audio('audio/music.mp3')
let loseSound = new Audio('audio/lose.mp3')
music.volume = 0.3
enemyGunSound.volume = 0.7

let speedShoot = 1500;
let speed = 3000;
let reSpeed = 2000
let score = 0
let currentLevel = 1
let truHp = 5

let scoreArea = document.getElementById('score')
scoreArea.innerHTML = 'Level: ' + currentLevel + '<br>' +
    'Score: ' + score + '<br>' + 'High Score: ' +
    localStorage.getItem('score')

function level(num) {
    speedShoot -= 115 * num
    speed -= 230 * num
    reSpeed -= 153 * num
    truHp += 5 * num
}

function updateScore() {
    score += 10 * currentLevel
    if (score > localStorage.getItem('score')) {
        localStorage.setItem('score', score)
    }

    scoreArea.innerHTML = 'Level: ' + currentLevel + '<br>' +
        'Score: ' + score + '<br>' + 'High Score: '
        + localStorage.getItem('score')
    if (score % 100 == 0) {
        level(currentLevel++)

    }
}

function reEnemy(enemy) {
    if (enemy.classList.contains('dead')) {
        setTimeout(() => {
            enemy.classList.remove('dead')
            enemy.classList.toggle('showing')
        }, reSpeed)
    }
}

function iShoot(enemy) {
    enemy.classList.add('dead')
    updateScore()
    reEnemy(enemy)
    if (!livingEnemies().length) {
        setTimeout(function () {
            alert('WIN');
            window.location.reload()

        }, 1000)
    }
}

function enemyAttacksMe(enemy) {
    enemy.classList.add('showing')
    setTimeout(() => {
        enemyShootsMe(enemy)
    }, speedShoot)
    setTimeout(() => {
        enemy.classList.remove('showing')
    }, speed);
}

function enemyShootsMe(enemy) {
    if (!enemy.classList.contains('dead')) {

        enemyGunSound.play()

        enemy.classList.add('shooting');

        updateHealthPoints(healthPoints - truHp);

        setTimeout(() => {
            enemy.classList.remove('shooting')
        }, 200);
    }
}

function livingEnemies() {
    return document.querySelectorAll('.enemy:not(.dead)')
}

function randomEnemyAttacks() {
    let randomEnemyNo = Math.random() * livingEnemies().length;
    randomEnemyNo = Math.floor(randomEnemyNo)
    let enemy = livingEnemies()[randomEnemyNo]
    let randomDelay = Math.random() * speed + reSpeed
    setTimeout(() => {
        enemyAttacksMe(enemy)
        randomEnemyAttacks()
    }, randomDelay)
}

let healthPoints = 100;

function updateHealthPoints(points) {

    healthPoints = points;
    let healthBar = document.querySelector('#healthBar')
    healthBar.style.width = points + '%';
    if (healthPoints < 1) {
        loseSound.play()
        alert('GAME OVER')
        window.location.reload()
    }
}


function newGame() {
    music.play()
    randomEnemyAttacks();
    document.querySelector('button').style.display = 'none';
}

let hack = document.getElementById('hack')
let checkHack = true

window.addEventListener('keypress', (evt) => {
        if (evt.keyCode == 13) {
            if (checkHack) {
                hack.innerHTML = '<center><input id="hackCode" type="text" autofocus></center>'
            } else {
                let hackValue = document.getElementById('hackCode').value
                if (hackValue == 'hp') {

                    updateHealthPoints(99999999999999)
                }
                hack.innerHTML = ''
            }
            checkHack = !checkHack

        }
    }
)


