const simbolos = ["🍒", "🍋", "🍊", "⭐", "💎"];

function girar() {
    let r1 = document.getElementById("r1");
    let r2 = document.getElementById("r2");
    let r3 = document.getElementById("r3");
    let resultado = document.getElementById("resultado");

    // adicionar animação
    r1.classList.add("girando");
    r2.classList.add("girando");
    r3.classList.add("girando");

    resultado.innerText = "Girando...";

    setTimeout(() => {
        let s1 = simbolos[Math.floor(Math.random() * simbolos.length)];
        let s2 = simbolos[Math.floor(Math.random() * simbolos.length)];
        let s3 = simbolos[Math.floor(Math.random() * simbolos.length)];

        r1.innerText = s1;
        r2.innerText = s2;
        r3.innerText = s3;

        // parar animação
        r1.classList.remove("girando");
        r2.classList.remove("girando");
        r3.classList.remove("girando");

        // resultado
        if (s1 === s2 && s2 === s3) {
            resultado.innerText = "🎉 JACKPOT!!!";
        } else {
            resultado.innerText = "Tente novamente!";
        }

    }, 1500);
}
function girar() {
    if (apostaAtual === 0) {
        alert("Faça uma aposta!");
        return;
    }

    let r1 = document.getElementById("r1");
    let r2 = document.getElementById("r2");
    let r3 = document.getElementById("r3");
    let resultado = document.getElementById("resultado");

    r1.classList.add("girando");
    r2.classList.add("girando");
    r3.classList.add("girando");

    resultado.innerText = "Girando...";

    setTimeout(() => {
        let s1 = simbolos[Math.floor(Math.random() * simbolos.length)];
        let s2 = simbolos[Math.floor(Math.random() * simbolos.length)];
        let s3 = simbolos[Math.floor(Math.random() * simbolos.length)];

        r1.innerText = s1;
        r2.innerText = s2;
        r3.innerText = s3;

        r1.classList.remove("girando");
        r2.classList.remove("girando");
        r3.classList.remove("girando");

        let ganho = 0;
        let saldoAntes = saldo;

        // 🎰 REGRAS
        if (s1 === s2 && s2 === s3) {
            resultado.innerText = "🎉 JACKPOT!!!";
            ganho = apostaSlot * 3;
            saldo += apostaSlot * 3;
        } 
        else if (s1 === s2 || s2 === s3 || s1 === s3) {
            resultado.innerText = "✨ Boa! Dois iguais!";
            ganho = apostaSlot;
            saldo += apostaSlot * 2;
        } 
        else {
            resultado.innerText = "😢 Você perdeu!";
            ganho = -apostaSlot;
        }

        // reset aposta
        apostaSlot = 0;
        atualizarApostaSlot();

        // anima saldo
        animarSaldo(saldo);

        let saldoEl = document.getElementById("saldo");

        if (saldo > saldoAntes) {
            saldoEl.classList.add("ganhando");
        } else {
            saldoEl.classList.add("perdendo");
        }

        setTimeout(() => {
            saldoEl.classList.remove("ganhando", "perdendo");
        }, 600);

        mostrarGanho(ganho);

    }, 1500);
}

function apostarSlot(valor) {
    if (saldo >= valor) {
        saldo -= valor;
        apostaSlot += valor;

        atualizarApostaSlot();
        document.getElementById("saldo").innerText = saldo;
    }
}








let player = [];
let dealer = [];
let jogoAcabou = false;
let saldo = 1000;
let apostaSlot = 0;
let apostaBJ = 0;

// baralho real
const valores = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
const naipes = ["♠","♥","♦","♣"];

// gerar carta aleatória
function pegarCarta() {
    let valor = valores[Math.floor(Math.random() * valores.length)];
    let naipe = naipes[Math.floor(Math.random() * naipes.length)];
    return valor + naipe;
}

// valor da carta
function valorCarta(carta) {
    let valor = carta.slice(0, -1);

    if (valor === "A") return 11;
    if (["K","Q","J"].includes(valor)) return 10;
    return parseInt(valor);
}

// soma com ajuste de Ás
function somaCartas(cartas) {
    let soma = 0;
    let ases = 0;

    for (let c of cartas) {
        let v = valorCarta(c);
        soma += v;
        if (c.startsWith("A")) ases++;
    }

    // ajusta Ás de 11 para 1 se passar de 21
    while (soma > 21 && ases > 0) {
        soma -= 10;
        ases--;
    }

    return soma;
}

// criar carta visual
function criarCarta(carta) {
    let naipe = carta.slice(-1);
    let cor = (naipe === "♥" || naipe === "♦") ? "red" : "black";

    return `<div class="carta" style="color:${cor}">
                ${carta}
            </div>`;
}

