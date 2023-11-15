const container = document.querySelector("#container");
let allChampions = [];

const getChampions = async () => {
  const url =
    "https://ddragon.leagueoflegends.com/cdn/13.22.1/data/pt_BR/champion.json";
  const response = await fetch(url);
  const data = await response.json();
  const champs = data.data;
  // await fetchChampions(champs);
  totalChampions = Object.keys(data.data).length;
  for (var chave in champs) {
    await createChampionCard(champs[chave]);
  }
};

async function getChampionData(id) {
  try {
    const champion = await Promise.all([
      fetch(
        `https://ddragon.leagueoflegends.com/cdn/13.22.1/data/en_US/champion/${id}.json`
      ).then((res) => res.json()),
    ]);
    return true;
  } catch (error) {
    console.error("Failed to fetch Champion data before redirect");
  }
}

const createChampionCard = async (champion) => {
  const card = document.createElement("div");
  card.classList.add("champion");

  let name = champion.id;
  name = separarPalavrasPorMaiuscula(name);
  const key = champion.key;
  console.log(key);
  const icon = `https://ddragon.leagueoflegends.com/cdn/13.22.1/img/champion/${champion.image.full}`;
  let roles = champion.tags;
  roles = juntarRole(traduzRoles(roles));

  const championInnerHTML = `
  <div class="champion-icon">
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
};

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

getChampions();
