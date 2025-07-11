import { commands as phase1 } from "./data/phase1.js";
import { commands as phase2 } from "./data/phase2.js";
import { commands as phase3 } from "./data/phase3.js";
import { fileSystem } from "./data/filesystem.js";

let currentDir = "/";
let missions = {
    basics: false,
    scanning: false,
    cracking: false,
    exploitation: false
};

const output = document.getElementById("output");
const inputCmd = document.getElementById("cmd");

// Comandos por fase
let commandSets = {
    ...phase1(currentDir, setDir, print, fileSystem),
};

// Adiciona comandos da fase 2 quando desbloqueada
function loadPhase2() {
    commandSets = {
        ...commandSets,
        ...phase2(currentDir, setDir, print, fileSystem)
    };
}

// Adiciona comandos da fase 3 quando desbloqueada
function loadPhase3() {
    commandSets = {
        ...commandSets,
        ...phase3(currentDir, setDir, print, fileSystem)
    };
}

// Execução do comando
function executeCommand(cmd, args) {
    if (!commandSets[cmd]) {
        print(`Comando não encontrado: ${cmd}`, "error");
        return;
    }

    if (cmd === "scan" && !missions.scanning) {
        print("Missão de scan ainda não desbloqueada. Conclua o tutorial primeiro.", "error");
        return;
    }

    if (cmd === "crack" && !missions.cracking) {
        print("Missão de crack ainda não desbloqueada. Faça o scan primeiro.", "error");
        return;
    }

    if (cmd === "exploit" && !missions.exploitation) {
        print("Missão de exploit ainda não desbloqueada. Faça o crack primeiro.", "error");
        return;
    }

    commandSets[cmd](args);
}

// Define o diretório atual
function setDir(newPath) {
    currentDir = newPath;
}

// Exibe mensagens no terminal
function print(text, type = "") {
    const div = document.createElement("div");
    div.className = type;
    div.innerHTML = text;
    output.appendChild(div);
    scrollToBottom();
}

function scrollToBottom() {
    const terminal = document.getElementById("terminal");
    terminal.scrollTop = terminal.scrollHeight;
}

// Processa entrada do usuário
function processCommand() {
    const input = inputCmd.value.trim();
    if (input === "") return;
    inputCmd.value = "";

    print(`<span class='cmd-text'>${input}</span>`);
    const parts = input.split(" ");
    const cmd = parts[0];
    const args = parts.slice(1);

    // Se o usuário rodar "tutorial", desbloqueia a fase 2
    if (cmd === "tutorial") {
        missions.basics = true;
        missions.scanning = true;
        print("<b>=== TUTORIAL KALI LINUX ===</b>");
        print("1. Use <span class='cmd-text'>ls</span> para listar arquivos");
        print("2. Use <span class='cmd-text'>cd pasta</span> para navegar");
        print("3. Use <span class='cmd-text'>cat arquivo</span> para ler arquivos");
        print("4. Após ler o arquivo <i>readme.txt</i>, tente usar o comando <span class='cmd-text'>scan</span>");
        loadPhase2();
        return;
    }

    if (cmd === "scan") {
        missions.cracking = true;
        loadPhase3();
    }

    if (cmd === "crack") {
        missions.exploitation = true;
    }

    executeCommand(cmd, args);
}

// Evento para pressionar Enter ou "Ir" no celular
inputCmd.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.keyCode === 13) {
        e.preventDefault();
        processCommand();
    }
});

// Mensagem inicial
print(`<div class='success'>KALI LINUX SIMULATOR v3.0</div>`);
print("Digite <span class='cmd-text'>tutorial</span> para iniciar seu treinamento!");
print(`<div class="mission"><div class="mission-title">MISSÃO INICIAL: DOMINE O TERMINAL</div><div>Complete o tutorial básico para desbloquear missões de pentest</div></div>`);
