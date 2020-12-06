import React, { useContext, useEffect } from 'react'
import { ItemsContext } from '../contexts/ItemsContext';
import '../styles/ItemList.scss';
import { Table } from 'react-bootstrap';
import Inventory from './Inventory'
import Item from './Item';
import { useParams } from "react-router-dom";


const ItemList = () => {
  const { getUserItems } =  useContext(ItemsContext);

  const { id }  = useParams();

  useEffect(() => {
    getUserItems(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    return (
      <div>

        <div className="item-list">
          <Table striped bordered hover variant="dark" responsive="sm">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Unit Cost</th>
                <th>Total Cost</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <Item />
            </tbody>                        
          </Table>
        </div>
        <Inventory />
      </div>      
    )
}

export default ItemList;