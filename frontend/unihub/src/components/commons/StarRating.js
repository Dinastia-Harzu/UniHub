import React, { useState } from "react";

export default function StarRating() {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

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
                            onChange={() => setRating(currentRating)}
                        />
                        <span
                            className="star"
                            style={{
                                color:
                                    currentRating <= (hover || rating) ? "#ffc107" : "#959595"
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
