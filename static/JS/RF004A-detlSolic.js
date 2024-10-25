document.addEventListener('DOMContentLoaded', function() {
        // Inicializa o ScrollReveal e define a configuração global
        window.sr = ScrollReveal({ 
            reset: true  // Efeito se repete sempre que o elemento reaparece na tela
        });
    
        // Aplica o efeito de revelação ao elemento com o ID 'container-header'
        sr.reveal('#container-header', {
            duration: 500,  // Duração da animação em milissegundos
            origin: 'top',   // Elemento surge do topo
            distance: '50px' // Distância percorrida pelo elemento
        });
    
        // Aplica o efeito de revelação ao elemento com o ID 'conteudo-principal'
        sr.reveal('#detalhes-solicitacao', {
            duration: 800,  // Duração da animação (mais lenta)
            origin: 'bottom',  // Elemento surge de baixo
            distance: '100px', // Distância que o elemento vai percorrer
            delay: 200,  // Atraso antes de iniciar a animação
            easing: 'ease-in-out',  // Tipo de suavização do movimento
        });
    });
    
function funcVoltar() {
        window.location.href = '/RF004'
}

// Função que retorna todos os blocos do SENAI no campo do formulário
function deletarSolicitacao(id_solicitacao) {
        Swal.fire({
                title: "Você tem certeza?",
                text: "Isso deletará a solicitação permanentemente!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "var(--colorGreen)",
                cancelButtonColor: "#d33",
                confirmButtonText: "Deletar",
                cancelButtonText: "Cancelar"
              }).then((result) => {
                if (result.isConfirmed) {
                        $.ajax({
                                url: `/deletar-solicitacao/${id_solicitacao}`,
                                type: 'GET',
                                success: function(){
                                        Swal.fire({
                                                title: "Deletado!",
                                                text: "A solicitação foi deletada com sucesso",
                                                icon: "success",
                                                showConfirmButton: false
                                        });
                                        
                                        setTimeout(() => {
                                                window.location.href = '/RF004';
                                        }, 2500);
                                },
                                error: function(){
                                        Swal.fire({
                                                icon: "error",
                                                title: "Oops...",
                                                text: "Falha ao deletar a solicitação",
                                                showConfirmButton: false,
                                                timer: 3500
                                              });
                                }
                        });
                }
              });
    }