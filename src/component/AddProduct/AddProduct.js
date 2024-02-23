import React, { useState } from 'react';
import upload_area from "../../Asset/upload_area.svg";
import "./AddProduct.css";

const AddProduct = () => {
    const [image, setImage] = useState(0);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: ""
    });

    const imagehandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const Add_product = async () => {
        console.log(productDetails);
        let responseData;
        let product = productDetails;
        let formData = new FormData();
        formData.append('product',image);
        await fetch('http://localhost:5000/upload',{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData,
        }).then((res)=>res.json()).then((data)=>{responseData=data})

        if(responseData.success){
            product.image = responseData.image_url;
            console.log(product)
            const url = 'http://localhost:5000/addproduct';
            
            //Define the request options
            const requestOptions={
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body:JSON.stringify(product),
            }
            
            //Send the Post request
            await fetch(url,requestOptions)
            .then((res)=>{
                if(!res.ok){
                    throw new Error ('Network response is not ok');
                }
                return res.json();
            }).then((data)=>{
                if(data.success){
                    alert("Product added Successfully.")
                }else{
                    alert("Failed!");
                }
            }).catch(error=>{
                console.error('There was a problem with the fetch operation:',error);
            })
            
        }
    };

    return (
        <div className='add-product'>
            <div className='addproduct-itemfield'>
                <p>Product Title</p>
                <input
                    defaultValue={productDetails.name}
                    onChange={changeHandler}
                    type='text'
                    name='name'
                    placeholder='Type here'
                />
            </div>
            <div className='addproduct-price'>
                <div className='addproduct-itemfield'>
                    <p>Price</p>
                    <input
                        defaultValue={productDetails.old_price}
                        onChange={changeHandler}
                        type='text'
                        name='old_price'
                        placeholder='Type here'
                    />
                </div>
                <div className='addproduct-itemfield'>
                    <p>Offer Price</p>
                    <input
                        defaultValue={productDetails.new_price}
                        onChange={changeHandler}
                        type='text'
                        name='new_price'
                        placeholder='Type here'
                    />
                </div>
            </div>
            <div className='addproduct-itemfield'>
                <p>Product Category</p>
                <select
                    value={productDetails.category}
                    onChange={changeHandler}
                    name='category'
                    className='add-product-selector'
                >
                    <option value="women">Women</option>
                    <option value="kid">Kid</option>
                    <option value="man">Man</option>
                </select>
            </div>
            <div className='addproduct-itemfield'>
                <label htmlFor='file-input'>
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumbnail-img' alt='' />
                </label>
                <input onChange={imagehandler} type='file' name='image' id='file-input' hidden />
            </div>
            <button onClick={Add_product} className='addproduct-btn'>ADD</button>
        </div>
    );
};

export default AddProduct;
