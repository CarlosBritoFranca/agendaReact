import React, { useState, useEffect } from "react";
import { Table, Modal, Container, Form, Col, Button } from "react-bootstrap";
import cep from "cep-promise";
import * as yup from "yup";
import { mask, unMask } from "remask";
import { FaSearch } from "react-icons/fa";
import { MdPhone, MdCreate, MdDelete, MdAdd, MdList } from "react-icons/md";

import api from "../../services/api";

import { BtnAcao, HeaderModal, Tbody, Avatar, FormCadastro } from "./styles";

export default function Contatos(props) {
  const [ModalEditAddressShow, setModalEditAddressShow] = useState(false);
  const [ModalPhoneShow, setModalPhoneShow] = useState(false);
  const [ModalPhoneEdit, setModalPhoneEdit] = useState(false);
  const [ModalDeletePhone, setModalDeletePhone] = useState(false);
  const [ModalAddressShow, setModalAddressShow] = useState(false);
  const [ModalContatcDetailsShow, setModalContatcDetailsShow] = useState(false);
  const [ModalDeleteAddress, setModalDeleteAddress] = useState(false);
  const [ModalEditContact, setModalEditContact] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [contato, setContato] = useState("");

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
  const [listPhone, setListPhone] = useState([]);
  const [phoneSelect, setPhoneSelect] = useState("");
  const [phoneEdit, setPhoneEdit] = useState("");
  const [listAddress, setListAddress] = useState([]);
  const [addreesSelected, setAddressSelected] = useState("");
  const [dataAddreesSelected, setDataAddressSelected] = useState("");
  const [name, setName] = useState("");
  const [main_email, setMainEmail] = useState("");
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    api.get("contacts").then((response) => {
      setContacts(response.data);
    });
  }, [contacts]);

  //Add Telefones e listar Telefone

  const handlePhoneView = async (c) => {
    setModalPhoneShow(true);
    const response = await api.get(`contacts/show/${c}`);
    setContato(response.data);
    setListPhone(response.data.phones);
  };

  const savePhone = async (e) => {
    const idContact = contato.id;
    e.preventDefault();
    const schema = yup.object().shape({
      phones: yup.string().required(),
      type: yup.string().required(),
    });
    const data = {
      phones,
      type,
    };

    if (!(await schema.isValid(data))) {
      alert("Telefone e tipo informados são invalidos");
    } else {
      try {
        const response = await api.post(`contacts/${idContact}/phones`, data);
        setPhones(response.data.phones);
        setType(response.data.type);
        alert(`Contato ${phones} salvo com sucesso`);
        setModalPhoneShow(false);
        setPhones("");
        setModalContatcDetailsShow(false);
      } catch (error) {
        if (!(phones && type)) {
          alert("Por favor preencha o telefone e o tipo");
        } else {
          alert(`Telefone já Cadastrado:`);
        }
      }
    }
  };

  const handlePhoneEdit = (p) => {
    setPhoneSelect(p);
    setModalPhoneEdit(true);
  };
  const handleEditPhonesSave = async (e) => {
    e.preventDefault();

    const schema = yup.object().shape({
      phones: yup.string(),
      type: yup.string(),
    });

    const data = {
      phones: phoneEdit,
      type,
    };
    if (!(await schema.isValid(data))) {
      alert("Telefone e tipo informados são invalidos");
    } else {
      try {
        await api.put(`contacts/${contato.id}/phones/${phoneSelect}`, data);

        alert("Telefone atualizado!!!");
        setModalPhoneEdit(false);
        setModalPhoneShow(false);
        setModalContatcDetailsShow(false);
        setPhones("");
      } catch (error) {
        alert("Erro ao atualizar telefone");
      }
    }
  };

  const handleModalDeletePhone = (p) => {
    setModalDeletePhone(true);
    setPhoneSelect(p);
  };

  const handleDeletePhone = async () => {
    try {
      await api.delete(`contacts/${contato.id}/phones/${phoneSelect}`);
      alert("contato deletado com sucesso!!!");
      setModalDeletePhone(false);
      setModalPhoneShow(false);
      setModalContatcDetailsShow(false);
    } catch (error) {
      alert("Erro ao deletar o contato");
    }
  };

  //Crud de Endereços

  const handleAddress = async (c) => {
    setModalAddressShow(true);
    const response = await api.get(`contacts/show/${c}`);
    setContato(response.data);
  };

  const handleCep = async (e) => {
    e.preventDefault();
    cep(zipcode)
      .then((response) => {
        setStreet(response.street);
        setUf(response.state);
        setNeighborhood(response.neighborhood);
        setCity(response.city);
      })
      .catch((error) => {
        if (!zipcode) {
          alert("Por favor preencha um cep valido");
        } else {
          alert("Cep informado não é valido");
        }
      });
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    const idContact = contato.id;

    const schema = yup.object().shape({
      zipcode: yup.string().required(),
      type: yup.string().required(),
      street: yup.string().required(),
      number: yup.number().required(),
      complement: yup.string(),
      city: yup.string().required(),
      neighborhood: yup.string().required(),
    });

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
    if (!(await schema.isValid(address))) {
      alert("Informações invalidas!!!");
    } else {
      try {
        await api.post(`contacts/${idContact}/address`, address);
        alert("Endereço Salvo com sucesso");
        setModalAddressShow(false);
        setModalContatcDetailsShow(false);
        setZipcode("");
        setNumber("");
        setComplement("");
        setTypeAddress("");
        setStreet("");
        setNeighborhood("");
        setCity("");
        setUf("");
      } catch (error) {
        alert("Add endereços falhou");
      }
    }
  };

  const handleDeleteAddressShow = async (a) => {
    setModalDeleteAddress(true);
    const response = await api.get(`contacts/show/${contato.id}`);
    setContato(response.data);
    setAddressSelected(a);
  };

  const handleDeleteAddress = async () => {
    try {
      await api.delete(`contacts/${contato.id}/address/${addreesSelected}`);
      alert("Endereço excluido com sucesso !!!");
      setModalDeleteAddress(false);
      setModalContatcDetailsShow(false);
    } catch (error) {
      alert("Erro ao excluir endereço!!!");
    }
  };

  const handleEditAddresstShow = async (a) => {
    setModalEditAddressShow(true);
    setAddressSelected(a);
    const response = await api.get(`contacts/${contato.id}/address/${a}`);
    setDataAddressSelected(response.data);
  };

  const handleEditAddress = async (e) => {
    e.preventDefault();

    const schema = yup.object().shape({
      zipcode: yup.string().required(),
      type: yup.string().required(),
      street: yup.string().required(),
      number: yup.number().required(),
      complement: yup.string(),
      city: yup.string().required(),
      neighborhood: yup.string().required(),
    });
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
    if (!(await schema.isValid(address))) {
      alert("Informações invalidas!!!");
    } else {
      try {
        await api.put(
          `contacts/${contato.id}/address/${dataAddreesSelected.id}`,
          address
        );
        alert("Endereço atualizado com sucesso!!!");
        setModalEditAddressShow(false);
        setModalContatcDetailsShow(false);
        setZipcode("");
        setNumber("");
        setComplement("");
        setTypeAddress("");
        setStreet("");
        setNeighborhood("");
        setCity("");
        setUf("");
      } catch (error) {
        alert("Erro ao atualizar o endereço");
      }
    }
  };

  const handleShowContact = async (c) => {
    const response = await api.get(`contacts/show/${c}`);
    setContato(response.data);
    setModalContatcDetailsShow(true);
    setListPhone(response.data.phones);
    setListAddress(response.data.addresses);
  };

  const handleEditContactShow = () => {
    console.log(contato);
    setModalEditContact(true);
  };

  const handleEditContact = async () => {
    const schema = yup.object().shape({
      name: yup.string().required().min(5),
      main_email: yup.string().email().required(),
    });
    const contact = {
      name,
      main_email,
    };
    if (!(await schema.isValid(contact))) {
      alert("Nome e email iformados estão invalidos");
    } else {
      try {
        await api.put(`contacts/${contato.id}`, contact);
        alert("Contato Editado com sucesso!!!");
        setModalEditContact(false);
        setName("");
        setMainEmail("");
      } catch (error) {
        alert("Erro ao editar o contato");
      }
    }
  };

  const handleDeleteContact = async () => {
    try {
      await api.delete(`contacts/${contato.id}`);
      alert("Contato removido com sucesso!!!");
      setModalContatcDetailsShow(false);
    } catch (error) {
      alert("Erro ao deletar contato");
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Procurar..."
              aria-label="Search"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
        </div>
        <br />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
            </tr>
          </thead>
          <Tbody>
            {contacts
              .filter((c) => {
                return (
                  c.name.toLowerCase().indexOf(filterText.toLowerCase()) >= 0
                );
              })
              .map((c) => (
                <tr
                  key={c.id}
                  className="listContact"
                  onClick={() => handleShowContact((c = c.id))}
                >
                  <td>{c.name}</td>
                  <td>{c.main_email}</td>
                </tr>
              ))}
          </Tbody>
        </Table>
      </div>
      {/*Modal para detalhes do contato */}
      <Modal
        size="lg"
        show={ModalContatcDetailsShow}
        onHide={() => setModalContatcDetailsShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Table>
            {/* <thead>
              <tr>
                <th>Avatar</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Ações</th>
              </tr>
            </thead> */}
            <tbody>
              <tr>
                <td>
                  <Avatar
                    src="https://pbs.twimg.com/profile_images/1042181136720453632/yzc4rno0_400x400.jpg"
                    alt="Avatar"
                  />
                </td>
                <td>{contato.name}</td>
                <td>{contato.main_email}</td>
                <td>
                  <BtnAcao>
                    <button>
                      <MdCreate
                        size={20}
                        onClick={() => handleEditContactShow()}
                      />
                    </button>
                    <button>
                      <MdDelete
                        size={20}
                        onClick={() => handleDeleteContact()}
                      />
                    </button>
                  </BtnAcao>
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col">
                <button
                  className="btn btn-primary float-right"
                  onClick={() => handlePhoneView()}
                >
                  <MdAdd size={20} />
                  <MdPhone size={20} />
                </button>
              </div>
            </div>
          </div>
          <br />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Telefone</th>
                <th>Tipo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {listPhone.map((p) => (
                <tr key={p.id}>
                  <td>{p.phones}</td>
                  <td>{p.type}</td>
                  <td>
                    <BtnAcao>
                      <button onClick={() => handlePhoneEdit((p = p.id))}>
                        <MdCreate size={20} />
                      </button>
                      <button
                        onClick={() => handleModalDeletePhone((p = p.id))}
                      >
                        <MdDelete />
                      </button>
                    </BtnAcao>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <div className="container">
            <div className="row">
              <div className="col">
                <button
                  className="btn btn-primary float-right"
                  onClick={() => handleAddress()}
                >
                  <MdAdd size={20} />
                  <MdList size={20} />
                </button>
              </div>
            </div>
            <br />
            <Table striped bordered hover>
              <thead>
                <th>Rua</th>
                <th>Numero</th>
                <th>Tipo</th>
                <th>Cidade</th>
                <th>Ações</th>
              </thead>
              <tbody>
                {listAddress.map((a) => (
                  <tr key={a.id}>
                    <td>{a.street}</td>
                    <td>{a.number}</td>
                    <td>{a.type}</td>
                    <td>{a.city}</td>
                    <td>
                      <BtnAcao>
                        <button>
                          <MdCreate
                            size={20}
                            onClick={() => handleEditAddresstShow((a = a.id))}
                          />
                        </button>
                        <button>
                          <MdDelete
                            size={20}
                            onClick={() => handleDeleteAddressShow((a = a.id))}
                          />
                        </button>
                      </BtnAcao>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Modal.Footer>
      </Modal>
      {/*Modal para Editar contato */}
      <Modal
        size="lg"
        show={ModalEditContact}
        onHide={() => setModalEditContact(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Editar Contato
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
            onClick={(e) => handleEditContact()}
          >
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal para edição de endereços*/}
      <Modal
        size="lg"
        show={ModalEditAddressShow}
        onHide={() => setModalEditAddressShow(false)}
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
                <h5>Editar Endereço</h5>
              </div>
            </div>
            <form onSubmit={handleEditAddress}>
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
                        onChange={(e) =>
                          setZipcode(mask(e.target.value, ["99.999-999"]))
                        }
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
                      <option value="Comercial">Comercial</option>
                      <option value="Recado">Outro</option>
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
                      value={uf}
                      onChange={(e) => setUf(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col">
                <Button variant="primary" block type="submit">
                  Salvar
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      {/*Modal de Telefones*/}
      <Modal
        size="lg"
        show={ModalPhoneShow}
        onHide={() => setModalPhoneShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <HeaderModal>
            <img
              src="https://pbs.twimg.com/profile_images/1042181136720453632/yzc4rno0_400x400.jpg"
              alt="Avatar"
            />
            {contato.name}
          </HeaderModal>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={savePhone}>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridPhone">
                  <Form.Control
                    placeholder="Telefone"
                    value={phones}
                    onChange={(e) =>
                      setPhones(
                        mask(unMask(e.target.value), [
                          "(99) 9999-9999",
                          "(99) 99999-9999",
                        ])
                      )
                    }
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="formGridType"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <Form.Control as="select">
                    <option value="">Tipo</option>
                    <option value="Celular">Celular</option>
                    <option value="Residencial">Residencial</option>
                    <option value="Recado">Recado</option>
                    <option value="Comercial">Comercial</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridAdd">
                  <Button variant="primary" type="submit">
                    Salvar
                  </Button>
                </Form.Group>
              </Form.Row>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Telefone</th>
                <th>Tipo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {listPhone.map((p) => (
                <tr key={p.id}>
                  <td>{p.phones}</td>
                  <td>{p.type}</td>
                  <td>
                    <BtnAcao>
                      <button onClick={() => handlePhoneEdit((p = p.id))}>
                        <MdCreate size={20} />
                      </button>
                      <button
                        onClick={() => handleModalDeletePhone((p = p.id))}
                      >
                        <MdDelete />
                      </button>
                    </BtnAcao>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Footer>
      </Modal>
      {/*Modal de Edição de Telefone*/}
      <Modal
        size="lg"
        show={ModalPhoneEdit}
        onHide={() => setModalPhoneEdit(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
        bg="dark"
      >
        <Modal.Header closeButton>
          <HeaderModal>
            <img
              src="https://pbs.twimg.com/profile_images/1042181136720453632/yzc4rno0_400x400.jpg"
              alt="Avatar"
            />
            {contato.name}
          </HeaderModal>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={handleEditPhonesSave}>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridPhone">
                  <Form.Control
                    placeholder="Telefone"
                    value={phoneEdit}
                    onChange={(e) =>
                      setPhoneEdit(
                        mask(unMask(e.target.value), [
                          "(99) 9999-9999",
                          "(99) 99999-9999",
                        ])
                      )
                    }
                    className="phone_with_ddd"
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="formGridType"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className=""
                >
                  <Form.Control as="select">
                    <option value="">Tipo</option>
                    <option value="Celular">Celular</option>
                    <option value="Residencial">Residencial</option>
                    <option value="Recado">Recado</option>
                    <option value="Comercial">Comercial</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridAdd">
                  <Button variant="primary" type="submit">
                    Salvar
                  </Button>
                </Form.Group>
              </Form.Row>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
      {/*Modal para deletar Telefone*/}
      <Modal
        size="sm"
        show={ModalDeletePhone}
        onHide={() => setModalDeletePhone(false)}
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
          <h5>Excluir o Telefone ?</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleDeletePhone()}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
      {/*Modal de Add Endereços */}
      <Modal
        size="lg"
        show={ModalAddressShow}
        onHide={() => setModalAddressShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <HeaderModal>
            <img
              src="https://pbs.twimg.com/profile_images/1042181136720453632/yzc4rno0_400x400.jpg"
              alt="Avatar"
            />
            {contato.name}
          </HeaderModal>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <form onSubmit={handleAddAddress}>
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
                        onChange={(e) =>
                          setZipcode(mask(e.target.value, ["99.999-999"]))
                        }
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
                      <option value="Comercial">Comercial</option>
                      <option value="Recado">Outro</option>
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
              <div className="col">
                <Button variant="primary" block type="submit">
                  Salvar
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      {/*Modal para deletar endereços */}
      <Modal
        size="sm"
        show={ModalDeleteAddress}
        onHide={() => setModalDeleteAddress(false)}
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
          <h5>Excluir o Endereço ?</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleDeleteAddress()}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
