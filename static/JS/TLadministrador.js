// document.addEventListener("DOMContentLoaded", function() {
//     document.getElementById('menuHamburguer').addEventListener('click', function() {
//         document.getElementById('menuList').classList.toggle('active');
//     });
// });


function redirectSolicitacao() {
    window.location.href = '/RF003';
}

function logout() {
    window.location.href = '/logout';
}

function mostrar_encaminhados() {
    $.ajax({
        url: '/api/get/tl-administrador',
        type: 'GET',
        success: function(encaminhados) {
            console.log(encaminhados);
            document.getElementById('encaminhados').innerHTML = '';
            for (let x = 0; x < encaminhados.length; x++) { 
                var infoEncaminhados = `<div class="ladoEsquerdo-conteudo">
                    <div class="ladoEsquerdo-card">
                        <p class="horario">| ${encaminhados[x]['nome']}</p>
                        <div class="card-conteudo">
                            <p class="bloco">${encaminhados[x]['bloco']} | ${encaminhados[x]['id_sala']}</p>
                            <p class="urgencia">${encaminhados[x]['status']}</p>
                            <a href=""><i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>`;
                document.getElementById('encaminhados').innerHTML += infoEncaminhados;
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    mostrar_encaminhados();
});

