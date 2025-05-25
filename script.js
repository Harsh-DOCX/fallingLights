const bucket = document.getElementById('bucket');
const game = document.getElementById('game');
const scoreboard = document.getElementById('scoreboard');
const high = document.getElementById('high');
const timer = document.getElementById('timer');

let isDragging = false;
let offsetX = 0;
let score = 0;
let time = 60;
let gameInterval, timerInterval;
let highScore = localStorage.getItem('highScore') || 0;

high.textContent = 'highScore :' + highScore;
timer.innerHTML = time;

bucket.addEventListener('mousedown', (e) => {
    isDragging = true;
    const rect = bucket.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    document.body.style.cursor = 'grabbing';
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.cursor = 'default';
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const gameRect = game.getBoundingClientRect();
    let newLeft = e.clientX - offsetX;

    const minLeft = gameRect.left;
    const maxLeft = gameRect.right - bucket.offsetWidth;

    if (newLeft < minLeft) newLeft = minLeft;
    if (newLeft > maxLeft) newLeft = maxLeft;

    bucket.style.left = (newLeft - gameRect.left) + 'px';
    bucket.style.bottom = '0px';
});

bucket.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isDragging = true;
    const rect = bucket.getBoundingClientRect();
    offsetX = e.touches[0].clientX - rect.left;
    document.body.style.cursor = 'grabbing';
});



document.addEventListener('touchend', () => {
    isDragging = false;
    document.body.style.cursor = 'default';
});

document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const gameRect = game.getBoundingClientRect();
    let newLeft = e.touches[0].clientX - offsetX;

    const minLeft = gameRect.left;
    const maxLeft = gameRect.right - bucket.offsetWidth;

    if (newLeft < minLeft) newLeft = minLeft;
    if (newLeft > maxLeft) newLeft = maxLeft;

    bucket.style.left = (newLeft - gameRect.left) + 'px';
    bucket.style.bottom = '0px';
});


function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    const x = Math.random() * (game.clientWidth - 20);
    star.style.left = x + 'px';
    star.style.top = '0px';
    game.appendChild(star);
}

function updateStars() {
    const stars = document.querySelectorAll('.star');
    const bucketRect = bucket.getBoundingClientRect();
    const gameRect = game.getBoundingClientRect();

    stars.forEach(star => {
        let top = parseFloat(star.style.top);
        top += 4; 
        star.style.top = top + 'px';

        const starRect = star.getBoundingClientRect();

        if (starRect.top > gameRect.bottom) {
            star.remove();
            return;
        }

        if (
            starRect.bottom >= bucketRect.top &&
            starRect.left < bucketRect.right &&
            starRect.right > bucketRect.left
        ) {
            star.remove();
            score++;
            scoreboard.textContent = 'Score: ' + score;
            if (score > highScore) {
                highScore = score;
                high.textContent = 'High Score: ' + highScore;
                localStorage.setItem('highScore', highScore);
            }
        }
    });
}

function stopGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    isDragging = false;
    document.body.style.cursor = 'default';
    alert(`Game Over! Your score: ${score}`);

    scoreboard.style.display = 'none';
    high.style.display = 'none';
    timer.style.display = 'none';
    game.style.display = 'none';

    const restartButton = document.createElement('button');
    restartButton.id = 'restart';
    restartButton.textContent = 'Restart Game';
    restartButton.style.margin = '10px';
    restartButton.style.padding = '10px 20px';
    restartButton.style.fontSize = '16px';
    restartButton.style.cursor = 'pointer';
    const wrapper = document.createElement('div');
    wrapper.id = 'restart-wrapper';
    wrapper.appendChild(restartButton);
    document.body.appendChild(wrapper);

    restartButton.addEventListener('click', restartGame);
}

function restartGame() {
    score = 0;
    time = 60;
    high.textContent = 'Score: ' + score;
    timer.innerHTML = time;
    high.textContent = 'HighScore: ' + highScore;

    document.querySelectorAll('.star').forEach(star => star.remove());

    scoreboard.style.display = 'block';
    high.style.display = 'block';
    timer.style.display = 'block';
    game.style.display = 'block';

    const restartButton = document.getElementById('restart');
    if (restartButton) restartButton.remove();

    gameInterval = setInterval(() => {
        if (Math.random() < 0.3) createStar();
        updateStars();
    }, 30);

    timerInterval = setInterval(() => {
        time -= 1;
        timer.innerHTML = time;
        if (time <= 0) stopGame();
    }, 1000);
}

gameInterval = setInterval(() => {
    if (Math.random() < 0.3) createStar();
    updateStars();
}, 30);

timerInterval = setInterval(() => {
    time -= 1;
    timer.innerHTML = time;
    if (time <= 0) stopGame();
}, 1000);