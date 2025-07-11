export function commands(currentDir, setDir, print, fileSystem) {
    return {
        help: () => {
            print("<b>Comandos disponíveis:</b>");
            print("<span class='cmd-text'>ls</span> - Lista arquivos");
            print("<span class='cmd-text'>cd</span> - Muda de diretório");
            print("<span class='cmd-text'>pwd</span> - Mostra o diretório atual");
            print("<span class='cmd-text'>cat</span> - Exibe conteúdo de arquivos");
            print("<span class='cmd-text'>clear</span> - Limpa o terminal");
            print("<span class='cmd-text'>tutorial</span> - Reinicia o tutorial");
        },

        ls: () => {
            const items = Object.keys(fileSystem[currentDir] || {});
            if (!items.length) {
                print("Diretório vazio");
                return;
            }
            items.forEach(item => {
                const path = `${currentDir}/${item}`.replace('//', '/');
                if (fileSystem[path]) {
                    print(`<span class="dir">${item}/</span>`);
                } else {
                    print(`<span class="file">${item}</span>`);
                }
            });
        },

        cd: ([target]) => {
            if (!target || target === '.') return;
            if (target === '..') {
                if (currentDir !== '/') {
                    const parts = currentDir.split('/').filter(p => p);
                    parts.pop();
                    setDir('/' + parts.join('/'));
                }
                return;
            }

            const newPath = (currentDir === '/' ? '' : currentDir) + '/' + target;
            if (fileSystem[newPath]) {
                setDir(newPath.replace('//', '/'));
            } else {
                print("Diretório não encontrado", "error");
            }
        },

        pwd: () => {
            print(currentDir);
        },

        cat: ([filename]) => {
            if (!filename) return print("Uso: cat <arquivo>", "error");
            const content = fileSystem[currentDir]?.[filename];
            if (content) {
                print(`<pre>${content}</pre>`);
            } else {
                print("Arquivo não encontrado", "error");
            }
        },

        clear: () => {
            document.getElementById('output').innerHTML = '';
        },

        tutorial: () => {
            print("<b>=== TUTORIAL BÁSICO ===</b>");
            print("1. Use <span class='cmd-text'>ls</span> para listar arquivos");
            print("2. Use <span class='cmd-text'>cd pasta</span> para navegar");
            print("3. Use <span class='cmd-text'>cat arquivo</span> para ler arquivos");
            print("4. Complete: <span class='cmd-text'>cat readme.txt</span>");
        }
    };
}