// atualizar tela
function atualizarTela() {
    let playerDiv = document.getElementById("player-cartas");
    let dealerDiv = document.getElementById("dealer-cartas");

    playerDiv.innerHTML = "";
    dealerDiv.innerHTML = "";

    // cartas do jogador com delay
    player.forEach((carta, i) => {
        setTimeout(() => {
            playerDiv.innerHTML += criarCarta(carta);
        }, i * 300);
    });

    // cartas do dealer com delay
    dealer.forEach((carta, i) => {
        setTimeout(() => {
            dealerDiv.innerHTML += criarCarta(carta);
        }, i * 300);
    });

    document.getElementById("player-soma").innerText = somaCartas(player);
    document.getElementById("dealer-soma").innerText = somaCartas(dealer);
}
// iniciar jogo
function iniciarJogo() {
    if (apostaBJ === 0) {
        alert("Faça uma aposta!");
        return;
    }

    player = [pegarCarta(), pegarCarta()];
    dealer = [pegarCarta()];
    jogoAcabou = false;

    document.getElementById("resultadoBJ").innerText = "";
    atualizarTela();
}

// comprar carta
function comprar() {
    if (jogoAcabou) return;

    player.push(pegarCarta());

    if (somaCartas(player) > 21) {
        // chama o parar automaticamente
        parar();
        return;
    }

    atualizarTela();
}

// parar
function parar() {
    if (jogoAcabou) return;

    while (somaCartas(dealer) < 17) {
        dealer.push(pegarCarta());
    }

    let p = somaCartas(player);
    let d = somaCartas(dealer);

    let resultado = "";
    let saldoAntes = saldo;
    let ganho = 0;

    if (p > 21) {
    resultado = "💥 Você estourou! Perdeu!";
    ganho = -apostaBJ; // só visual
} 
else if (d > 21 || p > d) {
    resultado = "🎉 Você ganhou!";
    ganho = apostaBJ;
    saldo += apostaBJ * 2; // recebe o dobro
} 
else if (p < d) {
    resultado = "😢 Você perdeu!";
    ganho = -apostaBJ; // só visual
} 
else {
    resultado = "😐 Empate!";
    ganho = 0;
    saldo += apostaBJ; // devolve aposta
}
    apostaBJ = 0;

    document.getElementById("resultadoBJ").innerText = resultado;

    animarSaldo(saldo);

    let saldoEl = document.getElementById("saldo");

    if (saldo > saldoAntes) {
        saldoEl.classList.add("ganhando");
    } else {
        saldoEl.classList.add("perdendo");
    }

    setTimeout(() => {
        saldoEl.classList.remove("ganhando", "perdendo");
    }, 600);

    mostrarGanho(ganho);

    atualizarAposta();
    jogoAcabou = true;
    atualizarTela();
}
function mostrarGanho(valor) {
    let elemento = document.createElement("div");

    elemento.className = "efeito-dinheiro";

    if (valor > 0) {
        elemento.classList.add("positivo");
        elemento.innerText = "+" + valor;
    } else if (valor < 0) {
        elemento.classList.add("negativo");
        elemento.innerText = valor;
    } else {
        return;
    }

    let saldoEl = document.getElementById("saldo");
    let rect = saldoEl.getBoundingClientRect();

    elemento.style.position = "fixed";
    elemento.style.left = rect.left + rect.width / 2 + "px";
    elemento.style.top = rect.top + "px";

    document.body.appendChild(elemento);

    setTimeout(() => {
        elemento.remove();
    }, 1000);
}
function animarSaldo(valorFinal) {
    let elemento = document.getElementById("saldo");
    let valorAtual = parseInt(elemento.innerText);

    let incremento = valorFinal > valorAtual ? 1 : -1;

    let intervalo = setInterval(() => {
        valorAtual += incremento;
        elemento.innerText = valorAtual;

        if (valorAtual === valorFinal) {
            clearInterval(intervalo);
        }
    }, 10);
}
function apostar(valor) {
    if (saldo >= valor) {
        saldo -= valor;
        apostaBJ += valor;

        atualizarAposta();
        document.getElementById("saldo").innerText = saldo;
    } else {
        alert("Saldo insuficiente!");
    }
}
function atualizarAposta() {
    document.getElementById("aposta").innerText = apostaBJ;
}
function apostarBJ(valor) {
    if (saldo >= valor) {
        saldo -= valor;
        apostaBJ += valor;

        atualizarApostaBJ();
        document.getElementById("saldo").innerText = saldo;
    }
}