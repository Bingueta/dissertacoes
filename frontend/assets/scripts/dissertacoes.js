// Pessoas simuladas (futuramente virá da API)
const pessoas = [
	{ id: 1, nome: "Maria Silva" },
	{ id: 2, nome: "João Souza" },
	{ id: 3, nome: "Ana Costa" },
];

// Palavras-chave simuladas (normalmente viriam da API)
const palavrasChaves = [
	"Educação", "Tecnologia", "Saúde", "Meio Ambiente", "Política",
	"História", "Economia", "Sociologia", "Matemática", "Direito"
];

let palavrasSelecionadas = [];

// Preenche selects de pessoas
function carregarPessoas() {
	const autor = document.getElementById("autor");
	const orientador = document.getElementById("orientador");
	const coorientador = document.getElementById("coorientador");

	pessoas.forEach(p => {
		const opt1 = new Option(p.nome, p.id);
		const opt2 = new Option(p.nome, p.id);
		const opt3 = new Option(p.nome, p.id);

		autor.add(opt1);
		orientador.add(opt2);
		coorientador.add(opt3);
	});
}

// Controle do coorientador
document.getElementById("semCoorientador").addEventListener("change", function () {
	const coorientador = document.getElementById("coorientador");
	coorientador.disabled = this.checked;
});

// Busca de palavras-chave
document.getElementById("buscaPalavra").addEventListener("input", function () {
	const termo = this.value.toLowerCase();
	const sugestoesDiv = document.getElementById("sugestoes");
	sugestoesDiv.innerHTML = "";

	if (termo.length > 0) {
		const filtradas = palavrasChaves.filter(p => p.toLowerCase().includes(termo));
		filtradas.forEach(p => {
			const div = document.createElement("div");
			div.classList.add("sugestao");
			div.textContent = p;
			div.onclick = () => selecionarPalavra(p);
			sugestoesDiv.appendChild(div);
		});
	}
});

function selecionarPalavra(palavra) {
	if (!palavrasSelecionadas.includes(palavra)) {
		palavrasSelecionadas.push(palavra);
		renderPalavrasSelecionadas();
	}
}

function removerPalavra(palavra) {
	palavrasSelecionadas = palavrasSelecionadas.filter(p => p !== palavra);
	renderPalavrasSelecionadas();
}

function renderPalavrasSelecionadas() {
	const container = document.getElementById("palavrasSelecionadas");
	container.innerHTML = "";
	palavrasSelecionadas.forEach(p => {
		const tag = document.createElement("span");
		tag.classList.add("tag");
		tag.innerHTML = `${p} <button onclick="removerPalavra('${p}')">x</button>`;
		container.appendChild(tag);
	});
}


const metodologias = ["Estudo de Caso", "Pesquisa de Campo", "Entrevistas", "Análise Documental", "Survey"];
const tematicas = ["Educação", "Saúde Pública", "Tecnologia da Informação", "Meio Ambiente", "Gestão Pública"];

let metodologiasSelecionadas = [];
let tematicasSelecionadas = [];

// Funções genéricas de busca + seleção múltipla
function setupBusca(inputId, sugestoesId, lista, selecionados, renderFunc) {
	document.getElementById(inputId).addEventListener("input", function () {
		const termo = this.value.toLowerCase();
		const sugestoesDiv = document.getElementById(sugestoesId);
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
				};
				sugestoesDiv.appendChild(div);
			});
		}
	});
}

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

// Renderizadores
function renderMetodologias() {
	renderTags("metodologiasSelecionadas", metodologiasSelecionadas, "removerMetodologia");
}
function renderTematicas() {
	renderTags("tematicasSelecionadas", tematicasSelecionadas, "removerTematica");
}

// Remoção
function removerMetodologia(item) {
	metodologiasSelecionadas = metodologiasSelecionadas.filter(m => m !== item);
	renderMetodologias();
}
function removerTematica(item) {
	tematicasSelecionadas = tematicasSelecionadas.filter(t => t !== item);
	renderTematicas();
}

// Inicialização da busca
setupBusca("buscaMetodologia", "sugestoesMetodologia", metodologias, metodologiasSelecionadas, renderMetodologias);
setupBusca("buscaTematica", "sugestoesTematica", tematicas, tematicasSelecionadas, renderTematicas);
// Inicialização
carregarPessoas();
