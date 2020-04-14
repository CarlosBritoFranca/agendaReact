import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Modal } from "react-bootstrap";
import api from "../../services/api";

import { FormCadastro } from "./styles";

export default function Agenda() {
  const [ModalAddShow, setModalAddShow] = useState(false);
  const [main_email, setMain_Email] = useState("");
  const [name, setName] = useState("");

  async function handleAddContact(e) {
    e.preventDefault();
    const data = {
      name,
      main_email,
    };
    try {
      const response = await api.post("contacts", data);

      alert(`Contato ${response.data.name} cadastrado com sucesso`);
      setModalAddShow(false);
    } catch (error) {
      alert(`Erro ao cadastrar contato`);
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link className="navbar-brand" to="/">
          Agenda
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active"></li>
            <li className="nav-item" onClick={() => setModalAddShow(true)}>
              <Link className="nav-link" to="#">
                Adicionar Contato
              </Link>
            </li>
          </ul>
          <div className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Procurar"
              aria-label="Search"
            />
          </div>
        </div>
      </nav>
      <Modal
        size="lg"
        show={ModalAddShow}
        onHide={() => setModalAddShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Novo Contato
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormCadastro>
            <form onSubmit={handleAddContact}>
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
                  value={main_email}
                  onChange={(e) => setMain_Email(e.target.value)}
                  required
                />
                <button className="btn btn-block btn-primary"> Salvar</button>
              </div>
            </form>
          </FormCadastro>
        </Modal.Body>
      </Modal>
      <br />
    </>
  );
}
