const procurarForm = document.getElementById('procurarForm');
procurarForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    await realizarPesquisa();
  } catch (error) {
    exibirErro('Ocorreu um erro ao realizar a pesquisa. Por favor, tente novamente mais tarde.');
  }
});

async function realizarPesquisa() {
  const genero = document.getElementById('genderInput').value;
  const nacionalidade = document.getElementById('nationalityInput').value;

  let apiUsuarios = 'https://randomuser.me/api/?results=1';

  if (genero) {
    apiUsuarios += `&gender=${genero}`;
  }

  if (nacionalidade) {
    apiUsuarios += `&nat=${nacionalidade}`;
  }

    const response = await fetch(apiUsuarios);
    if (!response.ok) {
      throw new Error('Erro na requisição da API de usuários');
    }
    const data = await response.json();
    const usuario = data.results[0];

    usuario.email = usuario.email.replace(/@example\.com$/, '@gmail.com');

    await exibirUsuario(usuario);
}

async function exibirUsuario(usuario) {
  const containerResultados = document.getElementById('results');
  containerResultados.innerHTML = '';


  try {
    let apiFrases = 'https://api.adviceslip.com/advice';
    const adviceResponse = await fetch(apiFrases);
    if (!adviceResponse.ok) {
      throw new Error('Erro na requisição da API de frases');
    }
    const adviceData = await adviceResponse.json();
    const biografia = adviceData.slip.advice;
    const cardUsuario = `
      <div class="card mb-3 bg-primary text-white">
        <div class="row g-0">
          <div class="col-md-4 text-center bg-orange">
            <img src="${usuario.picture.medium}" alt="Foto do usuário" class="img-fluid rounded-circle mt-3" style="width: 120px; height: 120px;">
            <h5 class="card-title mt-3">${usuario.name.first} ${usuario.name.last}</h5>
            <p class="card-text font-weight-bold">${new Date(usuario.dob.date).toLocaleDateString()}</p>
            <p class="card-text">Sexo: ${usuario.gender}</p>
            <p class="card-text">Biografia: ${biografia}</p>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <p class="card-text">Email: ${usuario.email}</p>
              <p class="card-text">Telefone: ${usuario.phone}</p>
              <p class="card-text">Cidade: ${usuario.location.city}</p>
              <p class="card-text">Estado: ${usuario.location.state}</p>
              <p class="card-text">País: ${usuario.location.country}</p>
              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" class="btn btn-danger btn_passar">Passar</button>
                <button type="button" class="btn btn-success btn_gostei">Gostei</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    containerResultados.innerHTML = cardUsuario;

    const botaoPassar = document.querySelector('.btn_passar');
    const botaoGostei = document.querySelector('.btn_gostei');

    botaoPassar.addEventListener('click', async () => {
      try {
        await realizarPesquisa();
      } catch (error) {
        exibirErro('Ocorreu um erro ao realizar a pesquisa. Por favor, tente novamente mais tarde.');
      }
    });

    botaoGostei.addEventListener('click', async () => {
      try {
        await realizarPesquisa();
      } catch (error) {
        exibirErro('Ocorreu um erro ao realizar a pesquisa. Por favor, tente novamente mais tarde.');
      }
    });
  } catch (error) {
    exibirErro('Ocorreu um erro ao exibir o usuário. Por favor, tente novamente mais tarde.');
  }
}

function exibirMensagem(mensagem) {
  const containerResultados = document.getElementById('results');
  containerResultados.innerHTML = `<p class="text-center">${mensagem}</p>`;
}

function exibirErro(erro) {
  const containerResultados = document.getElementById('results');
  containerResultados.innerHTML = `<p class="text-center text-danger">${erro}</p>`;
}