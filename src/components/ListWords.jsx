import React from 'react';
import '../App';

const ListWords = ({ items }) => {
    return (
        <>
            {items.map((item) => (
                <div className="word" key={item.id}>
                    <p>{item.word}</p>
                </div>
            ))}
        </>
    )
}

export default ListWords;