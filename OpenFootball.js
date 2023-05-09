const select = document.querySelector('select');

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
