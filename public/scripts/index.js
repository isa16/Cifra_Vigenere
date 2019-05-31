var alfabeto = ["a", "b", "c", "d", "e", "f",
    "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
    "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
]
var key = []

function capElemento(ref) {
    const element = document.querySelector(ref);
    return element;
}

const btnCifrar = capElemento('#cifrar')
btnCifrar.addEventListener('click', () => {
    criptografar(verChave())
})

const btnDecifrar = capElemento('#descifrar')
btnDecifrar.addEventListener('click', () => {
    descriptografar(verChave())
})

function verChave() {
    let k = capElemento('.senha').value;
    if (!k.length) {
        alert('Chave inválida!');
    } else {
        return k
    }
}

newKey = () => {
    let ch = retirarAcento(capElemento('.senha').value.toLowerCase());
    for (let k = 0; k < ch.length; k++) {
        for (let n = 0; n < alfabeto.length; n++) {
            if (alfabeto[n] === ch[k]) {
                key[k] = n
            }
        }
    }
    return key
}

function criptografar() {
    capElemento(".retorno").innerHTML = "<h3>Resultado<h3>"
    let chav = newKey();
    console.log(chav)
    let word = retirarAcento(capElemento('.palavra').value.toLowerCase());
    console.log(word)
    let res = "", retorno = "";
    let anchor = 0;
    for (let i = 0; i < word.length; i++) {
        if (word[i] != " ") {
            for (let c = 0; c < alfabeto.length; c++) {
                if (word[i] == alfabeto[c]) {
                    if (anchor > chav.lenght - 1) {
                        anchor = 0;
                    }
                    let newPos = ((c + chav[anchor]) % 26);

                    anchor += 1;

                    res = alfabeto[newPos];
                    retorno += res;
                }
            }
        } else {
            console.log(retorno)
            res = " ";
            retorno += res;
        }

    }
    retorneHTML(retorno);
    event.preventDefault();
}

function descriptografar() {
    capElemento(".retorno").innerHTML = "<h3>Resultado<h3>"
    let chav = newKey();
    console.log(chav)
    let word = retirarAcento(capElemento('.palavra').value.toLowerCase());
    console.log(word)
    let res = "", retorno = "";
    let anchor = 0;
    for (let i = 0; i < word.length; i++) {
        if (word[i] != " ") {
            for (let c = 0; c < alfabeto.length; c++) {
                if (word[i] == alfabeto[c]) {
                    if (anchor > chav.lenght - 1) {
                        anchor = 0;
                    }
                    let newPos = (((c - chav[anchor]) + alfabeto.length)  % 26);
                    anchor += 1;
                    res = alfabeto[newPos];
                    retorno += res;
                }
            }
        } else {
            console.log(alfabeto.length)
            console.log(retorno)
            res = " ";
            retorno += res;
        }

    }
    retorneHTML(retorno);
    event.preventDefault();
}

function retorneHTML(retorno) {
    let ret = document.createElement("p");
    let conteudo = document.createTextNode(retorno);
    ret.appendChild(conteudo);
    capElemento(".retorno").appendChild(ret);
}

function retirarAcento(word) {
    word = word.toLowerCase();
    word = word.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
    word = word.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
    word = word.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
    word = word.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
    word = word.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
    word = word.replace(new RegExp('[Ç]', 'gi'), 'c');
    return word;
}