export let fileSystem = {
    "/": {
        "home": {},
        "pentest": {}
    },
    "/home": {
        "readme.txt": "Bem-vindo ao Kali Linux Simulator!\nAqui você aprenderá a usar comandos como ls, cd e cat.\nUse cat readme.txt para completar a primeira missão.",
        "targets.txt": "192.168.1.1\n192.168.1.100"
    },
    "/pentest": {
        "scan.sh": "#!/bin/bash\necho 'Scanning...'"
    }
};

// Para simular o reset do FS se quiser reiniciar o simulador
export function resetFS() {
    fileSystem = {
        "/": {
            "home": {},
            "pentest": {}
        },
        "/home": {
            "readme.txt": "Bem-vindo ao Kali Linux Simulator!\nAqui você aprenderá a usar comandos como ls, cd e cat.\nUse cat readme.txt para completar a primeira missão.",
            "targets.txt": "192.168.1.1\n192.168.1.100"
        },
        "/pentest": {
            "scan.sh": "#!/bin/bash\necho 'Scanning...'"
        }
    };
}

// Pega conteúdo de arquivo
export function getContent(path, file) {
    return fileSystem[path]?.[file] || null;
}
