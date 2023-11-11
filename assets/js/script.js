const container = document.querySelector("#container");
let allChampions = [];

const getChampions = async () => {
  const url =
    "https://ddragon.leagueoflegends.com/cdn/13.22.1/data/pt_BR/champion.json";
  const response = await fetch(url);
  const data = await response.json();
  const champs = await data.data;
  totalChampions = await Object.keys(data.data).length;
  for (var chave in champs) {
    createChampionCard(champs[chave]);
  }
};

const createChampionCard = (champion) => {
  const card = document.createElement("div");
  card.classList.add("champion");

  const name = champion.id;
  const icon = `https://ddragon.leagueoflegends.com/cdn/13.22.1/img/champion/${champion.image.full}`;
  const role = champion.tags;
  // console.log(role);

  const championInnerHTML = `
  <div class="champion-icon">
    <img class="icon" src="https://ddragon.leagueoflegends.com/cdn/13.22.1/img/champion/${champion.image.full}" alt="${champion.id}">
  </div>
  <div class="champion-info">
    <h2 class="name">${champion.id}</h2>
    <p class="type">Mago, Assassino</p>
  </div>
  `;

  card.innerHTML = championInnerHTML;
  container.appendChild(card);
};

getChampions();
