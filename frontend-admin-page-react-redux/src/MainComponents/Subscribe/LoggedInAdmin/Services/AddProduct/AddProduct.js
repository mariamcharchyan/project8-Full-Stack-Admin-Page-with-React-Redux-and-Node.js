import { useState, useEffect } from 'react';
import './AddProduct.css';

export default function AddProduct(){
    // http://localhost:3000/product/new
    
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [newProductData, setNewProductData] = useState('');
    console.log(newProductData);
    console.log(category);
    const categories = [
        {id: 1, name: "For girl"},
        {id: 2, name: "For boy"},
        {id: 3, name: "For all"}
    ];

    useEffect(() => setNewProductData(
        {
            image: image,
            name: name,
            price: price,
            discount_percentage: discountPercentage,
            description: description,
            categories_id: category
        }
    )
    ,[image, name, price, discountPercentage, description, category])

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    }

    // const token = localStorage.getItem('token');
    // const headers = {
    //   'Content-Type': 'application/json',
    //   'Authorization': `${token}`
    // };
    
   

    const handleAddProduct = () => {
        // setNewProductData(event);
        const accessToken = localStorage.getItem('token');
        console.log(accessToken);
        fetch('http://localhost:3000/product/new', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${accessToken}`
            },
            body: JSON.stringify(newProductData)
           })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            // do something with the response data if needed
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }
    // const handleAddProduct = (event) => {
    //     setNewProductData(event);
    //     fetch('http://localhost:3000/authenticate', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(newProductData)
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //       const token = data.token;
    //       fetch('http://localhost:3000/product/new', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'Authorization': `Bearer ${token}`
    //         },
    //         body: JSON.stringify(newProductData)
    //       })
    //       .then(response => response.json())
    //       .then(data => {
    //         console.log('Success:', data);
    //         // do something with the response data if needed
    //       })
    //       .catch((error) => {
    //         console.error('Error:', error);
    //       });
    //     })
    //     .catch((error) => {
    //       console.error('Error:', error);
    //     });
    //   }
    

    return (
        <>
            <div className='addAddProduct'>
                <div>
                    <h5>Image URL:</h5>
                    <p>BOY: https://target.scene7.com/is/image/Target/GUEST_f0b8f771-a771-49fd-b965-2000c642f7b1</p>
                    <p>GIRL: https://my-live-01.slatic.net/p/e3b9e8867491b17e1e67604930780f0e.jpg</p>
                    <input type="text" id="image" name="image" value={image} onChange={(event) => setImage(event.target.value)} />
                </div>
                <div>
                    <h5>Name:</h5>
                    <input type="text" id="name" name="name" value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <div>
                    <h5>Price:</h5>
                    <input type="text" id="price" name="price" value={price} onChange={(event) => setPrice(event.target.value)} />
                </div>
                <div>
                    <h5>Discount Percentage:</h5>
                    <input type="text" id="discount_percentage" name="discount_percentage" value={discountPercentage} onChange={(event) => setDiscountPercentage(event.target.value)} />
                </div>
                <div>
                    <h5>Description:</h5>
                    <textarea id="description" name="description" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
                </div>
                <div>
                    <h5>Category:</h5>
                    <select id="category" value={category} onChange={handleCategoryChange}>
                        <option value="">Select category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                {/* [image, name, price, discountPercentage, description, category] */}
                <button onClick={handleAddProduct}>Add Product</button>
            </div>
        </>
    );
};