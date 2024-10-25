document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o ScrollReveal e define a configuração global
    window.sr = ScrollReveal({ 
        reset: true  // Efeito se repete sempre que o elemento reaparece na tela
    });

     // Aplica o efeito de revelação ao elemento com o ID 'container-main'
     sr.reveal('#header__user-info', {
        duration: 500,  // Duração da animação em milissegundos
        origin: 'top',   // Elemento surge do topo
        distance: '50px' // Distância percorrida pelo elemento
    });

    sr.reveal('#header__date-container', {
        duration: 500,
        origin: 'top',
        distance: '30px' // Distância menor para evitar movimento exagerado
    });
    
    sr.reveal('#sectionBaixo', {
        duration: 500,
        origin: 'bottom',
        distance: '50px', // Diminuir a distância
        easing: 'ease-in-out',
        opacity: 0
    });

    sr.reveal('#card', {
        duration: 500,
        origin: 'bottom',
        distance: '50px', // Diminuir a distância
        easing: 'ease-in-out',
        opacity: 0
    });
    

});

function mostrarSolicitacoes() {
    $.ajax({
        url: '/retorna-solicitacoes',
        type: 'GET',
        success: function(solicitacoes){
            console.log(solicitacoes)
            document.getElementById('solicitacoes').innerHTML = '';

            if (solicitacoes.length == 0) {
                document.getElementById('solicitacoes').innerHTML = '<h3>Não há solicitações</h3>';
            }else{
                for (let x = 0; x < solicitacoes.length; x++) {
                    // var option = document.createElement('option');
                    // option.value = blocos[x][0];
                    // option.textContent = blocos[x][0];
                    // inputBloco.append(option);
                    var infoSolicitacoes = `<article class="sectionBaixo__grid-item">
                <div class="card">
                    <!-- Cabeçalho do card com localização do prédio -->
                    <header class="card__header">
                        <span class="card__building" aria-label="Localização do prédio">${solicitacoes[x][2]} - ${solicitacoes[x][1]}</span>
                    </header>
                    <div class="card__body">
                        <div class="container-card">
                        <!-- Serviço descrito no card -->
                        <p class="card__service" aria-label="Serviço">${solicitacoes[x][5]}</p>
                        <p class="card_data" aria-label="Horário do Serviço">${solicitacoes[x][6]} |</p>
                        </div>
                        <!-- Pessoa que fez a solicitação -->
                        <p class="card__responsavel" aria-label="Responsável pela solicitação">${solicitacoes[x][4]}</p>
                        <!-- Linha horizontal para separação visual -->
                        <hr class="card__linha" aria-hidden="true">
                        <!-- Descrição do serviço -->
                        <p class="card__descricao" aria-label="Descrição do serviço">
                            ${solicitacoes[x][3]}
                        </p>
                    </div>
                    <!-- Rodapé do card com botão de ação -->

                    <footer class="card__footer">
                        <a href="/RF004A/${solicitacoes[x][0]}"><button class="card__button" aria-label="Encaminhar solicitação">Detalhes</button></a>
                    </footer>
                </div>

                </article>`
                    document.getElementById('solicitacoes').innerHTML += infoSolicitacoes;
                }
            }
        },
        error: function(){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Erro no retorno das solicitações!",
                showConfirmButton: false,
                timer: 3500
              });
        }
    });
}

function funcVoltar() {
    window.location.href = '/tl-administrador'
}

$(document).ready(mostrarSolicitacoes)

setInterval(function(){
    mostrarSolicitacoes()
    console.log('Recarregando...')
}, 5000);


function filtrarServicos() {
    // Obtém o valor do campo de pesquisa
    const searchInput = document.getElementById('search').value.toLowerCase();
    // Obtém todos os serviços
    const servicos = document.querySelectorAll('.sectionBaixo__grid-item');

    // Itera sobre os serviços e oculta ou exibe conforme a pesquisa
    servicos.forEach(servico => {
        const serviceText = servico.textContent.toLowerCase();
        if (serviceText.includes(searchInput)) {
            servico.style.display = ''; // Exibe o serviço
        } else {
            servico.style.display = 'none'; // Oculta o serviço
        }
    });
}

