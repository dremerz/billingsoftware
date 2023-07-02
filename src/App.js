import React, { useState } from 'react';
import './style.css';

export default function App() {
  const [itemName, setItemName] = useState('');
  const [cost, setCost] = useState('');
  const [quantity, setQuantity] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const handleAddItem = () => {
    if (itemName && cost && quantity) {
      const newItem = {
        name: itemName,
        cost: Number(cost),
        quantity: Number(quantity),
      };
      setCartItems([...cartItems, newItem]);
      // Clear the input fields after adding the item
      setItemName('');
      setCost('');
      setQuantity('');
    } else {
      alert('Please fill all the fields');
    }
  };

  const handleDeleteItem = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
  };

  const isInputEnabled = itemName.trim() !== '';

  const getTotalCost = () => {
    return cartItems.reduce((total, item) => total + item.cost * item.quantity, 0);
  };

  return (
    <div>
      <h1>Billing Software</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          disabled={!isInputEnabled}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          disabled={!isInputEnabled}
        />
        <button onClick={handleAddItem} disabled={!isInputEnabled}>
          Add Item
        </button>
      </div>
      {cartItems.length > 0 ? (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Cost</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.cost * item.quantity}</td>
                <td>
                  <button onClick={() => handleDeleteItem(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Total Cost:</td>
              <td>${getTotalCost()}</td>
            </tr>
          </tfoot>
        </table>
      ) : (
        <p className="no-items">No items in the cart.</p>
      )}
    </div>
  );
}
