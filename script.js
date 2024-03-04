const form = document.getElementById("storyBrandForm");
const sendBtn = document.querySelector(".input-btn");
const responseContainer = document.querySelector(".response-gpt");

let API_URL = "https://api.openai.com/v1/chat/completions";
let API_KEY = "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"; // API

sendBtn.onclick = function(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const formValues = {};
  for (const [name, value] of formData) {
    formValues[name] = value;
  }

  const userInstructions = "Crie uma história seguindo o modelo do livro StoryBrand, de Donald Miller. Evite jargões genéricos de histórias, como era uma vez e outras generalidades de contos.";
  const userTypedMessage = `${userInstructions} ${Object.values(formValues).join(' ')}`;

  if (userTypedMessage.length > 0) {
    responseContainer.innerHTML = `<span>Carregando...</span>`;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        "model": "gpt-4-0125-preview", // Modelo
        "messages": [{"role": "user", "content": userTypedMessage}],
      })
    }

    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
      let formattedResponse = data.choices[0].message.content
        .split('\n')
        .map(paragraph => `<p>${paragraph}</p>`)
        .join('');

      responseContainer.innerHTML = formattedResponse;
    })
    .catch((error) => {
      responseContainer.innerHTML = `<span class="danger">Oops! Ocorreu um erro. Por favor, tente novamente.</span>`;
    });
  }
}




document.addEventListener('DOMContentLoaded', function() {
  let currentStep = 1;
  const totalSteps = 7;

  function showStep(step) {
      // Oculta todas as etapas e mostra apenas a etapa atual
      for (let i = 1; i <= totalSteps; i++) {
          document.getElementById('step' + i).style.display = 'none';
      }
      document.getElementById('step' + step).style.display = 'block';

      // Oculta ou mostra o botão de enviar dependendo da etapa atual
      const submitButton = document.querySelector('#storyBrandForm .input-btn');
      const nextButton = document.querySelector('#storyBrandForm button[onclick="nextStep()"]');
      const previousButton = document.querySelector('#storyBrandForm button[onclick="previousStep()"]'); // Seleciona o botão "Anterior"

      if (step === totalSteps) {
          submitButton.style.display = 'inline-block'; // Mostra o botão na última etapa
          nextButton.style.display = 'none'; // Oculta o botão "Próximo" na última etapa
      } else {
          submitButton.style.display = 'none'; // Oculta o botão nas outras etapas
          nextButton.style.display = 'inline-block'; // Mostra o botão "Próximo" nas etapas anteriores
      }

      // Altera a visibilidade do botão "Anterior" na primeira etapa e mostra nas demais
      if (step === 1) {
          previousButton.style.visibility = 'hidden'; // Torna o botão "Anterior" invisível mas ainda ocupa espaço
      } else {
          previousButton.style.visibility = 'visible'; // Torna o botão "Anterior" visível
      }
  }

  function nextStep() {
      // Verifica se o campo da etapa atual está preenchido antes de avançar
      const currentTextarea = document.querySelector('#step' + currentStep + ' .input-history');
      if (currentTextarea.checkValidity()) {
          if (currentStep < totalSteps) {
              currentStep++;
              showStep(currentStep);
          }
      } else {
          // Se o campo não estiver válido, exibe um aviso ou força a validação do formulário
          currentTextarea.reportValidity();
      }
  }

  function previousStep() {
      if (currentStep > 1) {
          currentStep--;
          showStep(currentStep);
      }
  }

  // Adiciona os manipuladores de evento aos botões "Próximo" e "Anterior"
  document.querySelector('#storyBrandForm button[onclick="nextStep()"]').addEventListener('click', nextStep);
  document.querySelector('#storyBrandForm button[onclick="previousStep()"]').addEventListener('click', previousStep);

  // Inicializa o formulário mostrando o primeiro passo
  showStep(currentStep);
});



document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.btn-play-pause').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const audioPlayer = btn.closest('.audio-player').querySelector('.meuAudio');

      if (audioPlayer.paused) {
          audioPlayer.play();
          btn.innerHTML = '<img src="svg/pause.svg" class="playPauseIcon"> Pause'; // Atualiza diretamente o HTML do botão
      } else {
          audioPlayer.pause();
          btn.innerHTML = '<img src="svg/play.svg" class="playPauseIcon"> Play'; // Atualiza diretamente o HTML do botão
      }
    });
  });
});





document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('copyButton').addEventListener('click', () => {
    const text = document.getElementById('textToCopy').innerText;
    if (!text) {
      alert('Erro: Não há texto para copiar.');
      return;
    }

    navigator.clipboard.writeText(text)
      .then(() => alert('Texto copiado com sucesso!'))
      .catch(error => alert('Erro ao copiar texto: ' + error));
  });
});


