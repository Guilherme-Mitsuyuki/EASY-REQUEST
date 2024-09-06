# Criando as importações do Flask
from flask import Flask, render_template, request, redirect, session, jsonify

from Usuario import Usuario

# Instanciando o WebService
app = Flask(__name__)

# Criando uma senha para criptografar sessão
app.secret_key = "capivara"

# Criando rotas para as páginas
@app.route("/")
def pg_inicio():
    return render_template("index.html")

@app.route("/RF001")
def pg_cadastro():
    if session.get("usuario","erro") == "Autenticado":
        return render_template("RF001-cad.html")
    else:
        dados = request.get_json()
        cpf = dados["CPF"]
        nome = dados["nome"]
        email = dados["email"]
        senha = dados["senha"]
        sn = dados["SN"]
        foto = dados["foto"]
        permissao = dados["permissao"]
        id_funcao = dados["id_funcao"]

        usuario = Usuario()

        if usuario.cadastrar(cpf, nome, email, senha, sn, foto, permissao, id_funcao):
            session["usuario"] = {"nome":nome,"sn":sn, "foto":foto, "permissao":permissao}

            if session["usuario"]["permissao"] == "administrador":
                return jsonify({'mensagem':'Cadastro OK'}), 200, redirect("/")
            
            elif session["usuario"]["permissao"] == "manutencao":
                return jsonify({'mensagem':'Cadastro OK'}), 200, redirect("/")
            
            elif session["usuario"]["permissao"] == "solicitante":
                return jsonify({'mensagem':'Cadastro OK'}), 200, redirect("/")
        else:
            return {'mensagem':'ERRO'}, 500
    # return render_template("RF001-cad.html")

@app.route("/RF002")
def pg_login():
    return render_template("RF002-log.html")

@app.route("/RF003")
def pg_solicitacao():
    return render_template("RF003-solic.html")

@app.route("/RF004")
def pg_ADM_recebe_solicitacao():
    return render_template("RF004-ADMrecbSolic.html")

@app.route("/RF004A")
def pg_detalhe_solicitacao():
    return render_template("RF004A-detlSolic.html")

@app.route("/RF005")
def pg_encaminhar_solicitacao():
    return render_template("RF005-encamSolic.html")

@app.route("/RF006")
def pg_manutencao():
    return render_template("RF006-TLmanuten.html")

@app.route("/RF007")
def pg_manutencao_confirmacao():
    return render_template("RF007-manutConfirm.html")

@app.route("/RF008")
def pg_fim_chamado():
    return render_template("RF008-fimchamado.html")

@app.route("/RF009")
def pg_relatorio():
    return render_template("RF009-relatorio.html")

#Rodando o WebService
app.run(debug=True)
