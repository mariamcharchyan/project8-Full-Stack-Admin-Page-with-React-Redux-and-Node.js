import './LoggedInAdmin.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchLoginForm } from "../reducerLoginForm";
import { useState } from 'react';
import AdminPart from './AdminPart/AdminPart';
import Warning from './Services/Warning/Warning';
import GetProduct from './Services/GetProduct/GetProduct';
import DeleteProduct from './Services/DeleteProduct/DeleteProduct';
import AddProduct from './Services/AddProduct/AddProduct';
import UpdateProduct from './Services/UpdateProduct/UpdateProduct';
import CRUD_Category from './Services/CRUDcategory/CRUDcategory';


export default function LoggedInAdmin(){

    //for admin or services data
    const [adminOrServices, setAdminOrServices] = useState(true);

    function AdminOrServices(truORfalse) {
        setAdminOrServices(truORfalse);
    }

    //for acardion in services
    const [services, setServices] = useState({
        warning: true,
        getProduct: false,
        deleteProduct: false,
        addProduct: false,
        updateProduct: false,
        CRUDcategory:false,
        // getCategory: false,
        // deleteCategory: false,
        // addCategory: false,
        // updateCategory: false
    });
    console.log(services);
    function setService(key) {
        setServices(() => {
            const newServices = {};
            for (let service in services) {
                if (service === key) {
                    newServices[service] = true;
                }else{
                    newServices[service] = false;
                }
            }
            return newServices;
        });
    }

    //for Logout button
    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(fetchLoginForm(null, null));
        localStorage.clear();
        navigate("/login");
    }

    return (
        <div className='containerAdmin'>
            <div className='containerAdminBox'>
                <div className='containerAdminTop'>
                    {adminOrServices ?
                    <button onClick={() => AdminOrServices(false)}>Services</button>
                    : 
                    <button onClick={() => AdminOrServices(true)}>My Data</button>
                    }
                    <h1>ADMIN</h1>
                    <button onClick={handleLogout}>Logout</button>
                </div>
                <div className='containerAdminBottom'>

                {adminOrServices ?
                 <AdminPart />
                 : 
                 <>
                    <div className='containerAdminLeft'>
                        <h2>Services</h2>
                        <ul>
                            <h2>Products</h2>
                            <li onClick={() => setService("addProduct")}>Add Product</li>
                            <li onClick={() => setService("getProduct")}>Get Product</li>
                            <li onClick={() => setService("deleteProduct")}>Delete Product</li>
                            <li onClick={() => setService("updateProduct")}>Update Product</li>
                        </ul>
                        <ul>
                            <h2>Categories</h2>
                            <li onClick={() => setService("CRUDcategory")}>CRAD Category</li>
                        </ul>
                    </div>
                    <div  className='containerAdminRight'>
                    {services.warning ? <Warning /> : null}
                    {services.addProduct ? <AddProduct /> : null}
                    {services.getProduct ? <GetProduct /> : null}
                    {services.deleteProduct ? <DeleteProduct /> : null}
                    {services.updateProduct ? <UpdateProduct /> : null}
                    {services.CRUDcategory ? <CRUD_Category /> : null}
                    </div>
                    </>
                 }
                    
                </div>
            </div>
        </div>
    );
};