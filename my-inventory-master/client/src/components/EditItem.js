import React, { useContext, useEffect, useState } from 'react';
import { ItemsContext } from '../contexts/ItemsContext';
import { useParams, Link } from "react-router-dom";
import { BsArrowLeft } from 'react-icons/bs';
import { useHistory } from "react-router-dom";

 const EditItem = () => {
  const { updateItem, items, getItem } =  useContext(ItemsContext);
  const { id }  = useParams();
  let history = useHistory();

  
  useEffect(() => {
    getItem(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
    let myItem;
      for(let item of items){
        if(item._id === id){
          myItem = item;
        }
      } 
    const title = myItem.name;
    const qty = myItem.quantity;
    const prc = myItem.price;

    let [name, setName] = useState(`${title}`);
    let [quantity, setQuantity] = useState(qty);
    let [price, setPrice] = useState(prc); 


  const handleSubmit = (e) => {
    e.preventDefault();

    const updItem = {
      name,
      quantity,
      price
    }

    updateItem(id, updItem);
    setName('');
    setQuantity('');
    setPrice('');

    history.push("/items");
  }

  const handleNameChange = (e) => {
    const name = e.target.value;
    setName(name);
  }

  const handleQuantityChange = (e) => {
    const quantity = e.target.value;
    setQuantity(quantity);
  }

  const handlePriceChange = (e) => {
    const price = e.target.value;
    setPrice(price);
  }

  

    return (
        <div>
          <Link to="/items"><span className="backtoArrow"><BsArrowLeft />Back to Products List</span></Link>

          <div className="form-container">
            <h4>Edit Item</h4>
            <form onSubmit={handleSubmit}>
              <input type="text" value={name} required onChange={handleNameChange} />
              <input type="number" value={quantity} min="1" step="1" required onChange={handleQuantityChange} />
              <input type="number" value={price} min="1" step="0.01" required onChange={handlePriceChange} />
              <div className="submit">
                <input type="submit" value="Save" />
              </div>
            </form>
          </div>
        </div>
    )
}

export default EditItem;