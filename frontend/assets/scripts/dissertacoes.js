const apiBaseUrl = "http://127.0.0.1:8000/api";

let palavrasSelecionadas = [], metodologiasSelecionadas = [], tematicasSelecionadas = [], localidadesSelecionadas = [];
let todasAsPalavras = [], todasAsMetologias = [], todasAsTematicas = [], todosOsPaises = [], todosOsEstados = [], todosAsCidades = [], todosOsLocais = [];



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

		localidadesSelecionadas = d.localidades || [];
		renderLocalidades();

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
			// --- LINHA PRINCIPAL (VISÍVEL) ---
			const linhaPrincipal = document.createElement("tr");

			let pessoas = `
                <strong>Autor:</strong> ${d.autor?.nome_pessoa || "—"}<br>
                <strong>Orientador:</strong> ${d.orientador?.nome_pessoa || "—"}<br>
                <strong>Coorientador:</strong> ${d.coorientador?.nome_pessoa || "—"}
            `;

			linhaPrincipal.innerHTML = `
                <td>${d.titulo}</td>
                <td>${d.ano}</td>
                <td>${pessoas}</td>
                <td>
                    <button onclick="toggleDetalhes(${d.id_obra})">Ver</button>
                    <button onclick="editarDissertacao(${d.id_obra})">Editar</button>
                </td>
            `;
			corpoTabela.appendChild(linhaPrincipal);

			// --- LINHA DE DETALHES (ESCONDIDA) ---
			const linhaDetalhes = document.createElement("tr");
			// ID único para conseguirmos encontrá-la depois
			linhaDetalhes.id = `detalhes-${d.id_obra}`;
			linhaDetalhes.className = 'linha-detalhes'; // Classe para estilizar e encontrar
			linhaDetalhes.style.display = 'none'; // Começa escondida

			// Formata as listas de tags para exibição
			const palavras = d.palavras_chave?.map(p => p.palavra_chave).join(', ') || 'Nenhuma';
			const metodologias = d.metodologias?.map(m => m.metodologia).join(', ') || 'Nenhuma';
			const tematicas = d.tematicas?.map(t => t.tematica).join(', ') || 'Nenhuma';
			const localidades = d.localidades?.map(l => `${l.cidade.nome_cidade} - ${l.estado.nome_estado}`).join('; ') || 'Nenhuma';

			// Coluna única que ocupa a largura total da tabela
			linhaDetalhes.innerHTML = `
                <td colspan="4">
                    <div class="conteudo-detalhes">
                        <strong>Link:</strong> <a href="${d.link_pdf}" target="_blank">Acessar PDF</a><br><br>
                        <strong>Palavras-chave:</strong> ${palavras}<br>
                        <strong>Metodologias:</strong> ${metodologias}<br>
                        <strong>Temáticas:</strong> ${tematicas}<br>
                        <strong>Localidades:</strong> ${localidades}
                    </div>
                </td>
            `;
			corpoTabela.appendChild(linhaDetalhes);
		});
	} catch (erro) {
		console.error("Erro ao carregar dissertações:", erro);
	}
}

