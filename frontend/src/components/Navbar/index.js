import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import api from "../../services/api";

import { FormCadastro } from "./styles";

export default function Agenda() {
  const [name, setName] = useState("");
  const [main_email, setMainEmail] = useState("");
  const [lgShow, setLgShow] = useState(false);

  async function handleAddContact(e) {
    e.preventDefault();
    const data = {
      name,
      main_email,
    };
    try {
      const response = await api.post("contacts", data);
      setLgShow(false);
      alert(`Contato ${response.data.name} cadastrado com sucesso`);
      setName("");
      setMainEmail("");
    } catch (error) {
      if (!(name && main_email)) {
        alert(`Por favor preencher Nome e Email !!`);
      } else {
        alert(`Erro ao cadastrar contato`);
      }
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
            <li className="nav-item" onClick={() => setLgShow(true)}>
              <Link className="nav-link" to="#">
                Adicionar Contato
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <br />
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Criar Contato
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormCadastro>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nome"
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col">
                <input
                  type="email"
                  className="form-control"
                  placeholder="E-mail"
                  id="email"
                  required
                  value={main_email}
                  onChange={(e) => setMainEmail(e.target.value)}
                />
              </div>
            </div>
          </FormCadastro>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="button"
            block
            onClick={handleAddContact}
          >
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
