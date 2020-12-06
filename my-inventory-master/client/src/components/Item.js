import React, { useContext, useEffect } from 'react'
import { ItemsContext } from '../contexts/ItemsContext';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { Link } from "react-router-dom";
import { numberWithCommas } from '../utils/format';

 const Item = () => {

  const { items, deleteItem, getUserItems, user } =  useContext(ItemsContext);

  const btnStyle = {
    marginRight: '1rem',
    color: 'white'
  }

  useEffect(() => {
    getUserItems(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    return (
        <>
          {items.map(OneItem => {
            return (                     
            <tr key={OneItem._id}>
              <td>{OneItem.name}</td>
              <td>{OneItem.quantity}</td>
              <td>{user.currency}{OneItem.price}</td>
              <td>{user.currency}{numberWithCommas(parseFloat(OneItem.quantity*OneItem.price).toFixed(2))}</td>
              <td>
                <Link to={`/edit/${OneItem._id}`}><BsPencil style={btnStyle} /></Link>                      
                <BsTrash onClick={() => deleteItem(OneItem._id)} />
              </td>
            </tr>
            )
          })}
        </>
    )
}


export default Item;