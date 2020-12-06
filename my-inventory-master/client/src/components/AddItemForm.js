import React, { useContext, useEffect } from 'react';
import { ItemsContext } from '../contexts/ItemsContext';
import '../styles/ItemList.scss';
import Inventory from './Inventory';

const AddItemForm = () => {

  const { name, quantity, price, setName, setQuantity, setPrice, getUserItems, addUserItem, user } =  useContext(ItemsContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newItem = {
          name,
          quantity,
          price
        }

        addUserItem(user.id, newItem);
      
        setName('');
        setQuantity('');
        setPrice('');
    }

    useEffect(() => {
      getUserItems(user.id);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return ( 
      <div>
        <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input type="text" value={name} placeholder="Item..." required onChange={(e) => setName(e.target.value)} />
          <input type="number" value={quantity} min="1" step="1" placeholder="Quantity..." required onChange={(e) => setQuantity(e.target.value)} />
          <input type="number" value={price} min="1" step="0.01" placeholder="Price..." required onChange={(e) => setPrice(e.target.value)} />
          <div className="submit">
            <input type="submit" value="Send" />
          </div>
        </form>
        </div>
        <Inventory />
      </div>
    );
}
 
export default AddItemForm;