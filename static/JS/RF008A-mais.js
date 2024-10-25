function funcVoltar() {
    window.location.href = '/RF008';
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('finalizar-btn').addEventListener('click', function(event) {
        event.preventDefault(); // Impede o redirecionamento imediato
        const url = this.getAttribute('data-url'); // Obtém a URL do atributo data

        Swal.fire({
            title: "Serviço Finalizado",
            text: "Escolha se deseja ver o relatório do serviço!",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#04A61C",
            cancelButtonColor: "#ED7203",
            confirmButtonText: "Terminar",
            cancelButtonText: "Ver Relatório",
            customClass: {
                title: 'custom-title', // Classe para o título
                content: 'custom-content', // Classe para o conteúdo
                confirmButton: 'custom-button', // Classe para o botão de confirmação
                cancelButton: 'custom-button' // Classe para o botão de cancelamento
            }
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = url; // Redireciona para a URL
            } else {
                showReportModal(); // Chama a função para mostrar o modal
            }
        });
    });
});

function showReportModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "block"; // Exibe o modal

    // Obtém o botão de fechar
    const fecharModal = document.getElementById("fecharModal");

    // Fecha o modal ao clicar no botão de fechar
    fecharModal.onclick = function() {
        modal.style.display = "none";
    }

    // Fecha o modal ao clicar fora dele
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}


// CSS para as classes personalizadas
const style = document.createElement('style');
style.innerHTML = `
    .custom-title {
        font-size: 24px; /* Tamanho do título */
    }
    .custom-content {
        font-size: 20px; /* Tamanho do texto */
    }
    .custom-button {
        font-size: 16px; /* Tamanho dos botões */
    }
`;
document.head.appendChild(style);