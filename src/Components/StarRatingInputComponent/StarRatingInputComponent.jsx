import './StarRatingInputComponent.css'
import { useState } from "react"
import { LuStar } from "react-icons/lu"

function StarRatingInput({ onChange }) {
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(null)

    const handleClick = (value) => {
        setRating(value)
        onChange(value)
    }

    return (
        <div className="star-rating-input">
            {
                [1, 2, 3, 4, 5].map((value) => (
                    <LuStar
                        key={value}
                        size={28}
                        className={`star-rating-input__star ${(hover || rating) >= value && "sri--gold"}`}
                        onClick={() => handleClick(value)}
                        onMouseEnter={() => setHover(value)}
                        onMouseLeave={() => setHover(null)}
                    />
                ))
            }
        </div>
    )
}

export default StarRatingInput