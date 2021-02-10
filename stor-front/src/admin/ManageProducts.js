import {useEffect, useState} from 'react'
import Layout from '../core/layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {getProducts,deleteProduct} from './apiAdmin'

const ManageProducts=()=>{
    const[products,setProducts]=useState([])
    const {user,token}=isAuthenticated()
    const loadProducts = ()=>{
        getProducts().then(data=>{
            if(data.error){
                console.log(data.error)
            } else {
                setProducts(data)
             }
        })
    }

    const destroy =  productId =>{
        console.log(productId)
       deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    useEffect(()=>{
        loadProducts();
        destroy();
    },[])
 return (
        <Layout
            title="Manage Products"
            description="Prform CRUD on Products"
            className="container-fluid"
        >
            <div className='row'>
                <div className='col-12'>
                    <h2 className='text-center'>Total {products.length} Products</h2>
                    <hr/>
                    <ul className='list-group'>
                       {products.map((p,i)=>(
                            <li key={i} className='list-group-item'>
                                <strong>{p.name}</strong>
                                <Link to={`/admin/product/update/${p._id}`}>
                                    <span className=''>Update</span>
                                </Link>
                                <span onClick={()=> destroy(p._id)} className=''>Delete</span>
                            </li>
                       ))}
                    </ul>
                </div>
            </div>
           
        </Layout>
    );
}

export default ManageProducts;