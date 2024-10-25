function funcVoltar() {
    window.location.href = '/RF008';
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('finalizar-btn').addEventListener('click', function(event) {
        event.preventDefault(); // Impede o redirecionamento imediato
        const url = this.getAttribute('data-url'); // Obtém a URL do atributo data

        Swal.fire({
            title: "Serviço",
            text: "Você não poderá reverter isso!",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, finalizar!",
            cancelButtonText: "Não, cancelar!"
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = url; // Redireciona para a URL
            } else {
                // Mostrar relatório
                Swal.fire({
                    title: "Mostrar relatório",
                    text: "Você pode ver o relatório agora.",
                    icon: "info" // Ícone de informação
                });
            }
        });
    });
});
