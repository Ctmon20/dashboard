// Este arquivo roda automaticamente em qualquer página que o importar
window.addEventListener('DOMContentLoaded', () => {
    const urlAtualizacao = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRMemH9WEZV1qQ1G0GMeokhLCo8_r-zY0wfz3fi2gGRajJAzxLar06oDxJaP1V4er1KNLN9hlQWFSsA/pub?gid=1448845407&single=true&output=csv';

    // Faz a leitura da planilha de atualização de forma independente
    Papa.parse(urlAtualizacao, {
        download: true, 
        header: false, 
        skipEmptyLines: true,
        complete: function(results) {
            const linhas = results.data;
            if(linhas && linhas.length > 0) {
                
                // Pega o h2 dentro do header da página atual
                const elTitulo = document.querySelector('header h2');
                if (!elTitulo) return; // Se não tiver o h2, ignora
                
                const textoHeader = elTitulo.innerText.toUpperCase();
                
                // Mapeia dinamicamente qual indicador a página atual está usando
                // Mapeia dinamicamente qual indicador a página atual está usando
            let indicadorDetectado = "";
            if (textoHeader.includes("CVLI")) indicadorDetectado = "CVLI";
            else if (textoHeader.includes("TCO")) indicadorDetectado = "TCO";
            else if (textoHeader.includes("ARMAS")) indicadorDetectado = "ARMAS";
            else if (textoHeader.includes("DROGAS")) indicadorDetectado = "DROGAS";
            else if (textoHeader.includes("PRISÃO") || textoHeader.includes("PRISAO") || textoHeader.includes("PRISÕES") || textoHeader.includes("PRISOES")) indicadorDetectado = "PRISÃO"; // <-- Linha corrigida aqui!
            else if (textoHeader.includes("MENORES")) indicadorDetectado = "MENORES";
            else if (textoHeader.includes("VEÍCULO") || textoHeader.includes("VEICULO")) indicadorDetectado = "VEÍCULO";
            else if (textoHeader.includes("CVP")) indicadorDetectado = "CVP";
            else if (textoHeader.includes("CVNLI")) indicadorDetectado = "CVNLI";
            else if (textoHeader.includes("MÊS ATUAL") || textoHeader.includes("MES ATUAL")) indicadorDetectado = "MÊS ATUAL";

                if (indicadorDetectado) {
                    for (let i = 0; i < linhas.length; i++) {
                        const colunas = linhas[i];
                        if (colunas && colunas[0]) {
                            const indicadorPlanilha = colunas[0].toString().trim().toUpperCase();
                            
                            if (indicadorPlanilha === indicadorDetectado) {
                                const dataPlanilha = colunas[1] ? colunas[1].toString().trim() : "";
                                const horaPlanilha = colunas[2] ? colunas[2].toString().trim() : "";
                                
                                const elementoDestino = document.getElementById('data-atualizacao-planilha');
                                if (elementoDestino && dataPlanilha) {
                                    elementoDestino.innerText = `- Atualizado em: ${dataPlanilha} às ${horaPlanilha}`;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
    });
});