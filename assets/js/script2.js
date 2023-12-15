const container = document.querySelector("#container");
const searchInput = document.querySelector("#search");
const closeButton = document.querySelector(".fechar-icon");
console.log(closeButton);
let allChampions = [];

fetch(
  "https://ddragon.leagueoflegends.com/cdn/13.22.1/data/pt_BR/champion.json"
)
  .then((response) => response.json())
  .then((data) => {
    allChampions = data.data;
    createChampionCard(allChampions);
  });

async function getChampionData(id) {
  var champion_name = id.replace(/\s/g, "");
  try {
    const champion = await Promise.all([
      fetch(
        `https://ddragon.leagueoflegends.com/cdn/13.22.1/data/pt_BR/champion/${champion_name}.json`
      ).then((res) => res.json()),
    ]);
    return true;
  } catch (error) {
    console.error("Failed to fetch Champion data before redirect");
  }
}

function createChampionCard(champions) {
  container.innerHTML = "";

  for (let champion in champions) {
    const campeaoAtual = champions[champion];

    const card = document.createElement("div");
    card.classList.add("champion");
    card.classList.add("hvr-grow");

    let name = campeaoAtual.id;
    name = separarPalavrasPorMaiuscula(name);
    let key = campeaoAtual.key;
    let icon = `https://ddragon.leagueoflegends.com/cdn/13.22.1/img/champion/${campeaoAtual.image.full}`;
    let roles = campeaoAtual.tags;
    roles = juntarRole(traduzRoles(roles));

    const championInnerHTML = `
    <div class="champion-icon ">
      <img class="icon" src="${icon}" alt="${champion.id}">
    </div>
    <div class="champion-info">
      <h2 class="name">${name}</h2>
      <p class="type">${roles}</p>
    </div>
    `;

    card.addEventListener("click", async () => {
      const success = await getChampionData(name);
      if (success) {
        window.location.href = `./detalhes.html?id=${name}&key=${key}`;
      }
    });

    card.innerHTML = championInnerHTML;
    container.appendChild(card);
  }
}

function separarPalavrasPorMaiuscula(name) {
  let palavras = name.split(/(?=[A-Z])/);
  let resultado = palavras.join(" ");
  return resultado;
}

function traduzRoles(roles) {
  for (var role in roles) {
    if (roles[role] === "Marksman") {
      roles[role] = "Atirador";
    } else if (roles[role] === "Assassin") {
      roles[role] = "Assassino";
    } else if (roles[role] === "Support") {
      roles[role] = "Suporte";
    } else if (roles[role] === "Mage") {
      roles[role] = "Mago";
    } else if (roles[role] === "Fighter") {
      roles[role] = "Lutador";
    }
  }
  return roles;
}

function juntarRole(roles) {
  let resultadoComCaractere = roles.join(", ");
  return resultadoComCaractere;
}

function buscaCampeao() {
  const nomeBusca = searchInput.value.toLowerCase();
  let todosCampeoes = Object.keys(allChampions);
  console.log(todosCampeoes);

  const campeoesFiltrados = Object.keys(allChampions)
    .filter((chave) =>
      allChampions[chave].id.toLowerCase().startsWith(nomeBusca)
    )
    .reduce((resultado, chave) => {
      resultado[chave] = allChampions[chave];
      return resultado;
    }, {});

  createChampionCard(campeoesFiltrados);

  var quantidadeCampeoesFiltrados = Object.keys(campeoesFiltrados);
  if (quantidadeCampeoesFiltrados.length === 0) {
    container.innerHTML = "Campeão não encontrado";
  }
}

function clearSearch() {
  searchInput.value = "";
  createChampionCard(allChampions);
}

searchInput.addEventListener("keyup", buscaCampeao);
closeButton.addEventListener("click", clearSearch);
