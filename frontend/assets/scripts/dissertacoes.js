// Pessoas simuladas (futuramente virá da API)
const pessoas = [
	{ id: 1, nome: "Maria Silva" },
	{ id: 2, nome: "João Souza" },
	{ id: 3, nome: "Ana Costa" },
];

// Palavras-chave simuladas (normalmente viriam da API)


let palavrasSelecionadas = [];
let metodologiasSelecionadas = [];
let tematicasSelecionadas = [];

// --- Preenche selects de pessoas
function carregarPessoas() {
	const autor = document.getElementById("autor");
	const orientador = document.getElementById("orientador");
	const coorientador = document.getElementById("coorientador");

	pessoas.forEach(p => {
		autor.add(new Option(p.nome, p.id));
		orientador.add(new Option(p.nome, p.id));
		coorientador.add(new Option(p.nome, p.id));
	});
}

// --- Controle do coorientador
document.getElementById("semCoorientador").addEventListener("change", function () {
	const coorientador = document.getElementById("coorientador");
	coorientador.disabled = this.checked;
});

// --- Função genérica para busca e sugestão
function setupBusca(inputId, sugestoesId, lista, selecionados, renderFunc) {
	const input = document.getElementById(inputId);
	const sugestoesDiv = document.getElementById(sugestoesId);

	input.addEventListener("input", function () {
		const termo = this.value.toLowerCase();
		sugestoesDiv.innerHTML = "";

		if (termo.length > 0) {
			const filtradas = lista.filter(item => item.toLowerCase().includes(termo));
			filtradas.forEach(item => {
				const div = document.createElement("div");
				div.classList.add("sugestao");
				div.textContent = item;
				div.onclick = () => {
					if (!selecionados.includes(item)) {
						selecionados.push(item);
						renderFunc();
					}

					// 🔹 Limpar input e sugestões após selecionar
					input.value = "";
					sugestoesDiv.innerHTML = "";
				};
				sugestoesDiv.appendChild(div);
			});
		}
	});
}


// --- Renderizador de tags (MESMO MODELO para todas)
function renderTags(containerId, selecionados, removerFunc) {
	const container = document.getElementById(containerId);
	container.innerHTML = "";
	selecionados.forEach(item => {
		const tag = document.createElement("span");
		tag.classList.add("tag");
		tag.innerHTML = `${item} <button onclick="${removerFunc}('${item}')">x</button>`;
		container.appendChild(tag);
	});
}

// --- Específicos de cada campo
function renderPalavras() {
	renderTags("palavrasSelecionadas", palavrasSelecionadas, "removerPalavra");
}
function renderMetodologias() {
	renderTags("metodologiasSelecionadas", metodologiasSelecionadas, "removerMetodologia");
}
function renderTematicas() {
	renderTags("tematicasSelecionadas", tematicasSelecionadas, "removerTematica");
}

// --- Remoção
function removerPalavra(item) {
	palavrasSelecionadas = palavrasSelecionadas.filter(p => p !== item);
	renderPalavras();
}
function removerMetodologia(item) {
	metodologiasSelecionadas = metodologiasSelecionadas.filter(m => m !== item);
	renderMetodologias();
}
function removerTematica(item) {
	tematicasSelecionadas = tematicasSelecionadas.filter(t => t !== item);
	renderTematicas();
}

// --- Listas simuladas
const metodologias = ["Estudo de Caso", "Pesquisa de Campo", "Entrevistas", "Análise Documental", "Survey"];
const tematicas = ["Educação", "Saúde Pública", "Tecnologia da Informação", "Meio Ambiente", "Gestão Pública"];
const palavrasChaves = [
	"Educação", "Tecnologia", "Saúde", "Meio Ambiente", "Política",
	"História", "Economia", "Sociologia", "Matemática", "Direito"
];

// --- Inicialização
setupBusca("buscaPalavra", "sugestoesPalavra", palavrasChaves, palavrasSelecionadas, renderPalavras);
setupBusca("buscaMetodologia", "sugestoesMetodologia", metodologias, metodologiasSelecionadas, renderMetodologias);
setupBusca("buscaTematica", "sugestoesTematica", tematicas, tematicasSelecionadas, renderTematicas);

carregarPessoas();

async function carregarDissertacoes() {
	try {
		// 👉 Troque pela URL real da sua API
		const resposta = await fetch("http://127.0.0.1:8000/api/obras");
		const dados = await resposta.json();

		const corpoTabela = document.querySelector("#tabelaDissertacoes tbody");
		corpoTabela.innerHTML = "";

		dados.forEach(d => {
			const linha = document.createElement("tr");

			// Pessoas
			let pessoas = `
        <strong>Autor:</strong> ${d.autor?.nome_pessoa || "—"}<br>
        <strong>Orientador:</strong> ${d.orientador?.nome_pessoa || "—"}<br>
      `;

			if (d.coorientador) {
				pessoas += `<strong>Coorientador:</strong> ${d.coorientador?.nome_pessoa}`;
			} else {
				pessoas += `<strong>Coorientador:</strong> —`;
			}

			linha.innerHTML = `
        <td>${d.titulo}</td>
        <td>${d.ano}</td>
        <td>${pessoas}</td>
        <td>
          <button onclick="verDetalhes(${d.id_obra})">Ver</button>
        </td>
      `;

			corpoTabela.appendChild(linha);
		});
	} catch (erro) {
		console.error("Erro ao carregar dissertações:", erro);
	}
}

// Exemplo de ação
function verDetalhes(id) {
	alert("Detalhes da dissertação ID: " + id);
}

// Carregar ao abrir página
window.onload = carregarDissertacoes;