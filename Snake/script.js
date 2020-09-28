document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('span');
    const startButton = document.querySelector('.start');

    const width = 20;
    let currentIndex = 0; //first div in the grid
    let appleIndex = 0; //first div in the grid
    let currentSnake = [2,1,0] //2 is the head, 0 is the tail and all the 1's being the body
    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;


    //function to start the game
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 300
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }

    //function that consider all the outcomes
    function moveOutcomes() {

        //consider the snake hitting the border or itself
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) || //Snake hits bottom wall
            (currentSnake[0] % width === width - 1 && direction === 1) || //snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || //snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) || //snake hits top wall
            squares[currentSnake[0] + direction].classList.contains('snake') //snake goes into itself
        ) {
            return clearInterval(interval) //to clear the interval if one of the above case happens
        }

        const tail = currentSnake.pop() //removes last item of the array and shows it
        squares[tail].classList.remove('snake') //removes class of snake from tail
        currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the array

        //consider the snake eating the apple
        if (squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }

        squares[currentSnake[0]].classList.add('snake')
    }

    //random apple function
    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * squares.length)
        } while(squares[appleIndex].classList.contains('snake'))

        squares[appleIndex].classList.add('apple')
        
    }

    //assign functions to keycodes
    function control(e) {
        squares[currentIndex].classList.remove('snake') //removing the class of snake

        if (e.keyCode === 39) {
            direction = 1; //the snake will go right
        } else if (e.keyCode === 38) {
            direction = -width //the snake will go up
        } else if (e.keyCode === 37) {
            direction = -1 //the snake will go left
        } else if (e.keyCode === 40) {
            direction = +width //the snake will go down
        }
    }

    document.addEventListener('keyup', control);
    startButton.addEventListener('click', startGame);

})