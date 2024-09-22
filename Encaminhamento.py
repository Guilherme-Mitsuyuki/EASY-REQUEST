# Importação das funções para conectar o MySQL
from conexao_SQL import Connection

class Encaminhamento:
    def __init__(self) -> None:
        self.id_encaminhamento = None
        self.id_solicitacao = None
        self.CPF_funcionario = None
        self.prioridade = None
        self.status = None
        self.status_final = None
        self.adendo = None

    def realizar_encaminhamento(self, id_solicitacao, CPF_funcionario, prioridade, status, status_final, adendo):
        try:
            myBD = Connection.conectar()

            mycursor = myBD.cursor()

            self.id_solicitacao = id_solicitacao
            self.CPF_funcionario = CPF_funcionario
            self.prioridade = prioridade
            self.status = status
            self.status_final = status_final
            self.adendo = adendo

            mycursor.execute(f"INSERT INTO tb_encaminhamentos (id_solicitacao, CPF_funcionario, prioridade, status, status_final, adendo) VALUES ({id_solicitacao}, {CPF_funcionario}, {prioridade}, {status}, {status_final}, {adendo})")

            myBD.commit()

            return True
        except:
            return False