export function commands(currentDir, setDir, print, fileSystem) {
    return {
        scan: ([ip]) => {
            if (!ip) return print("Uso: scan <IP>", "error");

            print(`[+] Iniciando varredura em ${ip}...`);
            setTimeout(() => {
                print("PORT     STATE    SERVICE");
                print("22/tcp   open     ssh");
                print("80/tcp   open     http");
                print("443/tcp  filtered https");
                print("[+] Alvo identificado. Próximo passo: crack senha.");
            }, 1500);
        },

        crack: ([arquivo]) => {
            if (!arquivo) return print("Uso: crack <arquivo>", "error");

            print(`[+] Analisando hashes do arquivo ${arquivo}...`);
            setTimeout(() => {
                print("Hash encontrado: 5f4dcc3b5aa765d61d8327deb882cf99");
                print("Senha decifrada: password");
                print("[+] Acesso potencial identificado. Próximo passo: exploit.");
            }, 1500);
        },

        exploit: () => {
            print("[*] Enviando payload ao alvo...");
            setTimeout(() => {
                print("[+] Exploit bem-sucedido! Shell remoto simulado ativado:");
                print("root@target:/# echo 'Você invadiu!'");
            }, 2000);
        }
    };
}
