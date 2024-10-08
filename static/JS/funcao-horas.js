function obterSaudacao() {
    const agora = new Date();
    const hora = agora.getHours();

    if (hora >= 6 && hora < 12) {
        return "Bom Dia!";
    } else if (hora >= 12 && hora < 18) {
        return "Boa Tarde!";
    } else {
        return "Boa Noite!";
    }
}

document.getElementById('saudacao').textContent = obterSaudacao();
