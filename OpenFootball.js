const select = document.querySelector('select');

// Variáveis globais
var jornadas;
var jornadaSelecionada;
var equipaSelecionada;
var resultado;

// Requisição para obter os clubes
fetch('https://raw.githubusercontent.com/openfootball/football.json/master/2017-18/en.1.clubs.json')
  .then(response => response.json())
  .then(data => {
    // Ordenar os clubes em ordem alfabética
    data.clubs.sort((a, b) => a.name.localeCompare(b.name));

    // Mostrar todos os clubes em opções no primeiro select
    data.clubs.forEach(club => {
      const option = document.createElement('option');
      option.textContent = club.name;
      select.appendChild(option);
    });
  })
  .catch(error => {
    console.error(error);
  });

const select2 = document.querySelector('#select2');
// Requisição para obter as jornadas
fetch('https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json')
  .then(response => response.json())
  .then(data => {
    // Mostrar todas as jornadas em opções no segundo select
    data.rounds.forEach(rounds => {
      const option2 = document.createElement('option');
      option2.textContent = rounds.name;
      select2.appendChild(option2);
    });

    // Armazenar o array de jornadas na variável global 'jornadas'
    jornadas = data.rounds;
  })
  .catch(error => {
    console.error(error);
  });

// Evento de alteração (change) no primeiro select (seleção da equipe)
select.addEventListener('change', mostrarEquipa);

function mostrarEquipa() {
  console.log("Equipa seleccionada", this.value);
  equipaSelecionada = this.value;
}

// Evento de alteração (change) no segundo select (seleção da jornada)
select2.addEventListener('change', mostrarJornada);

function mostrarJornada() {
  console.log("Jornada seleccionada", this.value);
  jornadaSelecionada = this.value;
}

const gerar = document.querySelector('button');
gerar.addEventListener('click', mostrarOPedido);

function mostrarOPedido() {
  // Encontrar a jornada selecionada
  const jornada = jornadas.find(j => j.name === jornadaSelecionada);
  // Encontrar o jogo correspondente à equipe selecionada
  const jogo = jornada.matches.find(m => m.team1 === equipaSelecionada || m.team2 === equipaSelecionada);

  if (!jogo) {
    alert("As equipas:  \"Brighton & Hove Albion FC\", \"Huddersfield Town AFC\" e \"Burnley FC\", desceram de divisão. Não jogaram qualquer jogo.");
    return;
  }

  const nomeAdversario = equipaSelecionada === jogo.team1 ? jogo.team2 : jogo.team1;
  const resultado = jogo.score.ft.join('-');

  const h2Element = document.querySelector('#texto h2');
  if (!h2Element) {
    const newH2Element = document.createElement('h2');
    const jogoDate = new Date(jogo.date);
    const dataFormatted = jogoDate.toLocaleDateString("pt-PT");
    newH2Element.textContent = `${equipaSelecionada} ${resultado} ${nomeAdversario}`;

    const container = document.querySelector('#texto');
    container.appendChild(newH2Element);

    const dataJogo = document.createElement('h2');
    dataJogo.id = 'data-jogo'; // Adicionando o ID 'data-jogo' ao elemento <h2>
    dataJogo.textContent = `${dataFormatted}`;
    container.appendChild(dataJogo);
    } else {
      h2Element.textContent = `${equipaSelecionada} ${resultado} ${nomeAdversario}`;
      const dataJogo = document.querySelector('#data-jogo'); // Selecionando o elemento <h2> com o ID 'data-jogo'
      const jogoDate = new Date(jogo.date);
      const dataFormatted = jogoDate.toLocaleDateString("pt-PT");
      dataJogo.textContent = `${dataFormatted}`; // Atualizando o texto do elemento <h2> com a data do jogo
    }
}

