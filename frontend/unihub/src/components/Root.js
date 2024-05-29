import React from "react";
import Header from "./commons/Header";
import Footer from "./commons/Footer";

export default function Root({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
