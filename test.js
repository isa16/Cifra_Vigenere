var alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var acento = ["ã", "á", "à", "â", "é", "è", "ê", "í", "î", "ì", "ó", "ô", "ò", "õ", "ú", "ù", "û", "ç"];
var sAcento = ["a", "a", "a", "a", "e", "e", "e", "i", "i", "i", "o", "o", "o", "o", "u", "u", "u", "c"];
var numsim = '1234567890!@#$%¨&*()_+,./|';
var chave = []

capturarElemento = (ref) => {
    const elemento = document.querySelector(ref);
    return elemento;
}

verificarChave = () => {
    let chave = capturarElemento('.chave').value.toLowerCase();
    console.log(chave);
    if (!chave.length) {
        return alert('Chave não Inserida');
    };
}

preencherChave = () => {
    let ch = retirarAcento(capturarElemento('.chave').value.toLowerCase());
    console.log(ch);
    for (let k = 0; k < ch.length; k++) {
        for (let l = 0; l < alfabeto.length; l++) {
            if (alfabeto[l] === ch[k]) {
                chave[k] = l
            }
        }
    }
    console.log(chave)
    return chave
}

retirarAcento = (text) => {
    let aux = "", a = "", texto = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] != " ") {
            for (let j = 0; j < acento.length; j++) {
                if (text[i] === acento[j]) {
                    aux += sAcento[j]
                    texto = 1
                } else if (text[i] != acento[j]) {
                    a = text[i]
                }
            }
            if (texto != 1) {
                aux += a
            }
            texto = 0
        } else if (text[i] == " ") {
            aux += " "
        }
    }
    console.log(aux);
    return aux;
}

criptografar = () => {
    verificarChave();
    let text = retirarAcento(capturarElemento('.texto').value.toLowerCase());
    let res = "", resultado = "";
    let c = preencherChave();
    let anchor = 0;
    for (let i = 0; i < text.length; i++) {

        for (let k = 0; k < numsim.length; k++) {
            if (text[i] === numsim.charAt(k)) {
                resultado += numsim.charAt(k)
            }
        }
        if (i <= text.length) {
            if (text[i] != " ") {
                for (let j = 0; j < alfabeto.length; j++) {
                    if (text[i] == alfabeto[j]) {
                        if (anchor > c.length - 1) {
                            anchor = 0;
                        }
                        let pos = ((j + c[anchor]) % 26);
                        anchor += 1;
                        res = alfabeto[pos];
                        resultado += res;
                    }
                }
            } else {
                res = " ";
                resultado += res;
            }
        }
    }
    console.log(resultado);
    mostrarnaTela(resultado);
    event.preventDefault();
}

descriptografar = () => {
    verificarChave();
    let text = retirarAcento(capturarElemento('.texto').value.toLowerCase());
    let res = "", resultado = "";
    let c = preencherChave();
    let anchor = 0;
    for (let i = 0; i < text.length; i++) {

        for (let k = 0; k < numsim.length; k++) {
            if (text[i] === numsim.charAt(k)) {
                resultado += numsim.charAt(k)
            }
        }

        if (i <= text.length) {
            if (text[i] != " ") {
                for (let j = 0; j < alfabeto.length; j++) {
                    if (text[i] == alfabeto[j]) {
                        if (anchor > c.length - 1) {
                            anchor = 0;
                        }
                        let pos = (((j - c[anchor]) + alfabeto.length) % 26);
                        anchor += 1;
                        res = alfabeto[pos];
                        resultado += res;
                    }
                }
            } else {
                res = " ";
                resultado += res;
            }
        }
    }
    console.log(resultado);
    mostrarnaTela(resultado);
    event.preventDefault();
}

mostrarnaTela = (resultado) => {
    let p = document.createElement('p')
    let conteudo = document.createTextNode(resultado)
    p.appendChild(conteudo)
    p.className = ('textCript')
    capturarElemento('.res').appendChild(p)
}