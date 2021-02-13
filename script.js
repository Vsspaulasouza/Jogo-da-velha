const CAMPOS = document.querySelectorAll(".campo");
const BOTAO_ZERAR = document.querySelector("[data-btn='zerar'");
const BOTAO_NOVO_JOGO = document.querySelector("[data-btn='jogar-novamente'");
let jogouPorUltimo = "X";
let mensagemJogadorVenceu = document.querySelector(".mensagem p span");
let mensagemPontosX = document.querySelector("[data-pontos='X']");
let mensagemPontos0 = document.querySelector("[data-pontos='0']");
let mensagem = document.querySelector(".mensagem");
let vitoriasX = 0;
let vitorias0 = 0;

const CAMPOS_ARRAY = Array.from(CAMPOS);

function filtrarCampos(valores) {
  let adjacentes = {};
  adjacentes.linha = CAMPOS_ARRAY.filter(
    (item) => item.getAttribute("data-linha") === valores[0]
  );
  adjacentes.coluna = CAMPOS_ARRAY.filter(
    (item) => item.getAttribute("data-coluna") === valores[1]
  );
  if (valores[2] === "ambas") {
    adjacentes.diagonais = {
      diagonal1: [CAMPOS_ARRAY[0], CAMPOS_ARRAY[4], CAMPOS_ARRAY[8]],
      diagonal2: [CAMPOS_ARRAY[2], CAMPOS_ARRAY[4], CAMPOS_ARRAY[6]],
    };
  }
  if (valores.length === 3) {
    adjacentes.diagonal = CAMPOS_ARRAY.filter(
      (item) => item.getAttribute("data-diagonal") === valores[2]
    );
    adjacentes.diagonal = adjacentes.diagonal.concat(CAMPOS_ARRAY[4]);
  }
  return adjacentes;
}

function verificaVitoria(event) {
  let matriz = filtrarCampos(Object.values(event.currentTarget.dataset));
  let isVictory = (vetor) =>
    vetor.every(
      (item) => item.innerText === event.currentTarget.childNodes[0].innerText
    );
  if (!event.currentTarget.dataset.hasOwnProperty("diagonal")) {
    return isVictory(matriz.linha) || isVictory(matriz.coluna);
  }
  if (event.currentTarget.dataset.diagonal !== "ambas") {
    return (
      isVictory(matriz.linha) ||
      isVictory(matriz.coluna) ||
      isVictory(matriz.diagonal)
    );
  }
  return (
    isVictory(matriz.linha) ||
    isVictory(matriz.coluna) ||
    isVictory(matriz.diagonais.diagonal1) ||
    isVictory(matriz.diagonais.diagonal2)
  );
}

const marcado = function (item) {
  if (item.innerText === "X" || item.innerText === "0") return true;
  return false;
};

function marcarCampo(event) {
  if (event.currentTarget.hasChildNodes()) return;
  let conteudo = document.createElement("p");
  jogouPorUltimo === "X" ? (jogouPorUltimo = "0") : (jogouPorUltimo = "X");
  conteudo.innerText = jogouPorUltimo;
  conteudo.setAttribute("class", "marcado");
  event.currentTarget.appendChild(conteudo);

  if (verificaVitoria(event)) {
    jogouPorUltimo === "X" ? ++vitoriasX : ++vitorias0;
    mensagemJogadorVenceu.innerText = jogouPorUltimo;
    mensagemPontosX.innerText = vitoriasX;
    mensagemPontos0.innerText = vitorias0;
    mensagem.classList.add("visivel");
  }
  if (CAMPOS_ARRAY.every(marcado)) {
    document.querySelector(".mensagem p").innerText = "Velha!";
    mensagem.classList.add("visivel");
  }
}

CAMPOS.forEach((item) => {
  item.addEventListener("click", marcarCampo);
});

function novoJogo() {
  CAMPOS.forEach((item) => (item.innerText = ""));
  mensagem.classList.remove("visivel");
}
BOTAO_NOVO_JOGO.addEventListener("click", novoJogo);

function zerar() {
  vitoriasX = 0;
  vitorias0 = 0;
  mensagemPontosX.innerText = vitoriasX;
  mensagemPontos0.innerText = vitorias0;
}
BOTAO_ZERAR.addEventListener("click", zerar);
