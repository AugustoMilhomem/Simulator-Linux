export function commands(currentDir, setDir, print, fileSystem) {
    return {
        mkdir: ([folder]) => {
            if (!folder) return print("Uso: mkdir <nome>", "error");
            const path = `${currentDir}/${folder}`.replace('//', '/');
            if (fileSystem[path]) return print("Diretório já existe", "error");
            fileSystem[path] = {};
            print(`Diretório '${folder}' criado`);
        },

        touch: ([filename]) => {
            if (!filename) return print("Uso: touch <arquivo>", "error");
            fileSystem[currentDir][filename] = "";
            print(`Arquivo '${filename}' criado`);
        },

        rm: ([file]) => {
            if (!file) return print("Uso: rm <arquivo>", "error");
            if (fileSystem[currentDir][file]) {
                delete fileSystem[currentDir][file];
                print(`Arquivo '${file}' removido`);
            } else {
                print("Arquivo não encontrado", "error");
            }
        },

       mv: ([from, to]) => {
    if (!from || !to) return print("Uso: mv <origem> <destino>", "error");

    const content = fileSystem[currentDir][from];
    if (content === undefined) return print("Arquivo não encontrado", "error");

    const pathTo = `${currentDir}/${to}`.replace('//', '/');

    // Se for um diretório, mover para dentro
    if (fileSystem[pathTo]) {
        fileSystem[pathTo][from] = content;
        delete fileSystem[currentDir][from];
        print(`Arquivo '${from}' movido para '${to}/'`);
    } else {
        // Caso contrário, é renomeação
        fileSystem[currentDir][to] = content;
        delete fileSystem[currentDir][from];
        print(`Arquivo renomeado de '${from}' para '${to}'`);
    }
}


        cp: ([from, to]) => {
            if (!from || !to) return print("Uso: cp <origem> <destino>", "error");
            const content = fileSystem[currentDir][from];
            if (content === undefined) return print("Arquivo não encontrado", "error");
            fileSystem[currentDir][to] = content;
            print(`Arquivo '${from}' copiado como '${to}'`);
        },

        whoami: () => {
            print("root");
        },

        echo: (args) => {
            const output = args.join(' ');
            print(output);
        },

        chmod: ([perm, file]) => {
            if (!perm || !file) return print("Uso: chmod <777> <arquivo>", "error");
            if (!fileSystem[currentDir][file]) return print("Arquivo não encontrado", "error");
            print(`Permissões de '${file}' alteradas para ${perm} (simulado)`);
        }
    };
}
