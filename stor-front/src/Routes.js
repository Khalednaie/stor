import { React } from "react";
import { BrowserRouter , Switch ,Route} from "react-router-dom";
import Home from "./core/Home";
import Shop from "./core/Shop"
import Signup from "./user/signup";
import Signin from "./user/signin";
import PrivateRoute from './auth/PrivateRoute';
import AdminRoure from './auth/AdminRoure';
import Dashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashpoard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Product from './core/Product';
import Cart from './core/Cart'
import Order from './admin/orders'
import Profile from './user/Profile';
import ManageProducts from './admin/ManageProducts'
import UpdateProducts from './admin/UpdateProduts'

 
const Routes = ()=>{
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/shop' exact component={Shop} />
                <Route path='/signin' exact component={Signin} />
                <Route path='/signup' exact component={Signup} />
                <PrivateRoute path='/user/dashboard' exact component={Dashboard} />
                <AdminRoure path='/admin/dashboard' exact component={AdminDashboard}/>
                <AdminRoure path='/create/category' exact component={AddCategory}/>
                <AdminRoure path='/create/product' exact component={AddProduct}/>
                <Route path='/product/:productId' exact component={Product} />
                <Route path='/cart' exact component={Cart} />
                <AdminRoure path='/admin/orders' exact component={Order}/>
                <PrivateRoute path='/Profile/:userId' exact component={Profile} />
                <AdminRoure path='/admin/products' exact component={ManageProducts}/>
                <AdminRoure path='/admin/product/update/:productId' exact component={UpdateProducts}/>

                
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;