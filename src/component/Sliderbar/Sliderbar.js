import React from 'react'
import "./Sliderbar.css"
import {Link} from "react-router-dom";
import add_product_icon from "../../Asset/Product_Cart.svg"
import list_product_icon from "../../Asset/Product_list_icon.svg"
const Sliderbar = () => {
  return (
    <div className='slidebar'>
      <Link to={"/addproduct"} style={{textDecoration:"none"}}>
        <div className='sliderbar-item'>
           <img src={add_product_icon} alt=''/>
           <p>Add Product</p>
        </div>
      </Link>
      <Link to={"/listproduct"} style={{textDecoration:"none"}}>
        <div className='sliderbar-item'>
           <img src={list_product_icon} alt=''/>
           <p>Product List</p>
        </div>
      </Link>
    </div>
    
  )
}

export default Sliderbar
