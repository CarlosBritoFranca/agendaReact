import React from "react";
import { Modal } from "react-bootstrap";

// import { Container } from './styles';

export default function ModalAddress({ ModalAddressShow, handleAddress }) {
  return (
    <>
      <Modal
        size="lg"
        show={ModalAddressShow}
        onHide={() => handleAddress(true)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Large Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
      </Modal>
    </>
  );
}
