import { useState } from 'react';

interface StarRatingProps {
    totalStars?: number;
    valueRating?: number;
}

const StarRating = ({ totalStars = 5, valueRating }: StarRatingProps) => {
    const [rating, setRating] = useState(valueRating || 0);

    const handleRating = (index: number) => {
        setRating(index + 1);
    };

    return (
        <div className="flex space-x-1">
            {[...Array(totalStars)].map((_, index) => (
                <svg
                    key={index}
                    onClick={() => handleRating(index)}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={index < rating ? 'orange' : 'gray'}
                    className="w-3 h-3 transition-colors duration-300 cursor-pointer"
                >
                    <path d="M12 .587l3.668 7.429L24 9.577l-6 5.843L19.335 24 12 19.768 4.665 24 6 15.42 0 9.577l8.332-1.561z" />
                </svg>
            ))}
        </div>
    );
};

export default StarRating;