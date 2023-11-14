let currentChampionId = null;

document.addEventListener("DOMContentLoaded", () => {
  const championID = new URLSearchParams(window.location.search).get("id");
  // console.log(championID);
  currentChampionId = championID;
  getChampionData(championID);
});

const getChampionData = async (id) => {
  const url = `https://ddragon.leagueoflegends.com/cdn/13.22.1/data/pt_BR/champion/${id}.json`;
  const response = await fetch(url);
  const data = await response.json();
  const championData = data.data[id];
  console.log(championData);
  createChampionPage(championData);
};

const createChampionPage = (champion) => {
  // console.log(champion.currentChampionId);
  const name = champion.id;
  console.log(name);
  const title = champion.title;
  console.log(title);
  const lore = champion.lore;
  console.log(lore);
  const passive = champion.passive;
  console.log(passive);
  const spells = champion.spells;
  console.log(spells);
  const skins = champion.skins;
  console.log(skins);
  const championBanner = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`;
  console.log(championBanner);
};

function mostrarDiv(idDivParaMostrar) {
  // Obtém todas as divs com a classe 'minha-div'
  var todasDivs = document.querySelectorAll(".spell-details");
  console.log(todasDivs);
  // Itera sobre todas as divs e mostra/oculta conforme necessário
  todasDivs.forEach(function (div) {
    if (div.id === idDivParaMostrar) {
      // Se a div for a que queremos mostrar, exibe
      div.style.display = "block";
    } else {
      // Se não for a div que queremos mostrar, oculta
      div.style.display = "none";
    }
  });
}
