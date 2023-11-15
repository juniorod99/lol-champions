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
  // console.log(championData);
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
  // const championBanner = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`;
  // console.log(championBanner);
  const listaDeSkins = gerarListaSkins(skins);
  console.log(listaDeSkins);
  const listaSpells = gerarHabilidades(passive, spells);
  console.log(listaSpells);
};

function gerarHabilidades(passive, spells) {
  const spellsList = document.createElement("div");
  spellsList.classList.add("spells-text");
  console.log(passive.name);
  console.log(passive.description);
  console.log(spells[0].name);
  console.log(spells[0].description);
  const spellsInnerHTML = `
  <div class="spells-images">
    <img src="https://ddragon.leagueoflegends.com/cdn/13.22.1/img/passive/${passive.image.full}" alt="" class="item" onclick="mostrarDiv('spell-1')">
    <img src="https://ddragon.leagueoflegends.com/cdn/13.22.1/img/spell/${spells[0].image.full}" alt="" class="item" onclick="mostrarDiv('spell-2')">
    <img src="https://ddragon.leagueoflegends.com/cdn/13.22.1/img/spell/${spells[1].image.full}" alt="" class="item" onclick="mostrarDiv('spell-3')">
    <img src="https://ddragon.leagueoflegends.com/cdn/13.22.1/img/spell/${spells[2].image.full}" alt="" class="item" onclick="mostrarDiv('spell-4')">
    <img src="https://ddragon.leagueoflegends.com/cdn/13.22.1/img/spell/${spells[3].image.full}" alt="" class="item" onclick="mostrarDiv('spell-5')">
  </div>
  <div class="spell-details ativo" id="spell-1">
    <h3>P - ${passive.name}</h3>
    <p>${passive.description}</p>
  </div>
  <div class="spell-details" id="spell-2">
    <h3>Q - ${spells[0].name}</h3>
    <p>${spells[0].description}</p>
  </div>
  <div class="spell-details" id="spell-3">
    <h3>W - ${spells[1].name}</h3>
    <p>${spells[1].description}</p>
  </div>
  <div class="spell-details" id="spell-4">
    <h3>E - ${spells[2].name}</h3>
    <p>${spells[2].description}</p>
  </div>
  <div class="spell-details" id="spell-5">
    <h3>R - ${spells[3].name}</h3>
    <p>${spells[3].description}</p>
  </div>`;

  spellsList.innerHTML = spellsInnerHTML;
  return spellsList;
}

function gerarListaSkins(skins) {
  const lista = document.createElement("ul");
  lista.classList.add("splide__list");
  let listaInnerHTML = "";

  for (skin in skins) {
    listaInnerHTML += `
    <li class="splide__slide">
      <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_${skins[skin].num}.jpg">
    </li>`;
  }

  lista.innerHTML = listaInnerHTML;
  return lista;
}

function mostrarDiv(idDivParaMostrar) {
  var todasDivs = document.querySelectorAll(".spell-details");
  todasDivs.forEach(function (div) {
    if (div.id === idDivParaMostrar) {
      div.style.display = "block";
    } else {
      div.style.display = "none";
    }
  });
}
