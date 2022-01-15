import React from "react";

export const NothingSelected = ({ handleAddNewNote }) => {

  return (
    <div className="row w-100 m-0 p-0 text-center align-items-center bg-primary text-light vh-100">
      <div className="col p-0 m-0">
        <p className="fw-bold">
          ¡Selecciona una nota...
          <br />
          No tienes ? 
          <br />
          Pues crea una !!!
        </p>
        <i onClick={handleAddNewNote} className="far fa-calendar-plus fa-5x pointer"></i>
      </div>
    </div>
  );
};
