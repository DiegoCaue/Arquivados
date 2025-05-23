import { useState } from "react";               // Importa o hook useState do React para gerenciar estados locais
import "./styles.css";                          // Importa o arquivo de estilos CSS
import { toast } from "react-toastify";         // Importa o módulo de notificações toast

function Login() {
  // Estado para armazenar o valor do campo de e-mail
  const [email, setEmail] = useState("");
  // Estado para armazenar o valor do campo de senha
  const [password, setPassword] = useState("");

  // Função executada ao clicar no botão de login
  const onLoginClick = () => {
    // Verifica se as credenciais coincidem com os valores esperados
    if (email === "teste@teste.com" && password === "123456") {
      // Exibe notificação de sucesso
      toast.success("Login realizado com sucesso!");

      // Exemplos de token e ID de usuário retornados pela "API"
      let token = "meuToken";
      let userId = "meuId";

      // Armazena token e userId no localStorage para manter o usuário logado
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      // Redireciona o usuário para a rota de notas após login bem-sucedido
      window.location.href = "/notes";
    } else {
      // Exibe notificação de erro caso as credenciais sejam inválidas
      toast.error("Credenciais inválidas!");
    }
  };

  return (
    <>
      {/* Máscara de fundo para centralizar o formulário */}
      <div className="page__mask">
        {/* Container do formulário de login */}
        <div className="form__container">
          {/* Logo do aplicativo */}
          <img src="assets/logo.svg" alt="Logo do Senai Notes." />

          {/* Título principal */}
          <h1>Welcome to Note</h1>
          {/* Subtítulo com instrução */}
          <p className="subtitle">Please log in to continue</p>

          {/* Campo de input para e-mail */}
          <label>
            Email Address
            <input
              type="text"
              placeholder="email@example.com"
              value={email}                      // Valor controlado pelo estado `email`
              onChange={e => setEmail(e.target.value)}  // Atualiza o estado `email` a cada digitação
            />
          </label>

          {/* Campo de input para senha */}
          <label>
            Password
            <input
              type="password"
              value={password}                  // Valor controlado pelo estado `password`
              onChange={e => setPassword(e.target.value)} // Atualiza o estado `password` a cada digitação
            />
          </label>

          {/* Botão que dispara a função de login */}
          <button onClick={onLoginClick}>Login</button>

          {/* Dica para usuários sem conta */}
          <p className="form__hint">
            No account yet? <a href="/new-user">Sign Up</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;  // Exporta o componente para uso em outras partes da aplicação
