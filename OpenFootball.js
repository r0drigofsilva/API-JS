const select = document.querySelector('select');

// Variáveis globais
var jornadas;
var jornadaSelecionada;
var equipaSelecionada;
var resultado;

fetch('https://raw.githubusercontent.com/openfootball/football.json/master/2017-18/en.1.clubs.json')
  .then(response => response.json())
  .then(data => {
    // Ordenar os clubes em ordem alfabética
    data.clubs.sort((a, b) => a.name.localeCompare(b.name));

    // Mostrar todos os clubs num "option"
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
fetch('https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json')
  .then(response => response.json())
  .then(data => {
    // Mostrar todos as jornadas num "option"
    data.rounds.forEach(rounds => {
      const option2 = document.createElement('option');
      option2.textContent = rounds.name;
      select2.appendChild(option2);
    });

    // Guardo o array rounds na variável global jornadas
    jornadas = data.rounds;
    

  })
  .catch(error => {
    console.error(error);
  });

  select.addEventListener('change', mostrarEquipa );

  function mostrarEquipa() {
    console.log( "Equipa seleccionada", this.value );

    equipaSelecionada = this.value;
  }

  select2.addEventListener('change', mostrarJornada );

  function mostrarJornada() {
    console.log( "Jornada seleccionada", this.value );
    
    jornadaSelecionada = this.value;
    
  }

  
  
  const gerar = document.querySelector('button');
gerar.addEventListener('click', mostrarOPedido);


function mostrarOPedido() {
  const jornada = jornadas.find(j => j.name === jornadaSelecionada);
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
    dataJogo.textContent = `${dataFormatted}`;
    container.appendChild(dataJogo);
  } else {
    h2Element.textContent = `${equipaSelecionada} ${resultado} ${nomeAdversario}`;
    
  }
  
}


  
