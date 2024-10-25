document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o ScrollReveal e define a configuração global
    window.sr = ScrollReveal({ 
        reset: true  // Efeito se repete sempre que o elemento reaparece na tela
    });

    // Aplica o efeito de revelação ao elemento com o ID 'container-header'
    sr.reveal('#cabecalho', {
        duration: 500,  // Duração da animação em milissegundos
        origin: 'top',   // Elemento surge do topo
        distance: '50px' // Distância percorrida pelo elemento
    });

    // Aplica o efeito de revelação ao elemento com o ID 'conteudo-principal'
    sr.reveal('#conteudo__card', {
        duration: 800,  // Duração da animação (mais lenta)
        origin: 'bottom',  // Elemento surge de baixo
        distance: '100px', // Distância que o elemento vai percorrer
        delay: 200,  // Atraso antes de iniciar a animação
        easing: 'ease-in-out',  // Tipo de suavização do movimento
    });
});

// Obtém o modal
const modal = document.getElementById("modal");

// Obtém o botão "Ver mais"
const botaoVerMais = document.querySelector(".conteudo__botao");

// Obtém o botão de fechar
const fecharModal = document.getElementById("fecharModal");

// Quando o botão "Ver mais" é clicado, abre o modal
botaoVerMais.onclick = function() {
    modal.style.display = "block";
}

// Quando o usuário clica no botão de fechar, fecha o modal
fecharModal.onclick = function() {
    modal.style.display = "none";
}

// Quando o usuário clica em qualquer lugar fora do modal, fecha o modal
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
