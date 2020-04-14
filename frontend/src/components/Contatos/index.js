import React, { useState, useEffect } from "react";
import { Table, Modal } from "react-bootstrap";
import cep from "cep-promise";
import { FaEye, FaUserEdit, FaTrash, FaPhone, FaSearch } from "react-icons/fa";

import api from "../../services/api";

import { BtnAcao, HeaderModal, Phone } from "./styles";

export default function Contatos() {
  const [ModalViewShow, setModalViewShow] = useState(false);
  const [ModalEditShow, setModalEditShow] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [contato, setContato] = useState("");
  const [name, setName] = useState("");
  const [main_email, setMain_Email] = useState("");
  const [type, setType] = useState("");
  const [phones, setPhones] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [typeAddress, setTypeAddress] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  useEffect(() => {
    api.get("contacts").then((response) => {
      setContacts(response.data);
    });
  }, [contacts]);

  const handleClickView = async (c) => {
    setModalViewShow(true);
    const response = await api.get(`contacts/show/${c}`);
    setContato(response.data);
    console.log("aqui", contato);
  };
  const handleClickEdit = async (c) => {
    setModalEditShow(true);
    const response = await api.get(`contacts/show/${c}`);
    setContato(response.data);
    console.log("aqui", contato);
  };
  const handleCep = async (e) => {
    e.preventDefault();
    if (!zipcode) {
      return alert("Preencha o cep");
    }
    const response = await cep(zipcode);
    try {
      setStreet(response.street);
      setUf(response.state);
      setNeighborhood(response.neighborhood);
      setCity(response.city);
    } catch (error) {
      alert("Preencha  o cep");
    }
  };

  const handleUpdateContact = async (e) => {
    e.preventDefault();
    const person = {
      name,
      main_email,
    };
    const phone = {
      type,
      phones,
    };
    const address = {
      zipcode,
      type: typeAddress,
      street,
      number,
      complement,
      uf,
      city,
      neighborhood,
    };
    console.log(address);
  };
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.main_email}</td>
              <td>{c.phone}</td>
              <td>
                <BtnAcao>
                  <button onClick={() => handleClickView((c = c.id))}>
                    <FaEye size={20} />
                  </button>
                  <button onClick={() => handleClickEdit((c = c.id))}>
                    <FaUserEdit />
                  </button>
                  <button>
                    <FaTrash />
                  </button>
                </BtnAcao>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Modal para ver de contato*/}
      <Modal
        size="lg"
        show={ModalViewShow}
        onHide={() => setModalViewShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            <HeaderModal>
              <img
                src="https://pbs.twimg.com/profile_images/1042181136720453632/yzc4rno0_400x400.jpg"
                alt="Avatar"
              />
              {contato.name}
            </HeaderModal>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col">
                <Phone>
                  <FaPhone />
                  Residencial: (16) 3727 - 4050
                </Phone>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Phone>
                  <FaPhone />
                  Celular: (16) 99297 - 7520
                </Phone>
              </div>
            </div>
          </div>
          <hr />
          <div className="container">
            <div className="row">
              <div className="col">
                <h5>Endereços</h5>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p>Tipo: Residencial</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p>Rua: Orestes Dalmaso</p>
              </div>
              <div className="col">
                <p>Numero: 1725</p>
              </div>
              <div className="col">
                <p>Complemento: Casa</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p>Bairro: Petraglia</p>
              </div>
              <div className="col">
                <p>Cidade: Franca</p>
              </div>
              <div className="col">
                <p>Estado: SP</p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* Modal para edição de contato*/}
      <Modal
        size="lg"
        show={ModalEditShow}
        onHide={() => setModalEditShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            <HeaderModal>
              <img
                src="https://pbs.twimg.com/profile_images/1042181136720453632/yzc4rno0_400x400.jpg"
                alt="Avatar"
              />
              {contato.name}
            </HeaderModal>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <form onSubmit={handleUpdateContact}>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="">Nome</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={contato.name}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={contato.main_email}
                      value={main_email}
                      onChange={(e) => setMain_Email(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Telefone"
                      value={phones}
                      onChange={(e) => setPhones(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <select
                      type="text"
                      className="form-control"
                      placeholder="Tipo"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="">Tipo</option>
                      <option value="Residencial">Residencial</option>
                      <option value="Celular">Celular</option>
                      <option value="Recado">Recado</option>
                    </select>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="CEP"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        required={true}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={handleCep}
                        >
                          <span>
                            <FaSearch />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <select
                      type="text"
                      className="form-control"
                      placeholder="Tipo"
                      value={typeAddress}
                      onChange={(e) => setTypeAddress(e.target.value)}
                    >
                      <option value="">Tipo</option>
                      <option value="Residencial">Residencial</option>
                      <option value="Comercial">Celular</option>
                      <option value="Recado">Recado</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Rua/Av"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-sm-2">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Numero"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Complemento"
                      value={complement}
                      onChange={(e) => setComplement(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-5">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Bairro"
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-sm-5">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Cidade"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-sm-2">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="UF"
                      value={uf}
                      onChange={(e) => setUf(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div>
                <button className="btn btn-primary">Salvar</button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
