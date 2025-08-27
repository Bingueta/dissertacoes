// Referências
const modal = document.getElementById("modal");
const fechar = document.getElementById("fecharModal");
const form = document.getElementById("modalForm");
const titulo = document.getElementById("modalTitulo");

// Estrutura dos campos de cada modal
const formularios = {
  palavra: {
    titulo: "Cadastrar Palavra-chave",
    campos: [
      { id: "palavra", label: "Palavra-chave", type: "text", placeholder: "Digite a palavra" }
    ]
  },
  pessoa: {
    titulo: "Cadastrar Pessoa",
    campos: [
      { id: "nomeCompleto", label: "Nome Completo", type: "text", placeholder: "Digite o nome completo" }
    ]
  },
  metodologia: {
    titulo: "Cadastrar Metodologia",
    campos: [
      { id: "metodologia", label: "Metodologia", type: "text", placeholder: "Digite a metodologia" }
    ]
  },
  tematica: {
    titulo: "Cadastrar Temática",
    campos: [
      { id: "tematica", label: "Temática", type: "text", placeholder: "Digite a temática" }
    ]
  },
  pais: {
    titulo: "Cadastrar País",
    campos: [
      { id: "pais", label: "País", type: "text", placeholder: "Ex: Brasil" },
      { id: "coordenadasPais", label: "Coordenadas", type: "text", placeholder: "-15.7801, -47.9292" }
    ]
  },
  estado: {
    titulo: "Cadastrar Estado",
    campos: [
      { id: "estado", label: "Estado", type: "text", placeholder: "Ex: Minas Gerais" },
      { id: "coordenadasEstado", label: "Coordenadas", type: "text", placeholder: "-19.9167, -43.9345" }
    ]
  },
  cidade: {
    titulo: "Cadastrar Cidade",
    campos: [
      { id: "cidade", label: "Cidade", type: "text", placeholder: "Ex: Governador Valadares" },
      { id: "coordenadasCidade", label: "Coordenadas", type: "text", placeholder: "-18.8545, -41.9555" }
    ]
  },
  local: {
    titulo: "Cadastrar Local Específico",
    campos: [
      { id: "local", label: "Local", type: "text", placeholder: "Ex: Praça Central" },
      { id: "coordenadasLocal", label: "Coordenadas", type: "text", placeholder: "-18.8545, -41.9555" }
    ]
  }
};

// Abrir modal
document.querySelectorAll(".abrirModal").forEach(botao => {
  botao.addEventListener("click", () => {
    const tipo = botao.dataset.modal;
    abrirModal(tipo);
  });
});

function abrirModal(tipo) {
  const config = formularios[tipo];

  titulo.innerText = config.titulo;
  form.innerHTML = ""; // limpa o formulário

  config.campos.forEach(campo => {
    const label = document.createElement("label");
    label.setAttribute("for", campo.id);
    label.innerText = campo.label;

    const input = document.createElement("input");
    input.type = campo.type;
    input.id = campo.id;
    input.placeholder = campo.placeholder;
    input.required = true;

    form.appendChild(label);
    form.appendChild(input);
  });

  // botão de salvar
  const botaoSalvar = document.createElement("button");
  botaoSalvar.type = "submit";
  botaoSalvar.innerText = "Salvar";
  botaoSalvar.classList.add("btn");
  form.appendChild(botaoSalvar);

  modal.style.display = "block";
}

// Fechar modal
fechar.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => { if (e.target == modal) modal.style.display = "none"; });

// Submissão
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const dados = {};
  [...form.querySelectorAll("input")].forEach(input => {
    dados[input.id] = input.value;
  });

  console.log("Salvando:", dados);

  // aqui futuramente você envia para Laravel via axios
  modal.style.display = "none";
});