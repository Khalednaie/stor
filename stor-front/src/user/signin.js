import React , {useState} from "react";
import { Redirect} from 'react-router-dom';
import Layout from "../core/layout";
import {signin ,authenticate, isAuthenticated} from '../auth/index'

const Signin =()=> {
     const [valus,setValus]=useState({
       email : '',
       password : '',
       error : '',
       loading: false,
       redirectToReferrer:false,


     }) 

     const {email ,password ,loading , redirectToReferrer,error} =valus
     const {user} = isAuthenticated()


     const handleChange = name =>event=>{
       setValus({...valus,error:false,[name]:event.target.value})

     }
     
     const clickSubmit = (event)=>{
       event.preventDefault();
       setValus({...valus , error: false , loading:true})
       signin({email,password})
       .then(data=>{
         if(data.error){
           setValus({...valus,error:data.error, loading:false})
         }else{
           authenticate(data,()=>{
            setValus({
             ...valus,
             redirectToReferrer:true
           })   
           })
         }

       })
}

     

    const signinForm = ()=>( 
      <form>
        <div className='form-group'>
          <label className='text-muted'>Email</label>
          <input onChange={handleChange('email')} type='email' className='form-control' value={email}/>
        </div>

        <div className='form-group'>
          <label className='text-muted'>Password</label>
          <input onChange={handleChange('password')} type='password' className='form-control' value={password}/>
        </div>
        <br />
        <button onClick={clickSubmit} className='btn btn-primary'>signin</button>
      </form>
    );
    
    const showError = ()=>(
      <div className='alert alert-danger' style={{display:error ?'':'none'}}>
        {error}
      </div>
    )
    const showLoadeing = ()=>
        loading &&(
      <div className='alert alert-info' style={{display:loading ?'':'none'}}>
        <h2>loading...</h2>
      </div>)
    
    const redirectUser =()=>{
        if(redirectToReferrer){
            if(user && user.role ===1){
              return <Redirect to='/admin/dashboard' />
            }else{
              return <Redirect to='/user/dashboard' />
            }
        }
        if(isAuthenticated()){
          return <Redirect to='/' />
        }
    }


   return(
     <div>
    <Layout title='Signin Page' description='My Stor App' className='container col-md-8 offset-md-2'>
       {showLoadeing()}
       {showError()}
       {signinForm()}
       {redirectUser()}
       {/* {JSON.stringify(valus)} */}
    </Layout>
     </div>
   )

}
  

      
    

export default Signin;