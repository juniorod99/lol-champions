let currentChampionId = null;
const championSection = document.querySelector(".champion-infos");

document.addEventListener("DOMContentLoaded", () => {
  var urlAtual = new URL(window.location.href);

  const championID = urlAtual.searchParams.get("id");
  const championID2 = championID.replace(/\s/g, "");
  const championKey = urlAtual.searchParams.get("key");

  currentChampionId = championID;
  getChampionData(championID2, championKey);
});

async function getChampionData(id, key) {
  try {
    const [champion, spellsVideo] = await Promise.all([
      fetch(
        `https://ddragon.leagueoflegends.com/cdn/13.22.1/data/pt_BR/champion/${id}.json`
      ).then((res) => res.json()),
      fetch(
        `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champions/${key}.json`
      ).then((res) => res.json()),
    ]);
    const championData = champion.data[id];
    createChampionPage(championData, spellsVideo);
  } catch (error) {
    console.error("An error occured while fetching Champion data:", error);
  }
}

const createChampionPage = (champion, spellsVideoArray) => {
  const name = champion.id;
  const title = champion.title;
  const lore = champion.lore;
  const passive = champion.passive;
  const spells = champion.spells;
  const passiveVideo = spellsVideoArray.passive.abilityVideoPath;
  const spellsVideo = spellsVideoArray.spells;
  const skins = champion.skins;
  const background = `url("https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_0.jpg")`;
  const background2 = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_0.jpg`;
  const listaDeSkins = gerarListaSkins(skins, name);
  const listaSpells = gerarHabilidades(passive, spells);
  const listaSpellsVideos = gerarVideos(passiveVideo, spellsVideo);
  // championSection.style.backgroundImage = `${background}`;

  const championInnerHTML = `
  <div class="campeao-banner animate__animated animate__fadeInDown">
    <img src="${background2}" alt="Imagem do campeão" class="">
  </div>
  <div class="topo">
    <h1 class="name animate__animated animate__fadeInDown animate__delay-1s">${name}</h1>
    <span class="title animate__animated animate__fadeInDown animate__delay-2s">${title}</span>
  </div>
  <!-- Lore -->
  <div class="lore animate__animated animate__fadeInLeft animate__delay-2s">
    <h2>Lore</h2>
    <p>${lore}</p>
  </div>

  <!-- Habilidades -->
  <div class="spells animate__animated animate__fadeInLeft animate__delay-3s">
    <h2>Habilidades</h2>
    <div class="spells-container">
      ${listaSpells}
      ${listaSpellsVideos}
    </div>
  </div>

  <!-- Skins -->
  <div class="skins animate__animated animate__fadeInLeft animate__delay-4s">
    <h2>Skins</h2>
    <div id="thumbnail-slider" class="splide">
      <div class="splide__track">
        ${listaDeSkins}
      </div>
    </div>
  </div>
  `;
  championSection.innerHTML = championInnerHTML;
  geraSlide();
};

function gerarHabilidades(passive, spells) {
  const spellsInnerHTML = `
  <div class="spells-text">
    <div class="spells-images">
      <img src="https://ddragon.leagueoflegends.com/cdn/13.22.1/img/passive/${passive.image.full}" alt="" class="item" onclick="mostrarDiv('spell-1', 'video-1')">
      <img src="https://ddragon.leagueoflegends.com/cdn/13.22.1/img/spell/${spells[0].image.full}" alt="" class="item" onclick="mostrarDiv('spell-2', 'video-2')">
      <img src="https://ddragon.leagueoflegends.com/cdn/13.22.1/img/spell/${spells[1].image.full}" alt="" class="item" onclick="mostrarDiv('spell-3', 'video-3')">
      <img src="https://ddragon.leagueoflegends.com/cdn/13.22.1/img/spell/${spells[2].image.full}" alt="" class="item" onclick="mostrarDiv('spell-4', 'video-4')">
      <img src="https://ddragon.leagueoflegends.com/cdn/13.22.1/img/spell/${spells[3].image.full}" alt="" class="item" onclick="mostrarDiv('spell-5', 'video-5')">
    </div>
    <div class="spell-details ativo animate__animated animate__fadeIn" id="spell-1">
      <h3>P - ${passive.name}</h3>
      <p>${passive.description}</p>
    </div>
    <div class="spell-details animate__animated animate__fadeIn" id="spell-2">
      <h3>Q - ${spells[0].name}</h3>
      <p>${spells[0].description}</p>
    </div>
    <div class="spell-details animate__animated animate__fadeIn" id="spell-3">
      <h3>W - ${spells[1].name}</h3>
      <p>${spells[1].description}</p>
    </div>
    <div class="spell-details animate__animated animate__fadeIn" id="spell-4">
      <h3>E - ${spells[2].name}</h3>
      <p>${spells[2].description}</p>
    </div>
    <div class="spell-details animate__animated animate__fadeIn" id="spell-5">
      <h3>R - ${spells[3].name}</h3>
      <p>${spells[3].description}</p>
    </div>
  </div>`;

  return spellsInnerHTML;
}

function gerarListaSkins(skins, name) {
  let listaInnerHTML = "";

  for (skin in skins) {
    listaInnerHTML += `
    <li class="splide__slide">
      <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_${skins[skin].num}.jpg">
    </li>`;
  }

  const ul = `
  <ul class="splide__list">
    ${listaInnerHTML}
  </ul>
  `;

  return ul;
}

function mostrarDiv(idSpell, idVideo) {
  var divsText = document.querySelectorAll(".spell-details");
  var divsVideos = document.querySelectorAll(".spell-video");
  divsText.forEach(function (div) {
    if (div.id === idSpell) {
      div.style.display = "block";
    } else {
      div.style.display = "none";
    }
  });

  divsVideos.forEach(function (div) {
    if (div.id === idVideo) {
      div.style.display = "block";
    } else {
      div.style.display = "none";
    }
  });
}

function geraSlide() {
  var splide = new Splide(".splide", {
    type: "fade",
    rewind: true,
  });
  splide.mount();
}

function gerarVideos(passive, spells) {
  const spellsVideosInnerHTML = `
  <div class="spells-video">
    <video id="video-1" class="spell-video ativo" controls playsinline preload="metadata" autoplay="true" muted style="object-fit: cover;object-position: center center;">
      <source src="https://d28xe8vt774jo5.cloudfront.net/${passive.slice(
        0,
        -4
      )}mp4" type="video/mp4">
      <source src="https://d28xe8vt774jo5.cloudfront.net/${passive}" type="video/webm">
    </video>
    <video id="video-2" class="spell-video" controls playsinline preload="metadata" autoplay="true" muted style="object-fit: cover;object-position: center center; display:none;">
      <source src="https://d28xe8vt774jo5.cloudfront.net/${spells[0].abilityVideoPath.slice(
        0,
        -4
      )}mp4" type="video/mp4">
      <source src="https://d28xe8vt774jo5.cloudfront.net/${
        spells[0].abilityVideoPath
      }" type="video/webm">
    </video>
    <video id="video-3" class="spell-video" controls playsinline preload="metadata" autoplay="true" muted style="object-fit: cover;object-position: center center; display:none;">
      <source src="https://d28xe8vt774jo5.cloudfront.net/${spells[1].abilityVideoPath.slice(
        0,
        -4
      )}mp4" type="video/mp4">
      <source src="https://d28xe8vt774jo5.cloudfront.net/${
        spells[1].abilityVideoPath
      }" type="video/webm">
    </video>
    <video id="video-4" class="spell-video" controls playsinline preload="metadata" autoplay="true" muted style="object-fit: cover;object-position: center center; display:none;">
      <source src="https://d28xe8vt774jo5.cloudfront.net/${spells[2].abilityVideoPath.slice(
        0,
        -4
      )}mp4" type="video/mp4">
      <source src="https://d28xe8vt774jo5.cloudfront.net/${
        spells[2].abilityVideoPath
      }" type="video/webm">
    </video>
    <video id="video-5" class="spell-video" controls playsinline preload="metadata" autoplay="true" muted style="object-fit: cover;object-position: center center; display:none;">
      <source src="https://d28xe8vt774jo5.cloudfront.net/${spells[3].abilityVideoPath.slice(
        0,
        -4
      )}mp4" type="video/mp4">
      <source src="https://d28xe8vt774jo5.cloudfront.net/${
        spells[3].abilityVideoPath
      }" type="video/webm">
    </video>
  </div>
  `;
  return spellsVideosInnerHTML;
}
