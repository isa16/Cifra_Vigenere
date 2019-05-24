const alfabeto = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

//criptografia
document.getElementsByClassName('botao')[0].addEventListener('click', () => {
    let text = (removeAcento(capturaInput(0)))
    let key = retornaVetorPosicoes(removeAcento(capturaInput(1)))
    let anchor = 0
    let retorno = ""

    for (let i = 0; i < text.length; i++) {
        console.log(text[i]);
        
        if (text[i] == " ") {
            retorno += text[i]
        }
        else {
            if (anchor > key.length) {
                anchor = 0
                retorno += cifraLetra(returnP(text[i]), key[anchor])
            } else if (anchor <= key.length) {
                retorno += cifraLetra(returnP(text[i]), key[anchor])
            } else { }
            anchor++
        }
    }

    document.getElementsByClassName('retorno').innerHTML = retorno
})

//Descriptografia
document.getElementsByClassName('botao')[1].addEventListener('click', () => {
    let text = capturaInput(0)
    let key = retornaVetorPosicoes(removeAcento(capturaInput(1)))
    let anchor = 0
    let retorno = ""

    for (let i = 0; i < text.length; i++) {
        if (text[i] == " ") {
            retorno += text[i]
        } else {
            if (anchor > key.length) {
                anchor = 0
                retorno += descifraLetra(returnP(text[i]), key[anchor])
            } else if (anchor <= key.length) {
                retorno += descifraLetra(returnP(text[i]), key[anchor])
            } else { }
            anchor++
        }
    }

    document.getElementsByClassName('retorno').innerHTML = retorno
})


//Capturar valor da input desejada
const capturaInput = (posicao) => {
    let valor = document.getElementsByTagName('input')[posicao].value
    if (valor != "") {
        return valor.toUpperCase()
    } else {
        alert('Valor Nulo!')
    }
}

//Cifra Letra
const cifraLetra = (Posicaoletra, valor) => {
    return alfabeto[(Posicaoletra + valor) % alfabeto.length]
}

//Descifra Letra
const descifraLetra = (Posicaoletra, valor) => {
    return alfabeto[((Posicaoletra - valor) + alfabeto.length) % alfabeto.length]
}

//Retorna o posição da letra no alfabeto.
const returnP = (letra) => {
    for (let i = 0; i < alfabeto.length; i++) {
        if (alfabeto[i] == letra) {
            return i
        }
    }
}


//Define as posições das letras das chaves
const retornaVetorPosicoes = (work) => {
    let vetor = []
    for (let i = 0; i < work.length; i++) {
        vetor.push(returnP(work[i]))
    }
    return vetor

}

const removeAcento = (letraAcento) => {
    let string = letraAcento.toLowerCase();
	var mapaAcentosHex 	= {
		a : /[\xE0-\xE6]/g,
		e : /[\xE8-\xEB]/g,
		i : /[\xEC-\xEF]/g,
		o : /[\xF2-\xF6]/g,
		u : /[\xF9-\xFC]/g,
		c : /\xE7/g,
		n : /\xF1/g
	};

	for ( var letra in mapaAcentosHex ) {
		var expressaoRegular = mapaAcentosHex[letra];
		string = string.replace( expressaoRegular, letra );
	}

	return string.toUpperCase();

}

