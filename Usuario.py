# Importação das funções para conectar o MySQL e criar senhas criptografadas.
from conexao_SQL import Connection
from hashlib import sha256

# Criação da classe Usuario, que guarda as informações e funções relacionadas ao usuario.
class Usuario:
    def __init__(self) -> None: # Função que cria o usuário com suas informações vazias.
        self.CPF = None
        self.nome = None
        self.email = None
        self.senha = None
        self.SN = None
        self.foto = None
        self.permissao = None
        self.id_funcao = None
        self.logado = False

    def cadastrar(self, CPF, nome, email, senha, SN, foto, permissao, id_funcao): # Função que cadastra o usuário no Banco de Dados.
        try:
            myBD = Connection.conectar()

            mycursor = myBD.cursor()

            self.CPF = CPF
            self.nome = nome
            self.email = email
            self.senha = senha
            self.SN = SN
            self.foto = foto
            self.permissao = permissao
            self.id_funcao = id_funcao
            self.logado = True
            senha_criptografada = sha256(self.senha.encode()).hexdigest()

            mycursor.execute(f"INSERT INTO tb_funcionarios (CPF_funcionario, nome, email, senha, SN, foto, permissao) VALUES ('{CPF}','{nome}', '{email}', '{senha_criptografada}', '{SN}', '{foto}', '{permissao}', {id_funcao});")

            myBD.commit()

            return True
        except:
            return False

    def logar(self, email, senha, permissao): # Função que executa o login do usuário no sistema.
        myBD = Connection.conectar()

        mycursor = myBD.cursor()

        self.senha = senha
        senha_criptografada = sha256(self.senha.encode()).hexdigest()

        mycursor.execute(f"SELECT nome, SN, senha, permissao FROM tb_funcionarios WHERE email = '{email}' AND permissao = '{permissao}' AND BINARY senha = '{senha_criptografada}';")

        resultado = mycursor.fetchone()

        if resultado != None:
            self.logado = True
            self.nome = resultado[0]
            self.email = resultado[1]
            self.senha = resultado[2]
            self.permissao = resultado[3]
        else:
            self.logado = False