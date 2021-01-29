import React , {useState} from "react";
import {Link} from 'react-router-dom';
import Layout from "../core/layout";
import {signup} from '../auth/index'

const Signup =()=> {
     const [valus,setValus]=useState({
       name : '',
       email : '',
       password : '',
       error : '',
       success: false
     })

     const {name ,email ,password ,success ,error} =valus


     const handleChange = name =>event=>{
       setValus({...valus,error:false,[name]:event.target.value})

     }
     
     const clickSubmit = (event)=>{
       event.preventDefault();
       setValus({...valus , error: false})
       signup({name,email,password})
       .then(data=>{
         if(data.error){
           setValus({...valus,error:data.error, success:false})
         }else{
           setValus({
             ...valus,
             name:'',
             email:'',
             password:'',
             error:'',
             success:true
           })
         }

       })
}

     

    const signUpForm = ()=>( 
      <form>
        <div className='form-group'>
          <label className='text-muted'>Name</label>
          <input onChange={handleChange('name')} type='text' className='form-control' value={name}/>
        </div>

        <div className='form-group'>
          <label className='text-muted'>Email</label>
          <input onChange={handleChange('email')} type='email' className='form-control' value={email}/>
        </div>

        <div className='form-group'>
          <label className='text-muted'>Password</label>
          <input onChange={handleChange('password')} type='password' className='form-control' value={password}/>
        </div>
        <br />
        <button onClick={clickSubmit} className='btn btn-primary'>signup</button>
      </form>
    );
    
    const showError = ()=>(
      <div className='alert alert-danger' style={{display:error ?'':'none'}}>
        {error}
      </div>
    )
    const showSuccess = ()=>(
      <div className='alert alert-info' style={{display:success ?'':'none'}}>
        New accont is created<Link to="/signin">Signin</Link>
      </div>
    )


   return(
     <div>
    <Layout title='Signup Page' description='My Stor App' className='container col-md-8 offset-md-2'>
       {showSuccess()}
       {showError()}
       {signUpForm()}
       {JSON.stringify(valus)}
    </Layout>
     </div>
   )

}
  

      
    

export default Signup;