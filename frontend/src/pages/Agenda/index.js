import React from "react";

import Contatos from "../../components/Contatos";
import Navbar from "../../components/Navbar";

// import { Container } from './styles';

export default function Agenda() {
  return (
    <>
      <Navbar />
      <br />
      <div>
        <Contatos />
      </div>
    </>
  );
}
