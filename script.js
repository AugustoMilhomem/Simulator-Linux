// Variáveis e estado
let currentDir = "/";
let missions = {
  basics: false,
  scanning: false,
  cracking: false,
  exploitation: false
};

const fileSystem = {
  "/home": {
    "readme.txt": "Bem-vindo ao simulador Kali Linux!",
    "targets.txt": "192.168.1.1\n192.168.1.100"
  },
  "/pentest": {
    "scan.sh": "#!/bin/bash\necho 'Scanning...'"
  }
};

const output = document.getElementById("output");
const inputCmd = document.getElementById("cmd");
const form = document.getElementById("terminal-form");

// Eventos
form.addEventListener("submit", function (e) {
  e.preventDefault();
  processCommand();
});

// Funções principais
function processCommand() {
  const input = inputCmd.value.trim();
  if (input === "") return;
  inputCmd.value = "";

  print(`<span class='cmd-text'>${input}</span>`);
  const parts = input.split(" ");
  const cmd = parts[0];
  const args = parts.slice(1);
  executeCommand(cmd, args);
}

function executeCommand(cmd, args) {
  if (!commands[cmd]) {
    print(`Comando não encontrado: ${cmd}`, "error");
    return;
  }

  if (commands[cmd].locked) {
    print("Missão não desbloqueada! Complete o tutorial primeiro.", "error");
    return;
  }

  commands[cmd].execute(args);
}

function print(text, type = "") {
  const div = document.createElement("div");
  div.className = type;
  div.innerHTML = text;
  output.appendChild(div);
  scrollToBottom();
}

function scrollToBottom() {
  const term = document.getElementById("terminal");
  term.scrollTop = term.scrollHeight;
}

function unlockMission(mission) {
  missions[mission] = true;
  print(`<div class='mission'><b>NOVA MISSÃO DESBLOQUEADA!</b> Use o comando <span class='cmd-text'>${mission}</span> para continuar.</div>`);
}

function startTutorial() {
  print("<b>=== TUTORIAL KALI LINUX ===</b>");
  print("1. Use <span class='cmd-text'>ls</span> para listar arquivos");
  print("2. Use <span class='cmd-text'>cd pasta</span> para navegar");
  print("3. Use <span class='cmd-text'>cat arquivo</span> para ler arquivos");

  missions.basics = true;
  unlockMission("scanning");
}

// Comandos
const commands = {
  help: {
    desc: "Mostra todos os comandos",
    execute: () => {
      const list = Object.keys(commands)
        .map(cmd => `→ <span class="cmd-text">${cmd}</span>: ${commands[cmd].desc}`)
        .join("<br>");
      print(list);
    }
  },
  ls: {
    desc: "Lista arquivos",
    execute: () => {
      const files = fileSystem[currentDir];
      if (!files) return print("Diretório não encontrado", "error");
      const list = Object.keys(files)
        .map(name => {
          const type = typeof files[name] === "object" ? "dir" : "file";
          return `<span class="${type}">${name}</span>`;
        })
        .join("  ");
      print(list);
    }
  },
  cd: {
    desc: "Muda de diretório",
    execute: ([dir]) => {
      const newPath = `${currentDir}/${dir}`.replace(/\/+/g, "/");
      if (!fileSystem[newPath]) return print("Diretório não encontrado", "error");
      currentDir = newPath;
    }
  },
  cat: {
    desc: "Mostra conteúdo de arquivos",
    execute: ([file]) => {
      const content = fileSystem[currentDir]?.[file];
      if (!content) return print("Arquivo não encontrado", "error");
      print(content);
    }
  },
  scan: {
    desc: "Varredura de rede (simulação)",
    locked: () => !missions.scanning,
    execute: ([ip]) => {
      if (!ip) return print("Uso: scan <IP>", "error");
      print(`[+] Scan iniciado em ${ip}...`);
      setTimeout(() => {
        print("PORT     STATE    SERVICE");
        print("22/tcp   open     ssh");
        print("80/tcp   open     http");
        print("443/tcp  filtered https");
        unlockMission("cracking");
      }, 1500);
    }
  },
  crack: {
    desc: "Quebra de senha (simulação)",
    locked: () => !missions.cracking,
    execute: () => {
      print("Iniciando quebra de senha com wordlist...");
      setTimeout(() => {
        print("Senha encontrada: <span class='success'>admin123</span>");
        unlockMission("exploitation");
      }, 2000);
    }
  },
  exploit: {
    desc: "Simula exploração de vulnerabilidade",
    locked: () => !missions.exploitation,
    execute: () => {
      print("Injetando payload reverso...");
      setTimeout(() => {
        print("Conexão estabelecida com shell remoto!");
        print("<span class='success'>Missão concluída!</span>");
      }, 1500);
    }
  },
  tutorial: {
    desc: "Inicia o tutorial interativo",
    execute: () => startTutorial()
  }
};
