import { useState } from "react";
import axios from "axios";
import "./App.scss";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createUser = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const response = await axios.post("https://cap15-back.vercel.app/users", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 201) {
        alert("Usuário criado com sucesso!");
      } else {
        alert("Erro ao criar usuário");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao criar usuário");
    }
  };

  return (
    <>
      <section className="formContainer">
        <h1>Cadastre-se</h1>

        <form className="form" onSubmit={createUser}>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={onChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={onChange}
            required
          />

          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={onChange}
            required
          />

          <button type="submit">Cadastrar</button>
        </form>
      </section>
    </>
  );
}

export default App;
