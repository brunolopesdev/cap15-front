import { useState } from "react";
import axios from "axios";
import "../App.scss";

function App() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post<{ token: string }>(
        "https://cap15-back.vercel.app/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      console.log("response", response);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        alert("Login realizado com sucesso");
      } else {
        alert("Email ou senha inválidos");
      }
    } catch (error) {
      console.error(error);
      alert("Email ou senha inválidos");
    }
  };

  return (
    <section className="formContainer">
      <h1>Faça seu login</h1>
      <form className="form" onSubmit={loginUser}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          required
        />
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={onChange}
          required
        />
        <button type="submit">Enviar</button>
      </form>
    </section>
  );
}

export default App;
