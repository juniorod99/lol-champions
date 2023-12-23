const container = document.querySelector("#container");
const searchInput = document.querySelector("#search");
const closeButton = document.querySelector(".fechar-icon");
let allChampions = [];

fetch(
  "https://ddragon.leagueoflegends.com/cdn/13.24.1/data/pt_BR/champion.json"
)
  .then((response) => response.json())
  .then((data) => {
    allChampions = data.data;
    createChampionCard(allChampions);
  });

async function getChampionData(id) {
  var championName = id.replace(/\s/g, "");
  try {
    const champion = await Promise.all([
      fetch(
        `https://ddragon.leagueoflegends.com/cdn/13.24.1/data/pt_BR/champion/${championName}.json`
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
    const actualChampion = champions[champion];
    const card = document.createElement("div");
    card.classList.add("champion");
    card.classList.add("hvr-grow");

    let name = splitNamesByUppercase(actualChampion.id);
    let key = actualChampion.key;
    let icon = `https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${actualChampion.image.full}`;
    let roles = mergeRoles(translateRoles(actualChampion.tags));

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

function splitNamesByUppercase(name) {
  return name.split(/(?=[A-Z])/).join(" ");
}

function translateRoles(roles) {
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

function mergeRoles(roles) {
  return roles.join(", ");
}

function searchChampion() {
  const searchedName = searchInput.value.toLowerCase();
  const filteredChampions = Object.keys(allChampions)
    .filter((key) =>
      allChampions[key].id.toLowerCase().startsWith(searchedName)
    )
    .reduce((result, key) => {
      result[key] = allChampions[key];
      return result;
    }, {});

  createChampionCard(filteredChampions);

  var quantityFilteredChampions = Object.keys(filteredChampions);
  if (quantityFilteredChampions.length === 0) {
    container.innerHTML = "Nenhum campeão encontrado";
  }
}

function clearSearch() {
  searchInput.value = "";
  createChampionCard(allChampions);
}

searchInput.addEventListener("keyup", searchChampion);
closeButton.addEventListener("click", clearSearch);
