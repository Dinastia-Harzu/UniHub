import React, { act, useState } from "react";

export default function StarRating({ formComentario, setFormComentario }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  function actualizarValoracion(currentRating) {
    setFormComentario(prevComentario => ({
      ...prevComentario,
      valoracion: currentRating
    }));
    setRating(currentRating);
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
              className="star"
              style={{
                color:
                  currentRating <= (hover || rating) ? "#ffc107" : "#959595",
              }}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            >
              &#9733;
            </span>
          </label>
        );
      })}
    </div>
  );
}
