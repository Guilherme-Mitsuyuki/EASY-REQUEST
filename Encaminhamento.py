# Importação das funções para conectar o MySQL
from conexao_SQL import Connection
from datetime import datetime

class Encaminhamento:
    def __init__(self) -> None:
        self.id_encaminhamento = None
        self.id_solicitacao = None
        self.CPF_funcionario = None
        self.prioridade = None
        self.status = None
        self.status_final = None
        self.adendo = None

    def realizar_encaminhamento(self, id_solicitacao, CPF_funcionario, prioridade):
        try:
            myBD = Connection.conectar()

            mycursor = myBD.cursor()

            self.id_solicitacao = id_solicitacao
            self.CPF_funcionario = CPF_funcionario
            self.prioridade = prioridade
            status = 'à fazer'
            data_inicio_encaminhamento = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

            mycursor.execute(f"INSERT INTO tb_encaminhamentos (id_solicitacao, CPF_funcionario, urgencia, status, status_finalizacao,data_inicio_encaminhamento) VALUES ({id_solicitacao}, '{CPF_funcionario}', '{prioridade}', '{status}', FALSE, '{data_inicio_encaminhamento}');")

            myBD.commit()

            return True
        except:
            return False

    def mostra_funcionarios(self):

        myBD = Connection.conectar()

        mycursor = myBD.cursor()

        mycursor.execute(f"SELECT f.nome, f.CPF_funcionario, f.foto from tb_funcionarios f, tb_funcoes fn WHERE f.id_funcao = fn.id_funcao AND permissao = 'manutencao';")

        mostra_funcionarios = mycursor.fetchall()

        return mostra_funcionarios
  
    def mostrar_encaminhamentos(self, status, cpf_funcionario):
        myBD = Connection.conectar()

        mycursor = myBD.cursor()

        self.status = status
        self.cpf_funcionario = cpf_funcionario

        mycursor.execute(f"SELECT s.id_sala, s.bloco, enc.urgencia, sol.id_solicitacao, enc.id_encaminhamento FROM tb_encaminhamentos enc, tb_solicitacoes sol, tb_salas s WHERE enc.id_solicitacao = sol.id_solicitacao AND sol.id_sala = s.id_sala AND enc.status = '{status}' AND enc.CPF_funcionario = '{cpf_funcionario}'")

        mostra_encaminhamentos = mycursor.fetchall()
        
        return mostra_encaminhamentos
    
    def mostrar_detalhes_encaminhamento(self, id_encaminhamento):
        myBD = Connection.conectar()

        mycursor = myBD.cursor()

        self.id_encaminhamento = id_encaminhamento

        print(id_encaminhamento)

        mycursor.execute(f"SELECT s.id_sala, sv.nome, f.nome, status_final, sol.descricao, adendo FROM tb_salas s, tb_servicos sv, tb_funcionarios f, tb_encaminhamentos enc, tb_solicitacoes sol WHERE sol.id_solicitacao = enc.id_solicitacao AND sv.id_servico = sol.id_servico AND s.id_sala = sol.id_sala AND f.CPF_funcionario = sol.CPF_funcionario AND enc.id_encaminhamento = {id_encaminhamento};")

        mostra_encaminhamentos = mycursor.fetchone()
        
        return mostra_encaminhamentos

    def aceitar_encaminhamento(self, id_encaminhamento, cpf_funcionario):
        myBD = Connection.conectar()

        mycursor = myBD.cursor()

        self.cpf_funcionario = cpf_funcionario
        data_inicio_servico = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        mycursor.execute(f"SELECT status FROM tb_encaminhamentos WHERE CPF_funcionario = '{cpf_funcionario}' AND status = 'fazendo'")

        retorno = mycursor.fetchone()

        print(retorno)

        if retorno is None:
            mycursor.execute(f"UPDATE tb_encaminhamentos SET status = 'fazendo', data_inicio_servico = '{data_inicio_servico}' WHERE id_encaminhamento = {id_encaminhamento};")
            myBD.commit()
            return True

        elif retorno[0] == "fazendo":
            return "Você só pode fazer um serviço por vez!"

    def mostrar_encaminhamentos_finalizacao(self):
        myBD = Connection.conectar()

        mycursor = myBD.cursor()

        mycursor.execute(f"SELECT status_final, fn.nome, id_sala, adendo, id_encaminhamento FROM tb_encaminhamentos enc, tb_solicitacoes sol, tb_servicos fn WHERE enc.id_solicitacao = sol.id_solicitacao AND sol.id_servico = fn.id_servico AND enc.status = 'feito'") 
        mostrar_encaminhamentos_finalizacao = mycursor.fetchall()

        lista_finalizacao=[]
        for encaminhamento in mostrar_encaminhamentos_finalizacao:
            lista_finalizacao.append({
                "status_final":encaminhamento[0],
                "servico":encaminhamento[1],
                "id_sala":encaminhamento[2],
                "adendo":encaminhamento[3],
                "id_encaminhamento":encaminhamento[4]
            })

        return lista_finalizacao
        
    def finalizacao_encaminhamento(self,id_encaminhamento,adendo,opcao):

        try:
            self.adendo = adendo
            self.opcao = opcao
            
            myBD = Connection.conectar()

            mycursor = myBD.cursor()
            data_termino_servico = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

            mycursor.execute(f"UPDATE tb_encaminhamentos SET status = 'feito', status_final = '{opcao}', adendo = '{adendo}', data_termino_servico = '{data_termino_servico}' WHERE id_encaminhamento = {id_encaminhamento};")

            myBD.commit()

            return True
        except:
            return False

    def finalizacao_encaminhamento_supervisor(self, id_encaminhamento):
        try:
            myBD = Connection.conectar()

            mycursor = myBD.cursor()
            data_relatorio = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

            mycursor.execute(f"UPDATE tb_encaminhamentos SET status_finalizacao = TRUE WHERE id_encaminhamento = {id_encaminhamento};")

            myBD.commit()

            mycursor.execute(f"INSERT INTO tb_relatorios (id_encaminhamento, data_relatorio) VALUES ({id_encaminhamento}, '{data_relatorio}')")

            myBD.commit()

            return True
        except:
            return False

    def dados_relatorio(self, id_encaminhamento):

        self.id_encaminhamento = id_encaminhamento
        
        myBD = Connection.conectar()

        mycursor = myBD.cursor()

        mycursor.execute(f"""SELECT data_relatorio, sol.id_solicitacao, enc.id_encaminhamento, f1.nome, sol.CPF_funcionario, f1.email, 
        sv.nome, sol.id_sala, s.bloco, sol.descricao, DATE_FORMAT(sol.data_inicio, '%d/%m/%Y'), TIME(sol.data_inicio), sol.foto, f2.nome,
        enc.urgencia, DATE_FORMAT(enc.data_inicio_servico, '%d/%m/%Y'), TIME(enc.data_inicio_servico), 
        DATE_FORMAT(enc.data_termino_servico, '%d/%m/%Y'), TIME(enc.data_termino_servico), enc.adendo FROM tb_relatorios, tb_solicitacoes sol,
        tb_encaminhamentos enc, tb_funcionarios f1, tb_funcionarios f2, tb_servicos sv, tb_salas s WHERE sol.id_solicitacao = enc.id_solicitacao
         AND f1.CPF_funcionario = sol.CPF_funcionario AND sv.id_servico = sol.id_servico AND s.id_sala = sol.id_sala AND 
        f2.CPF_funcionario = sol.CPF_funcionario AND enc.id_encaminhamento = {id_encaminhamento};""")

        dados_relatorio = mycursor.fetchone()

        print(dados_relatorio)

        return dados_relatorio