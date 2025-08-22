// Simulação de login
document.getElementById("loginForm").addEventListener("submit", function (e) {
	e.preventDefault();

	const user = document.getElementById("user").value;
	const password = document.getElementById("password").value;

	// Aqui você pode trocar pela chamada real da sua API Laravel
	if (user === "admin" && password === "1234") {
		alert("Login realizado com sucesso!");
		window.location.href = "dashboard.html"; // redirecionar após login
	} else {
		alert("Usuário ou senha incorretos.");
	}
});
