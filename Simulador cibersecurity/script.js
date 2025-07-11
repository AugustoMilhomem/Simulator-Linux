import { fileSystem, getContent, resetFS } from './data/filesystem.js';
import { commands as phase1Commands } from './data/phase1.js';
import { commands as phase2Commands } from './data/phase2.js';
import { commands as phase3Commands } from './data/phase3.js';

const output = document.getElementById('output');
const cmdInput = document.getElementById('cmd');
const prompt = document.getElementById('prompt');
const missionDiv = document.getElementById('current-mission');

let currentDir = '/';
let currentPhase = 1;

let missions = {
    1: false, // fase 1 completa
    2: false,
    3: false
};

let commandSet = {};

// Junta os comandos de todas as fases
function loadCommands() {
    commandSet = {
        ...phase1Commands(currentDir, updateDir, print, fileSystem),
        ...(missions[1] ? phase2Commands(currentDir, updateDir, print, fileSystem) : {}),
        ...(missions[2] ? phase3Commands(currentDir, updateDir, print, fileSystem) : {})
    };
}

// Atualiza o prompt
function updatePrompt() {
    prompt.textContent = `root@kali:${currentDir}#`;
}

// Atualiza o diretório atual
function updateDir(newDir) {
    currentDir = newDir;
    updatePrompt();
    loadCommands();
}

// Função para exibir mensagens no terminal
function print(text, type = '') {
    const div = document.createElement('div');
    div.className = type;
    div.innerHTML = text;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
}

// Avalia se pode desbloquear próxima fase
function checkMissions(cmd) {
    if (cmd === 'cat readme.txt' && currentDir === '/home') {
        missions[1] = true;
        missionDiv.innerHTML = 'Fase 1 concluída! Comandos intermediários liberados.';
        print(`<div class="success">[+] Fase 2 desbloqueada!</div>`);
        loadCommands();
    }
    if (cmd.startsWith('scan') && missions[1] && !missions[2]) {
        missions[2] = true;
        missionDiv.innerHTML = 'Fase 2 concluída! Pentest liberado!';
        print(`<div class="success">[+] Fase 3 desbloqueada!</div>`);
        loadCommands();
    }
}

// Interpreta comandos digitados
function handleCommand(input) {
    const cleanInput = input.trim();
    print(`<span class='cmd-text'>${cleanInput}</span>`);

    const [cmd, ...args] = cleanInput.split(' ');
    if (commandSet[cmd]) {
        commandSet[cmd](args);
    } else {
        print(`Comando não encontrado: ${cmd}`, 'error');
    }

    checkMissions(cleanInput);
}

cmdInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const input = this.value;
        this.value = '';
        if (input.trim()) handleCommand(input);
    }
});

// Inicialização
function init() {
    resetFS();
    print(`<b>KALI LINUX SIMULATOR</b>`);
    print(`Digite <span class='cmd-text'>tutorial</span> para começar`);
    updatePrompt();
    loadCommands();
}

init();
