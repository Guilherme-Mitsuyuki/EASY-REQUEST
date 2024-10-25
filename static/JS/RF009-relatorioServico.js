function criarRelatório(id_encaminhamento) {
    $.ajax({
        url: `/RF009/${id_encaminhamento}`,
        type: 'GET',
        success: function(detalhes_encaminhamento){
            relatorio = `<hr>
                <h1>Relatório de Solicitação e Encaminhamento de Serviço</h1>
                <h2>Data: 25 de Outubro de 2024</h2>
                <h2>Solicitação: nº 015</h2>
                <h2>Encaminhamento: nº 008</h2>
                <hr>
                <h3>1. Detalhes da Solicitação e do Solicitante</h3>
                <ul>
                    <li>Solicitante: João Silva (CPF: 123.456.789-00)</li>
                    <li>Função: Coordenador de TI</li>
                    <li>E-mail: joao.silva@empresa.com</li>
                    <li>Serviço Solicitado: Manutenção de projetor</li>
                    <li>Sala: 101 (Bloco A)</li>
                    <li>Descrição: O projetor da Sala 101 apresenta falhas frequentes, desligando sozinho após alguns minutos de uso. Solicitada verificação do sistema de refrigeração e possíveis reparos técnicos.</li>
                    <li>Data da Solicitação: 20 de Outubro de 2024, às 08h00</li>
                    <li>Anexos: Imagem do projetor defeituoso (não incluída neste relatório)</li>
                </ul>
                <hr>
                <h3>2. Detalhes do Encaminhamento do Serviço</h3>
                <ul>
                    <li>Técnico Responsável: Pedro Gonçalves (CPF: 321.654.987-00)</li>
                    <li>Urgência: Alta</li>
                    <li>Data de Início do Encaminhamento: 20 de Outubro de 2024, às 09h00</li>
                    <li>Data de Conclusão do Serviço: 20 de Outubro de 2024, às 12h30</li>
                    <li>Adendo: Após o reparo, foi feito um teste de uso contínuo por 30 minutos, sem a ocorrência de novos desligamentos. O técnico também orientou o solicitante sobre a necessidade de limpeza periódica do equipamento para evitar o acúmulo de poeira.</li>
                </ul>
                <hr>`
        },
        error: function(){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Erro na criação do Relatório",
                showConfirmButton: false,
                timer: 3500
              });
        }
    });
}