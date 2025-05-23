import { useState } from "react";            // Importa o hook useState do React para gerenciar estados locais
import "./styles.css";                       // Importa o arquivo de estilos CSS
import { toast } from "react-toastify";      // Importa o módulo de notificações toast

function NewUser() {
  // Estado para armazenar o valor do campo de e-mail
  const [email, setEmail] = useState("");
  // Estado para armazenar o valor do campo de senha
  const [password, setPassword] = useState("");

  // Função assíncrona executada ao clicar no botão de cadastro
  const onSignUpClick = async () => {
    // Envia requisição POST para criar um novo usuário no servidor
    let response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"   // Especifica que o corpo da requisição é JSON
      },
      body: JSON.stringify({                // Converte email e senha em JSON
        email: email,
        password: password
      })
    });

    // Verifica se a resposta do servidor foi bem-sucedida
    if (response.ok) {
      // Exibe notificação de sucesso
      toast.success("Usuário cadastrado com sucesso!");

      // Aguarda 3 segundos antes de redirecionar para a tela de login
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    } else {
      // Exibe notificação de erro caso o cadastro falhe
      toast.error("Erro ao cadastrar o usuário, tente novamente.");
    }
  };

  return (
    <>
      {/* Máscara de fundo para centralizar o formulário */}
      <div className="page__mask">
        {/* Container do formulário de cadastro */}
        <div className="form__container">
          {/* Logo do aplicativo */}
          <img src="assets/logo.svg" alt="Logo do Senai Notes." />

          {/* Título principal */}
          <h1>Create Your Account</h1>
          {/* Subtítulo com instrução */}
          <p className="subtitle">
            Sign up to start organizing your notes and boost your productivity.
          </p>

          {/* Campo de input para e-mail */}
          <label>
            Email Address
            <input
              type="text"
              placeholder="email@example.com"
              value={email}                          // Valor controlado pelo estado `email`
              onChange={e => setEmail(e.target.value)} // Atualiza o estado `email` conforme o usuário digita
            />
          </label>

          {/* Campo de input para senha */}
          <label>
            Password
            <input
              type="password"
              value={password}                        // Valor controlado pelo estado `password`
              onChange={e => setPassword(e.target.value)} // Atualiza o estado `password` conforme o usuário digita
            />
          </label>

          {/* Botão que dispara a função de cadastro */}
          <button onClick={onSignUpClick}>Sign Up</button>

          {/* Dica para quem já possui conta */}
          <p className="form__hint">
            Already have an account? <a href="/login">Sign In</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default NewUser;  // Exporta o componente para uso em outras partes da aplicação
