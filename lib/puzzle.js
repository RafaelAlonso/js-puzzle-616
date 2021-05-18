// todo
const high = document.querySelector('#high-score');
const play = document.querySelector('#your-score')
high.innerText = sessionStorage.getItem('high-score')

const tds = document.querySelectorAll('td');
const finish = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,';
let moves = 0;

const adjacent = (clicked, empty) => {
  const cl_row = clicked.parentElement.rowIndex;
  const cl_col = clicked.cellIndex;

  const em_row = empty.parentElement.rowIndex;
  const em_col = empty.cellIndex;

  return cl_row === em_row && Math.abs(cl_col - em_col) === 1 || cl_col === em_col && Math.abs(cl_row - em_row) === 1
}

let numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,-1]
tds.forEach(td => {
  const random = numbers.splice(Math.floor(Math.random()*numbers.length), 1)[0];
  if(random === -1){
    td.classList.add('empty')
  } else{
    td.innerText = random;
  }
  td.addEventListener('click', e => {
    const clicked = e.currentTarget;
    const empty = document.querySelector('.empty')
    if(clicked === empty || !adjacent(clicked, empty))  return;

    moves += 1;
    play.innerText = moves;

    empty.innerText = clicked.innerText;
    clicked.innerText = '';

    empty.classList.remove('empty');
    clicked.classList.add('empty');

    const order = Array.from(document.querySelectorAll('td')).map(td => td.innerText).join(',');
    if(order === finish){
      setTimeout(() => {
        let message = `You win! Took you ${moves} moves, but ther's still a high score to beat. Wanna try again?`

        if(sessionStorage.getItem('high-score') === null || moves < sessionStorage.getItem('high-score')){
          sessionStorage.setItem('high-score', moves);
          message = `You win and set a new high score of ${moves} moves! Legend 🚀`
        }

        if(confirm(message)){
          window.location.reload();
        }
      }, 50)
    }
  })
})