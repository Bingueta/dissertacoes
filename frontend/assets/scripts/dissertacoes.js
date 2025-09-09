const apiBaseUrl = "http://127.0.0.1:8000/api";


let palavrasSelecionadas = [];
let metodologiasSelecionadas = [];
let tematicasSelecionadas = [];

let todasAsPalavras = [];
let todasAsMetodologias = [];
let todasAsTematicas = [];


function renderTags(containerId, selecionados, removerFunc) {
	const container = document.getElementById(containerId);
	container.innerHTML = "";
	selecionados.forEach(item => {
		const tag = document.createElement("span");
		tag.classList.add("tag");
		// Nota: aspas simples em '${item.id}' tornam o código mais robusto
		tag.innerHTML = `${item.nome} <button onclick="${removerFunc}('${item.id}')">x</button>`;
		container.appendChild(tag);
	});
}

function renderPalavras() { renderTags("palavrasSelecionadas", palavrasSelecionadas, "removerPalavra"); }
function renderMetodologias() { renderTags("metodologiasSelecionadas", metodologiasSelecionadas, "removerMetodologia"); }
function renderTematicas() { renderTags("tematicasSelecionadas", tematicasSelecionadas, "removerTematica"); }

function removerPalavra(id) {
	// Encontra o índice (a posição) do item na lista
	const index = palavrasSelecionadas.findIndex(p => p.id == id);

	// Se encontrou (index > -1), remove 1 item daquela posição
	if (index > -1) {
		palavrasSelecionadas.splice(index, 1);
	}
	renderPalavras();
}

function removerMetodologia(id) {
	const index = metodologiasSelecionadas.findIndex(m => m.id == id);
	if (index > -1) {
		metodologiasSelecionadas.splice(index, 1);
	}
	renderMetodologias();
}

function removerTematica(id) {
	const index = tematicasSelecionadas.findIndex(t => t.id == id);
	if (index > -1) {
		tematicasSelecionadas.splice(index, 1);
	}
	renderTematicas();
}




function setupBusca(inputId, sugestoesId, listaCompleta, selecionados, renderFunc) {
	const input = document.getElementById(inputId);
	const sugestoesDiv = document.getElementById(sugestoesId);

	// Remove event listeners antigos
	input.oninput = null;

	input.addEventListener("input", function () {
		const termo = this.value.toLowerCase();
		sugestoesDiv.innerHTML = "";
		if (termo.length === 0) return;

		const idsSelecionados = selecionados.map(s => s.id);
		const filtradas = listaCompleta.filter(item =>
			!idsSelecionados.includes(item.id) && item.nome.toLowerCase().includes(termo)
		);

		filtradas.forEach(item => {
			const div = document.createElement("div");
			div.classList.add("sugestao");
			div.textContent = item.nome;
			div.onclick = () => {
				selecionados.push({ id: item.id, nome: item.nome });
				renderFunc();
				input.value = "";
				sugestoesDiv.innerHTML = "";
			};
			sugestoesDiv.appendChild(div);
		});
	});
}



async function carregarListas() {
	try {
		const [palavrasRes, metodologiasRes, tematicasRes] = await Promise.all([
			fetch(`${apiBaseUrl}/palavras-chave`),
			fetch(`${apiBaseUrl}/metodologias`),
			fetch(`${apiBaseUrl}/tematicas`)
		]);

		const palavrasJson = await palavrasRes.json();
		todasAsPalavras = palavrasJson.map(p => ({ id: p.id_palavra_chave, nome: p.palavra_chave }));

		const metodologiasJson = await metodologiasRes.json();
		todasAsMetodologias = metodologiasJson.map(m => ({ id: m.id_metodologia, nome: m.metodologia }));

		const tematicasJson = await tematicasRes.json();
		todasAsTematicas = tematicasJson.map(t => ({ id: t.id_tematica, nome: t.tematica }));

	} catch (err) {
		console.error("Erro ao carregar listas:", err);
	}
}

async function carregarPessoas() {
	try {
		const res = await fetch(`${apiBaseUrl}/pessoas`);
		const pessoas = await res.json(); // [{id_pessoa, nome_pessoa}, ...]

		const autor = document.getElementById("autor");
		const orientador = document.getElementById("orientador");
		const coorientador = document.getElementById("coorientador");

		pessoas.forEach(p => {
			const option = new Option(p.nome_pessoa, p.id_pessoa);
			autor.add(option.cloneNode(true));
			orientador.add(option.cloneNode(true));
			coorientador.add(option.cloneNode(true));
		});
	} catch (err) {
		console.error("Erro ao carregar pessoas:", err);
	}
}

