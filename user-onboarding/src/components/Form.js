import React, {useState, useEffect} from 'react';
import {withFormik,Form,Field} from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import styled from 'styled-components';


function UserForm({values,errors,touched,status}){

    const [users, setUsers] = useState([]);

    useEffect(
        () =>{
        
       status && setUsers(users => [...users,status]);     
    },
    [status]
    );



    return(
    <div>
        <Form>
        <Field type="text" name="name" placeholder="Name" />
        {touched.name && errors.name && (<p>{errors.name}</p>)}
        <Field type="text" name="email" placeholder="Email" />
        {touched.email && errors.email && (<p>{errors.email}</p>)}
        <Field type="password" name="password" placeholder="Password" />
        {touched.password && errors.password && (<p>{errors.password}</p>)}
        <Field type="checkbox" name="tos" placeholder="Terms of Service" />
        <button>submit</button>
        </Form>
        {users.map(user =>(
            <ul key={user.id}>
            <li>{user.name}</li>
            <li>{user.email}</li>
            <li>{user.password}</li>
            </ul>
            ))}
    </div>
    );
};


const FormikUserForm = withFormik({
    mapPropsToValues({name,email,password}){
        return{
            name: name || "",
            email: email || "",
            password: password || ""
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("Please provide a name"),
        email: Yup.string().required("Please provide an email"),
        password:  Yup.string().required("Please enter your password")
    }),
    handleSubmit(values, {setStatus}){
        axios.post('https://reqres.in/api/users', values)
        .then(response =>{
            setStatus(response.data);
        })
        .catch(error => console.log(error.response))
        }
    })(UserForm);

export default FormikUserForm;