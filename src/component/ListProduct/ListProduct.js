import React, { useEffect, useState } from 'react'
import "./ListProduct.css"
import cross_icon from "../../Asset/cross_icon.png"
const ListProduct = () => {
  const [allproducts,setallproducts] = useState([]);
  const fetchInfo = async()=>{
    await fetch('http://localhost:5000/allproducts')
    .then((res)=>res.json()).then((data)=>{setallproducts(data)});
  }
  useEffect(()=>{
    fetchInfo();
  },[]);

  const deltetImage = async(id)=>{
    const url = 'http://localhost:5000/removeproduct';
    const requestOptions={
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({id:id})
    }
    await fetch(url,requestOptions)
    .then((res)=>{
      if(!res.ok){
        throw new Error('Network response is not Ok.')
      }
      return res.json();
    }).then((data)=>{
      if(data.success){
        alert("Data Deleted Succesfully.")
        fetchInfo();
      }else{
        alert("Failed to delete the data.")
      }
    }).catch(err=>{
      console.error("There is a problem with fetch",err);
    })
  }
  return (
    <div className='list-product'>
      <h1>All Product List</h1>
      <div className='listproduct-format-main'>
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className='listproduct-allproduct'>
        <hr />
          {allproducts.map((item,i)=>{
            return <><div key={i} className='listproduct-format-main listproduct-format'>
                <img src={item.image} alt='' className='listproduct-product-icon'/>
                <p>{item.name}</p>
                <p>${item.old_price}</p>
                <p>${item.new_price}</p>
                <p>{item.category}</p>
                <img onClick={()=>{deltetImage(item.id)}} src={cross_icon} className='listproduct-remove-icon' alt=''/>
            </div>
            <hr/>
            </>
          })}
      </div>
    </div>
  )
}

export default ListProduct
