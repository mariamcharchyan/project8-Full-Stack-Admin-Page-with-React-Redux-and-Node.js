import './LoggedInAdmin.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchLoginForm } from "../reducerLoginForm";
import { useState } from 'react';
import AdminPart from './AdminPart/AdminPart';
import GetProduct from './Services/GetProduct/GetProduct';
import DeleteProduct from './Services/DeleteProduct/DeleteProduct';
import AddProduct from './Services/AddProduct/AddProduct';
import UpdateProduct from './Services/UpdateProduct/UpdateProduct';
import GetCategory from './Services/GetCategory/GetCategory';
import DeleteCategory from './Services/DeleteCategory/DeleteCategory';
import AddCategory from './Services/AddCategory/AddCategory';
import UpdateCategory from './Services/UpdateCategory/UpdateCategory';

export default function LoggedInAdmin(){
    //for admin or services data
    const [adminOrServices, setAdminOrServices] = useState(true);

    function AdminOrServices(truORfalse) {
        setAdminOrServices(truORfalse);
    }

    //for acardion in services
    const [services, setServices] = useState({
        adminPart: true,
        getProduct: false,
        deleteProduct: false,
        addProduct: false,
        updateProduct: false,
        getCategory: false,
        deleteCategory: false,
        addCategory: false,
        updateCategory: false
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
                    <h1>Welcome Admin!</h1>
                    <button onClick={() => AdminOrServices(true)}>My Data</button>
                    <button onClick={() => AdminOrServices(false)}>Services</button>
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
                            <li onClick={() => setService("getProduct")}>Get Product</li>
                            <li onClick={() => setService("deleteProduct")}>Delete Product</li>
                            <li onClick={() => setService("addProduct")}>Add Product</li>
                            <li onClick={() => setService("updateProduct")}>Update Product</li>
                        </ul>
                        <ul>
                            <h2>Categories</h2>
                            <li onClick={() => setService("getCategory")}>Get Category</li>
                            <li onClick={() => setService("deleteCategory")}>Delete Category</li>
                            <li onClick={() => setService("addCategory")}>Add Category</li>
                            <li onClick={() => setService("updateCategory")}>Update Category</li>
                        </ul>
                    </div>
                    <div  className='containerAdminRight'>
                    {services.getProduct ? <GetProduct /> : null}
                    {services.deleteProduct ? <DeleteProduct /> : null}
                    {services.addProduct ? <AddProduct /> : null}
                    {services.updateProduct ? <UpdateProduct /> : null}
                    {services.getCategory ? <GetCategory /> : null}
                    {services.deleteCategory ? <DeleteCategory /> : null}
                    {services.addCategory ? <AddCategory /> : null}
                    {services.updateCategory ? <UpdateCategory /> : null}
                    </div>
                    </>
                 }
                    
                </div>
            </div>
        </div>
    );
};