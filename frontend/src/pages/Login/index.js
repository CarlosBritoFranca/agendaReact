import React, { useState } from "react";
import { FaAddressBook } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";

import { ContentLogin } from "./styles";
import api from "../../services/api";
import { login } from "../../services/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPaswword] = useState("");

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) {
      alert(`Preencha email e senha!!!`);
    } else {
      try {
        const response = await api.post("sessions", { email, password });
        login(response.data.token);
        history.push("/agenda");
      } catch (error) {
        alert(`Seu email ou senha não conferem!!`);
      }
    }
  }

  return (
    <>
      <div className="container">
        <ContentLogin>
          <div className="card">
            <div className="logo">
              <FaAddressBook size={36} />
              <span>
                <h3>Agenda</h3>
              </span>
            </div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="E-mail"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Senha"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPaswword(e.target.value)}
                  />
                  <div>
                    <button type="submit" className="btn btn-primary btn-block">
                      Entrar
                    </button>
                  </div>
                </div>
              </form>
              <div>
                <Link to="/register">Registar-se</Link>
              </div>
            </div>
          </div>
        </ContentLogin>
      </div>
    </>
  );
}
