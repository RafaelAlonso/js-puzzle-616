// 1 - selecionar o elemento
const button = document.getElementById('show-hint');
// 2 - definir o tipo de evento
const eventType = 'click';
// 3 - o que vai acontecer quando o evento for "listened"
// (Obs.: event é o param que meu passo 3 pode receber para manipular as infos sobre o evento que acabou de acontecer)
const whatIsGonnaHappen = () => {
  const hint = document.querySelector('.hint');
  hint.classList.add('active')
}
// 4 - juntar tudo (1.addEventListener(2, 3))
button.addEventListener(eventType, whatIsGonnaHappen);

// ===================== pseudo-codigo do jojinho =====================
// prestar atencao no click e onde clicou
const tds = document.querySelectorAll('td');

// const eventType = 'click'; // ja fizemos ali em cima

const game = (event) => {
  // verificar se sao vizinhos
  // encontrar o quadrado clicado e encontrar posicoes
  const clicado = event.currentTarget;
  const ccol = clicado.cellIndex;
  const crow = clicado.parentElement.rowIndex;

  // encontrar o quadrado vazio e encontrar posicoes
  const vazio = document.querySelector('.empty');
  const vcol = vazio.cellIndex;
  const vrow = vazio.parentElement.rowIndex;

  // checar se esta a direita ou a esquerda (cell_index -1 ou +1)
  // checar se esta acima ou abaixo (row_index -1 ou +1)
  if ( (ccol - vcol === -1 || ccol - vcol === 1) && crow === vrow || // uma distancia de coluna e estar na mesma linha
       (crow - vrow === -1 || crow - vrow === 1) && ccol === vcol) { // uma distancia de linha e estar na mesma coluna
    
    // mover o objeto (trocar de posicao)
    // - trocar o texto de dentro
    vazio.innerText = clicado.innerText;
    clicado.innerText = '';

    // - trocar as classes
    clicado.classList.add('empty');
    vazio.classList.remove('empty');

  }  
  
  const currentOrder = document.querySelectorAll('td');
  // verificar se o jogo acabou
  // - passar por cada elemento da array
  let won = true;
  currentOrder.forEach((td, ind)=>{
    // - checar se o texto daquele elemento e igual ao indice dele + 1
    if ( ind != 15 && parseInt(td.innerText, 10) != ind + 1 ){
      won = false;
    }
  })

  if (won){
    setTimeout(() => {
      alert('yaaay! You won :D');
    }, 50);
  }
  
}

tds.forEach((td) => {
  td.addEventListener(eventType, game);
})

