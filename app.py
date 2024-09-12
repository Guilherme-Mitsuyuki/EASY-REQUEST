# Importando o Flask
from flask import Flask, render_template, request, redirect, session, jsonify

# Importando a classe Usuario
from Usuario import Usuario

# Instanciando o WebService
app = Flask(__name__)

# Criando uma senha para criptografar sessão
app.secret_key = "capivara"

# Criando rota para a página inicial
@app.route("/")
def pg_inicio():
    return render_template("index.html")

# Criando rota para a tela de cadastro
@app.route("/RF001", methods=["GET", "POST"])
def pg_cadastro(): # Função que executa o cadastro
    if request.method == "GET":
        return render_template("RF001-cad.html")
    else:
        cpf = request.form["cpf"]
        nome = request.form["nome"]
        email = request.form["email"]
        senha = request.form["senha"]
        sn = request.form["sn"]
        foto = request.form["foto"]
        id_funcao = int(request.form["funcao"])

        print(id_funcao)

        if id_funcao >= 2 and id_funcao <= 7:
            permissao = "solicitante"
        elif id_funcao == 1:
            permissao = "manutencao"

        usuario = Usuario()

        if usuario.cadastrar(cpf, nome, email, senha, sn, foto, permissao, id_funcao):
            session["usuario"] = {"CPF":cpf ,"nome":nome,"sn":sn, "foto":foto, "permissao":permissao}

            if session["usuario"]["permissao"] == "administrador":
                return redirect("/RF002")
            
            elif session["usuario"]["permissao"] == "manutencao":
                return redirect("/RF002")
            
            elif session["usuario"]["permissao"] == "solicitante":
                return redirect("/RF002")
        else:
            return redirect("/")

@app.route("/RF002",methods=["GET","POST"])
def pg_login():
    usuario = Usuario()
    if request.method == "GET":
        if session.get("usuario","erro") == "Autenticado": 
            return redirect("/")
        else:
            return render_template("RF002-log.html")
    else:
        sn = request.form["inp-SN"]
        senha = request.form["inp-senha"]

        usuario.logar(sn, senha)

        if usuario.logado:
            session["usuario"] = {"CPF":usuario.cpf, "nome":usuario.nome, "sn":sn, "foto":usuario.foto, "permissao":usuario.permissao}
            
            if session["usuario"]["permissao"] == "administrador":
                return redirect("/")
            
            elif session["usuario"]["permissao"] == "manutencao":
                return redirect("/")
            
            elif session["usuario"]["permissao"] == "solicitante":
                return redirect("/")
        else:
            session.clear()
            return redirect("/RF001")

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
