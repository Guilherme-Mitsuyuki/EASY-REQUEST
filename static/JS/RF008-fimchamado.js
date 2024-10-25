function encDetalhes(id_encaminhamento) {
    window.location.href = `/RF008A/${id_encaminhamento}`;
}

function funcVoltar() {
    window.location.href = '/tl-administrador';
}

// Adiciona um evento que escuta quando o DOM está totalmente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Adiciona um evento de clique no botão com id 'finalizar-btn'
    document.getElementById('finalizar-btn').addEventListener('click', function(event) {
        event.preventDefault(); // Impede o redirecionamento imediato do botão

        // Obtém a URL do atributo 'data-url' do botão clicado
        const url = this.getAttribute('data-url');

        // Exibe um alerta personalizado utilizando a biblioteca SweetAlert
        Swal.fire({
            title: "Serviço Finalizado", // Título do alerta
            text: "Escolha se deseja ver o relatório do serviço!", // Mensagem do alerta
            icon: "success", // Tipo do alerta (ícone)
            showCancelButton: true, // Exibe o botão de cancelamento
            confirmButtonColor: "#04A61C", // Cor do botão de confirmação
            cancelButtonColor: "#6d8ce8", // Cor do botão de cancelamento
            confirmButtonText: "Terminar", // Texto do botão de confirmação
            cancelButtonText: "Ver Relatório", // Texto do botão de cancelamento
            customClass: { // Classes CSS personalizadas para estilização
                title: 'custom-title',
                content: 'custom-content',
                confirmButton: 'custom-button',
                cancelButton: 'custom-button'
            }
        }).then((result) => {
            // Ação a ser realizada após o fechamento do alerta
            if (result.isConfirmed) {
                window.location.href = url; // Redireciona para a URL se o botão de confirmar for clicado
            } else {
                showReportModal(); // Chama a função para mostrar o modal se o botão de cancelar for clicado
            }
        });
    });
});

// Função para exibir um modal
function showReportModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "block"; // Exibe o modal

    // Obtém o botão de fechar do modal
    const fecharModal = document.getElementById("fecharModal");

    // Define o que acontece ao clicar no botão de fechar
    fecharModal.onclick = function() {
        modal.style.display = "none"; // Esconde o modal
    }

    // Define o que acontece ao clicar fora do modal
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none"; // Esconde o modal se clicar fora dele
        }
    }
}

// CSS para as classes personalizadas (adicionando estilo ao documento)
const style = document.createElement('style'); // Cria um elemento de estilo
style.innerHTML = `
    .custom-title {
        font-size: 24px; /* Tamanho do título */
    }
    .custom-content {
        font-size: 20px; /* Tamanho do texto do conteúdo */
    }
    .custom-button {
        font-size: 16px; /* Tamanho dos botões */
    }
`;
document.head.appendChild(style); // Adiciona o estilo ao cabeçalho do documento
