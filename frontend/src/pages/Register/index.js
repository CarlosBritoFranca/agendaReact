import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FaRegistered } from "react-icons/fa";

import api from "../../services/api";

import { ContentRegister } from "./styles";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      password,
    };

    try {
      const response = await api.post("users", data);
      alert(`Usuario ${response.name} cadastrado com sucesso!!!`);
      history.push("/");
    } catch (error) {
      alert(`Erro no cadastro, tente novamente!!!`);
    }
  }

  return (
    <>
      <div className="container">
        <ContentRegister>
          <div className="card">
            <div className="logo-register">
              <FaRegistered size={36} />
              <span>
                <h3>Registre-se</h3>
              </span>
            </div>
            <div className="card-body">
              <form onSubmit={handleRegister}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    className="form-control"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div>
                    <button type="submit" className="btn btn-primary btn-block">
                      Salvar
                    </button>
                  </div>
                </div>
              </form>
              <div>
                <Link to="/">Já tenho Registro</Link>
              </div>
            </div>
          </div>
        </ContentRegister>
      </div>
    </>
  );
}