async function editarDissertacao(id) {
	try {
		// Limpa o formulário e os arrays de tags antes de preencher
		document.getElementById('formDissertacao').reset();
		palavrasSelecionadas = [];
		metodologiasSelecionadas = [];
		tematicasSelecionadas = [];
		renderPalavras();
		renderMetodologias();
		renderTematicas();

		const response = await fetch(`${apiBaseUrl}/obras/${id}`);
		if (!response.ok) throw new Error("Erro ao buscar dissertação");
		const d = await response.json();

		document.getElementById('form-titulo').textContent = 'Editar Dissertação';

		// Preenche os campos principais
		document.getElementById("titulo").value = d.titulo || "";
		document.getElementById("linkPdf").value = d.link_pdf || "";
		document.getElementById("ano").value = d.ano || "";
		document.getElementById("autor").value = d.autor?.id_pessoa || "";
		document.getElementById("orientador").value = d.orientador?.id_pessoa || "";

		if (d.coorientador) {
			document.getElementById("coorientador").value = d.coorientador.id_pessoa;
			document.getElementById("semCoorientador").checked = false;
		} else {
			document.getElementById("coorientador").value = "";
			document.getElementById("semCoorientador").checked = true;
		}
		document.getElementById("semCoorientador").dispatchEvent(new Event('change'));

		// Preenche as Palavras-chave
		palavrasSelecionadas = d.palavras_chave ? d.palavras_chave.map(p => ({ id: p.id_palavra_chave, nome: p.palavra_chave })) : [];
		renderPalavras();

		// Preenche as Metodologias
		metodologiasSelecionadas = d.metodologias ? d.metodologias.map(m => ({ id: m.id_metodologia, nome: m.metodologia })) : [];
		renderMetodologias();

		// Preenche as Temáticas
		tematicasSelecionadas = d.tematicas ? d.tematicas.map(t => ({ id: t.id_tematica, nome: t.tematica })) : [];
		renderTematicas();

		// Configura a busca para o modo de edição
		setupBusca("buscaPalavra", "sugestoesPalavra", todasAsPalavras, palavrasSelecionadas, renderPalavras);
		setupBusca("buscaMetodologia", "sugestoesMetodologia", todasAsMetodologias, metodologiasSelecionadas, renderMetodologias);
		setupBusca("buscaTematica", "sugestoesTematica", todasAsTematicas, tematicasSelecionadas, renderTematicas);

		// Mostra o formulário preenchido
		mostrarView('view-formulario');

	} catch (error) {
		console.error("Erro ao carregar dissertação para edição:", error);
	}
}

async function carregarDissertacoes() {
	try {
		const resposta = await fetch(`${apiBaseUrl}/obras`);
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
			<button onclick="editarDissertacao(${d.id_obra})">Editar</button>
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

document.getElementById("semCoorientador").addEventListener("change", function () {
	const coorientador = document.getElementById("coorientador");
	coorientador.disabled = this.checked;
});



//navbar provisória
const navbarHTML = `
<nav id="navbar">
    <div id="logo">
		<img src="../assets/images/obit-branco-semfundo.webp" alt="OBIT Logo" />
	</div>
    <div id="nav-links">
        <a href="#">Opções</a>
    </div>
</nav>
`;

document.body.insertAdjacentHTML('afterbegin', navbarHTML);

function mostrarView(viewId) {
	document.getElementById('view-lista').style.display = 'none';
	document.getElementById('view-formulario').style.display = 'none';

	document.getElementById(viewId).style.display = 'block';
}

document.addEventListener("DOMContentLoaded", async () => {
	// --- CONFIGURAÇÃO INICIAL ---
	const btnNova = document.getElementById('btn-nova-dissertacao');
	const btnCancelar = document.getElementById('btn-cancelar');

	// Carrega os dados da tabela e as opções dos selects do formulário
	await Promise.all([
		carregarDissertacoes(),
		carregarPessoas(),
		carregarListas()
	]);

	// Mostra a lista por padrão
	mostrarView('view-lista');

	// --- EVENTOS DE CLICK ---

	// Botão "Cadastrar Nova Dissertação"
	btnNova.addEventListener('click', () => {
		// Limpa o formulário para um novo cadastro
		document.getElementById('formDissertacao').reset();
		palavrasSelecionadas = []; // Limpa arrays de tags
		renderPalavras(); // Atualiza a tela
		// (limpe os outros arrays de tags também)

		document.getElementById('form-titulo').textContent = 'Cadastrar Nova Dissertação';

		// Configura a busca para o modo de cadastro
		setupBusca("buscaPalavra", "sugestoesPalavra", todasAsPalavras, palavrasSelecionadas, renderPalavras);
		// (configure as outras buscas também)

		mostrarView('view-formulario');
	});

	// Botão "Cancelar" do formulário
	btnCancelar.addEventListener('click', () => {
		mostrarView('view-lista');
	});
});

