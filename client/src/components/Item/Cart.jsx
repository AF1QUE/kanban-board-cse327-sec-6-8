// Cart.js

import React from 'react';

const Cart = ({ cart, onRemoveFromCart }) => {
  return (
    <div className="border p-4 m-2">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between items-center mb-2">
          <p>{item.name}</p>
          <button
            onClick={() => onRemoveFromCart(item)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