function toggleDetalhes(id) {
	const linhaDetalhes = document.getElementById(`detalhes-${id}`);

	// Verifica se a linha clicada já está visível
	const estaVisivel = linhaDetalhes.style.display === 'table-row';

	// Primeiro, esconde todas as outras linhas de detalhes abertas
	document.querySelectorAll('.linha-detalhes').forEach(linha => {
		linha.style.display = 'none';
	});

	// Se a linha clicada não estava visível, a torna visível
	if (!estaVisivel) {
		linhaDetalhes.style.display = 'table-row';
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


// Adicione esta nova função
async function carregarDadosLocalidades() {
	try {
		const [paisesRes, estadosRes, cidadesRes, locaisRes] = await Promise.all([
			fetch(`${apiBaseUrl}/paises`),
			fetch(`${apiBaseUrl}/estados`),
			fetch(`${apiBaseUrl}/cidades`),
			fetch(`${apiBaseUrl}/locais-especificos`)
		]);

		todosOsPaises = await paisesRes.json();
		todosOsEstados = await estadosRes.json();
		todosAsCidades = await cidadesRes.json();
		todosOsLocais = await locaisRes.json();

		// Preenche o primeiro dropdown (Países)
		const paisSelect = document.getElementById('paisSelect');
		paisSelect.innerHTML = '<option value="">Selecione...</option>';
		todosOsPaises.forEach(p => {
			paisSelect.add(new Option(p.nome_pais, p.id_pais));
		});

	} catch (err) {
		console.error("Erro ao carregar dados de localidades:", err);
	}
}


function renderLocalidades() {
	const container = document.getElementById('localidadesSelecionadas');
	container.innerHTML = "";
	localidadesSelecionadas.forEach(local => {
		const tag = document.createElement("span");
		tag.classList.add("tag");

		// Cria um texto descritivo para a tag
		const texto = `${local.local_especifico.nome_local}, ${local.cidade.nome_cidade}, ${local.estado.nome_estado}`;

		tag.innerHTML = `${texto} <button onclick="removerLocalidade(${local.local_especifico.id_local_especifico})">x</button>`;
		container.appendChild(tag);
	});
}

function removerLocalidade(id) {
	const index = localidadesSelecionadas.findIndex(l => l.local_especifico.id_local_especifico == id);
	if (index > -1) {
		localidadesSelecionadas.splice(index, 1);
	}
	renderLocalidades();
}

// Lógica do botão "Adicionar Localidade"
document.getElementById('btnAddLocalidade').addEventListener('click', () => {
	const localId = localEspecificoSelect.value;
	if (!localId) {
		alert("Por favor, selecione até o Local Específico.");
		return;
	}

	// Evita duplicados
	if (localidadesSelecionadas.some(l => l.local_especifico.id_local_especifico == localId)) {
		alert("Esta localidade já foi adicionada.");
		return;
	}

	// Encontra os objetos completos para criar a estrutura do JSON
	const localObj = todosOsLocais.find(l => l.id_local_especifico == localId);
	const cidadeObj = todosAsCidades.find(c => c.id_cidade == cidadeSelect.value);
	const estadoObj = todosOsEstados.find(e => e.id_estado == estadoSelect.value);
	const paisObj = todosOsPaises.find(p => p.id_pais == paisSelect.value);

	// Cria o objeto no formato esperado pela API
	const novaLocalidade = {
		local_especifico: { id_local_especifico: localObj.id_local_especifico, nome_local: localObj.nome_local },
		cidade: { id_cidade: cidadeObj.id_cidade, nome_cidade: cidadeObj.nome_cidade },
		estado: { id_estado: estadoObj.id_estado, nome_estado: estadoObj.nome_estado },
		pais: { id_pais: paisObj.id_pais, nome_pais: paisObj.nome_pais }
	};

	localidadesSelecionadas.push(novaLocalidade);
	renderLocalidades();

	// Reseta os dropdowns
	paisSelect.value = "";
	paisSelect.dispatchEvent(new Event('change'));
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

	// --- INSERIR NAVBAR ---
	const navbarHTML = `...`; // Seu HTML da navbar
	document.body.insertAdjacentHTML('afterbegin', navbarHTML);

	// --- ELEMENTOS PRINCIPAIS ---
	const btnNova = document.getElementById('btn-nova-dissertacao');
	const btnCancelar = document.getElementById('btn-cancelar');
	const checkSemCoorientador = document.getElementById("semCoorientador");

	// --- CONFIGURAÇÃO DOS DROPDOWNS DE LOCALIDADE (MOVEMOS PARA CÁ) ---
	const paisSelect = document.getElementById('paisSelect');
	const estadoSelect = document.getElementById('estadoSelect');
	const cidadeSelect = document.getElementById('cidadeSelect');
	const localEspecificoSelect = document.getElementById('localEspecificoSelect');
	const btnAddLocalidade = document.getElementById('btnAddLocalidade');

	// Evento quando um PAÍS é selecionado
	paisSelect.addEventListener('change', () => {
		const paisId = paisSelect.value;

		console.log("--- Debug do Dropdown de Estado ---");
		console.log("País selecionado (ID):", paisId);
		console.log("Procurando estados na lista completa:", todosOsEstados); // Mostra a lista completa de estados

		estadoSelect.innerHTML = '<option value="">Selecione...</option>';
		cidadeSelect.innerHTML = '<option value="">Selecione...</option>';
		localEspecificoSelect.innerHTML = '<option value="">Selecione...</option>';
		estadoSelect.disabled = true;
		cidadeSelect.disabled = true;
		localEspecificoSelect.disabled = true;

		if (paisId) {
			// A linha crítica é esta:
			const estadosFiltrados = todosOsEstados.filter(e => e.id_pais == paisId);

			console.log("Resultado do filtro (estados encontrados):", estadosFiltrados); // Mostra o que o filtro encontrou

			estadosFiltrados.forEach(e => {
				estadoSelect.add(new Option(e.nome_estado, e.id_estado));
			});
			estadoSelect.disabled = false;
		}
		console.log("-----------------------------------");
	});

	// Evento quando um ESTADO é selecionado
	estadoSelect.addEventListener('change', () => {
		const estadoId = estadoSelect.value;
		cidadeSelect.innerHTML = '<option value="">Selecione...</option>';
		localEspecificoSelect.innerHTML = '<option value="">Selecione...</option>';
		cidadeSelect.disabled = true;
		localEspecificoSelect.disabled = true;
		if (estadoId) {
			const cidadesFiltradas = todosAsCidades.filter(c => c.id_estado == estadoId);
			cidadesFiltradas.forEach(c => cidadeSelect.add(new Option(c.nome_cidade, c.id_cidade)));
			cidadeSelect.disabled = false;
		}
	});

	// Evento quando uma CIDADE é selecionada
	cidadeSelect.addEventListener('change', () => {
		const cidadeId = cidadeSelect.value;
		localEspecificoSelect.innerHTML = '<option value="">Selecione...</option>';
		localEspecificoSelect.disabled = true;
		if (cidadeId) {
			const locaisFiltrados = todosOsLocais.filter(l => l.id_cidade == cidadeId);
			locaisFiltrados.forEach(l => localEspecificoSelect.add(new Option(l.nome_local, l.id_local_especifico)));
			localEspecificoSelect.disabled = false;
		}
	});

	// Lógica do botão "Adicionar Localidade"
	btnAddLocalidade.addEventListener('click', () => {
		const localId = localEspecificoSelect.value;
		if (!localId) {
			alert("Por favor, selecione até o Local Específico.");
			return;
		}
		if (localidadesSelecionadas.some(l => l.local_especifico.id_local_especifico == localId)) {
			alert("Esta localidade já foi adicionada.");
			return;
		}
		const localObj = todosOsLocais.find(l => l.id_local_especifico == localId);
		const cidadeObj = todosAsCidades.find(c => c.id_cidade == cidadeSelect.value);
		const estadoObj = todosOsEstados.find(e => e.id_estado == estadoSelect.value);
		const paisObj = todosOsPaises.find(p => p.id_pais == paisSelect.value);
		const novaLocalidade = {
			local_especifico: { id_local_especifico: localObj.id_local_especifico, nome_local: localObj.nome_local },
			cidade: { id_cidade: cidadeObj.id_cidade, nome_cidade: cidadeObj.nome_cidade },
			estado: { id_estado: estadoObj.id_estado, nome_estado: estadoObj.nome_estado },
			pais: { id_pais: paisObj.id_pais, nome_pais: paisObj.nome_pais }
		};
		localidadesSelecionadas.push(novaLocalidade);
		renderLocalidades();
		paisSelect.value = "";
		paisSelect.dispatchEvent(new Event('change'));
	});

	// --- CARREGAMENTO INICIAL DOS DADOS ---
	await Promise.all([
		carregarDissertacoes(),
		carregarPessoas(),
		carregarListas(),
		carregarDadosLocalidades()
	]);

	// Mostra a lista por padrão
	mostrarView('view-lista');

	// --- EVENTOS DE CLICK GERAIS ---
	checkSemCoorientador.addEventListener("change", function () {
		document.getElementById("coorientador").disabled = this.checked;
	});

	btnNova.addEventListener('click', () => {
		document.getElementById('formDissertacao').reset();

		// Limpa todos os arrays de tags
		palavrasSelecionadas = [];
		metodologiasSelecionadas = [];
		tematicasSelecionadas = [];
		localidadesSelecionadas = [];
		renderPalavras();
		renderMetodologias();
		renderTematicas();
		renderLocalidades();

		// Reseta os dropdowns de localidade
		paisSelect.value = "";
		paisSelect.dispatchEvent(new Event('change'));

		document.getElementById('form-titulo').textContent = 'Cadastrar Nova Dissertação';
		setupBusca("buscaPalavra", "sugestoesPalavra", todasAsPalavras, palavrasSelecionadas, renderPalavras);
		setupBusca("buscaMetodologia", "sugestoesMetodologia", todasAsMetodologias, metodologiasSelecionadas, renderMetodologias);
		setupBusca("buscaTematica", "sugestoesTematica", todasAsTematicas, tematicasSelecionadas, renderTematicas);
		mostrarView('view-formulario');
	});

	btnCancelar.addEventListener('click', () => {
		mostrarView('view-lista');
	});
});
