const inputMensagem = document.getElementById("input__text");
const criptografarButton = document.querySelector(".encrypt")
const descriptografarButton = document.querySelector(".decrypt")
const descriptionText = document.getElementById("description")
const copyText = document.querySelector(".copy")
const tocleanText = document.getElementById("toBeEmpty")

criptografarButton.addEventListener("click", () => {
  const mensagem = inputMensagem.value.trim();

  if (!/^[a-z\s]*$/.test(mensagem) || mensagem == '' || mensagem == null || mensagem == undefined || mensagem == ' ') {
    showNotification('Apenas letras minúsculas e sem acento são permitidas.', 'error');
    return;
}

    const mensagemCriptografada = criptografar(mensagem);
    descriptionText.textContent = mensagemCriptografada;
    copyText.classList.remove("invisible");
    inputMensagem.value = '';
    showNotification('O texto foi criptografado com sucesso!', 'success');
    limparDiv();  
});

descriptografarButton.addEventListener("click", () => {
  const mensagem  = inputMensagem.value.trim();

  if (!/^[a-z\s]*$/.test(mensagem) || mensagem == '' || mensagem == null || mensagem == undefined || mensagem == ' ') {
    showNotification('Apenas letras minúsculas e sem acento são permitidas.', 'error');
    return;
}

    const mensagemDescriptografada = descriptografar(mensagem);
    descriptionText.textContent = mensagemDescriptografada;
    copyText.classList.remove("invisible");
    showNotification('O texto foi descriptografado com sucesso!', 'success');
    limparDiv();  
});

copyText.addEventListener("click", () =>{
  copiarTexto();
});

function limparDiv() {
  tocleanText.innerHTML = '';
}

function criptografar(mensagem) {
  return mensagem.replace(/e/g, "enter")
                 .replace(/i/g, "imes")
                 .replace(/a/g, "ai")
                 .replace(/o/g, "ober")
                 .replace(/u/g, "ufat");
}

function descriptografar(mensagem) {
  return mensagem.replace(/enter/g, "e")
                 .replace(/imes/g, "i")
                 .replace(/ai/g, "a")
                 .replace(/ober/g, "o")
                 .replace(/ufat/g, "u");
}


function copiarTexto() {
  const texto = descriptionText.textContent.trim(); // Corrigido para pegar o texto da descrição
  navigator.clipboard.writeText(texto)
      .then(() => {
          showNotification('O texto foi copiado para a área de transferência!', 'success');
      })
      .catch(err => {
          console.error('Erro ao copiar texto: ', err);
          showNotification('Erro ao copiar texto.', 'error');
      });
}


function showNotification(text, type) {
  const style = type === 'error' ? { background: 'red' } : { background: 'green' };
  Toastify({
      text: text,
      duration: 3000,
      gravity: "top",
      position: "center",
      style: style
  }).showToast();
}