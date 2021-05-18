const finishCheck = () => {
  // get all the numbers from the tiles and join them with a ',' in between
  const order = Array.from(document.querySelectorAll('td')).map(td => td.innerText).join();

  // this is the final order
  const finish = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,';

  // if they match...
  if(order === finish){
    document.querySelector('.empty').innerText = "🌟"

    // after 50 milisseconds (otherwise it's too quick) (ms is set on line 22)...
    setTimeout(() => {
      // set the default message to show the player
      let message = `You win! Took you ${moves} moves, but ther's still a high score to beat. Wanna try again?`
      
      // if there was no high score or if the moves played were less than the current high score
      if(sessionStorage.getItem('high-score') === null || moves < sessionStorage.getItem('high-score')){
        // store the new high score in the sessionStorage
        sessionStorage.setItem('high-score', moves);

        // change the message to a nicer thing
        message = `You win and set a new high score of ${moves} moves! Legend 🚀\nWanna play it again?`
      }
      
      // show the message and, if the player wants to try again...
      if(confirm(message)){
        // reload the page =D
        window.location.reload();
      }
    }, 50)
  }
}

const move = (clicked, empty) => {
  // throw the number from the clicked tile to the empty one, remove the number from the clicked
  empty.innerText = clicked.innerText;
  clicked.innerText = '';

  // remove the empty class from the (previously) empty tile, add it to the clicked one
  empty.classList.remove('empty');
  clicked.classList.add('empty');

  // increment the number of moves played by the player
  const play = document.querySelector('#your-score')
  moves += 1;
  play.innerText = moves;
}

const adjacent = (clicked, empty) => {
  // get both row and col of the clicked tile
  const cl_row = clicked.parentElement.rowIndex;
  const cl_col = clicked.cellIndex;
  
  // get both row and col of the empty tile
  const em_row = empty.parentElement.rowIndex;
  const em_col = empty.cellIndex;
  
  // return if they are:
  // - in the same column and adjacent rows
  // - in the same row and adjacent columns
  return cl_row === em_row && Math.abs(cl_col - em_col) === 1 || cl_col === em_col && Math.abs(cl_row - em_row) === 1
}

const listener = (e) => {
  // get clicked and empty tiles
  const clicked = e.currentTarget;
  const empty = document.querySelector('.empty')

  // if player clicked the empty tile or if they're not adjacent, nothing happens
  if(clicked === empty || !adjacent(clicked, empty))  return;
  
  // swap the clicked and the empty tiles
  move(clicked, empty)
  
  // check if player won
  finishCheck();
};

const initGame = () => {
  // array of possible numbers
  let numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,-1]

  // get all tiles
  const tds = document.querySelectorAll('td');

  // for each tile
  tds.forEach(td => {
    // get a random number from the possible ones
    const random = numbers.splice(Math.floor(Math.random()*numbers.length), 1)[0];

    // if the number was -1, it's the empty tile. Else, fill the tile with gotten number
    if(random === -1){
      td.classList.add('empty')
    } else{
      td.innerText = random;
    }

    // ask the tile to listen to a click event, and execute the listener function when it happens
    td.addEventListener('click', listener);
  })

  // print the high score (kept in sessionStorage) in the HTML for the player to see
  const high = document.querySelector('#high-score');
  high.innerText = sessionStorage.getItem('high-score');
}

// this little guy must be global. It's the number of moves played by the player
let moves = 0;

// init the game \o/
initGame();