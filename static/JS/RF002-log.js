document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o ScrollReveal e define a configuração global
    window.sr = ScrollReveal({ 
        reset: true  // Efeito se repete sempre que o elemento reaparece na tela
    });

    // Aplica o efeito de revelação ao elemento com o ID 'container-main'
    sr.reveal('#container-main', {
        duration: 500,  // Duração da animação em milissegundos
        origin: 'top',   // Elemento surge do topo
        distance: '50px' // Distância percorrida pelo elemento
    });

    // Aplica o efeito de revelação ao formulário após um pequeno atraso
    const containerForm = document.querySelector('.container-form');
    setTimeout(() => {
        containerForm.classList.add('show');
    }, 100); // Ajuste o tempo conforme necessário

    // Aplica o efeito de revelação ao elemento com o ID 'container-form'
    sr.reveal('#container-form', {
        duration: 500,     // Duração da animação (1 segundo)
        scale: 0.5,         // O elemento começa com 50% do tamanho e cresce até 100%
        easing: 'ease-in-out', // Suaviza a transição
        distance: '0px',    // Remove o movimento, apenas o efeito de escala
       
    });

    // Aplica o efeito de revelação ao #container-footer (surgindo de baixo para cima)
    sr.reveal('#container-footer', {
        duration: 500,   // Duração da animação (1 segundo)
        origin: 'bottom', // O rodapé aparece de baixo para cima
        distance: '100px', // Distância que o rodapé percorre ao surgir
        easing: 'ease-in-out',
        opacity: 0
    });

});



document.addEventListener("DOMContentLoaded", function() {
    const containerForm = document.querySelector('.container-form');

    // Adiciona a classe 'show' após um pequeno atraso para permitir a transição
    setTimeout(() => {
        containerForm.classList.add('show');
    }, 100); // Ajuste o tempo conforme necessário
});


// Função para o campo de SN
// Prefixo fixo
const prefixo = "SN";
const snInput = document.getElementById('inp-SN');

// Adiciona o prefixo no campo quando o usuário clica no campo
snInput.addEventListener('focus', function(){
    if (snInput.value === '') {
        snInput.value = prefixo;
    }else{
        return;
    }
})

// Remove o prefixo no campo quando o usuário clica fora do campo
snInput.addEventListener('blur', function(){
    if (snInput.value === prefixo) {
        snInput.value = '';
    }else{
        return;
    }
})

// Adiciona o evento de input
snInput.addEventListener('input', function() {
    // Remove o prefixo para evitar duplicação
    let value = snInput.value.replace(prefixo, '');
    // Remove qualquer caractere que não seja número
    value = value.replace(/\D/g, '');
    // Limita a quantidade de números a 7
    value = value.substring(0, 7);
    // Atualiza o valor do input com o prefixo "SN" e os números digitados
    snInput.value = prefixo + value;
});

// Bloqueia o usuário de deletar o prefixo "SN"
snInput.addEventListener('keydown', function(e) {
    // Previne que o usuário apague o prefixo
    if (snInput.selectionStart < prefixo.length && (e.key === "Backspace" || e.key === "Delete")) {
        e.preventDefault();
    }
});

const sn = document.getElementById('inp-SN');
const senha = document.getElementById('inp-senha');
var permissao = '';

function logar(){
    if (sn.value == '' || senha.value == '') {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "SN ou senha não podem estar vázios!",
            showConfirmButton: false,
            timer: 3500
          });
          return;
    }
    var dados = {
        sn:sn.value,
        senha:senha.value
    }

    $.ajax({
        url: '/realizar-login',
        type: 'POST',
        data: JSON.stringify(dados),
        contentType: 'application/json',
        success: function(dados_login){
            if(dados_login['permissao'] == 'administrador'){
                window.location.href = '/tl-administrador';
            }

            else if(dados_login['permissao'] == 'manutencao'){
                window.location.href = '/RF006';
            }

            else if(dados_login['permissao'] == 'solicitante'){
                window.location.href = '/tl-solicitante';
            }
            console.log(dados_login["permissao"])
        },
        error: function(){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "SN ou senha inválidos!",
                showConfirmButton: false,
                timer: 3500
              });
        }
    })
}

document.getElementById('toggleSenha').addEventListener('click', function () {
    const senhaInput = document.getElementById('inp-senha');
    const cadeadoIcone = document.getElementById('cadeadoIcone');
    
    if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        cadeadoIcone.src = '/static/IMG/olho-de-perto.png'; 
        cadeadoIcone.alt = 'Ocultar senha';
    } else {
        senhaInput.type = 'password';
        cadeadoIcone.src = '/static/IMG/fechar-o-olho.png'; 
        cadeadoIcone.alt = 'Mostrar senha';
    }
});
