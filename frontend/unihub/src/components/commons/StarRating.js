import React, { act, useState, useEffect } from "react";

export default function StarRating({ formComentario, setFormComentario, ratinginicial, desabilitado }) {
  const [rating, setRating] = useState(ratinginicial);
  const [hover, setHover] = useState(null);

  function actualizarValoracion(currentRating) {
    if (!desabilitado) {
      setFormComentario(prevComentario => ({
        ...prevComentario,
        valoracion: currentRating
      }));
      setRating(currentRating);
    }
  }

  function actualizarHoverEstrellas(currentRating) {
    if (!desabilitado) {
      setHover(currentRating);
    }
  }

  function handleKeyDown(event, currentRating) {
    if (event.key === "Enter") {
      actualizarHoverEstrellas(currentRating);
      actualizarValoracion(currentRating)
    }
  }



  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;

        return (
          <label key={index}>
            <input

              type="radio"
              name="rating"
              value={currentRating}
              onChange={() => actualizarValoracion(currentRating)}
            />
            <span
              tabIndex="0"
              className="star"
              style={{
                color:
                  currentRating <= (hover || rating) ? "#ffc107" : "#959595",
                cursor:
                  desabilitado ? "default" : "pointer",

              }}
              onMouseEnter={() => actualizarHoverEstrellas(currentRating)}
              onMouseLeave={() => actualizarHoverEstrellas(null)}
              onKeyDown={(event) => handleKeyDown(event, currentRating)}


            >
              &#9733;
            </span>
          </label>
        );
      })}
    </div>
  );
}
