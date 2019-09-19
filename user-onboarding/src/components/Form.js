import React, {useState, useEffect} from 'react';
import {withFormik,Form,Field} from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import styled from 'styled-components';

const StyledForm = styled.div`
    display:flex;
    flex-direction: column;
    width: 40%;
    margin: 0 auto; 
    justify-content:space-around;
`;

const FormContainer = styled.div`
    display:flex;
    flex-direction:column;
    border: 1px solid black;
    width: 60%;
    margin: 0 auto;
    padding: 1% 3% 4% 3%;
    margin-top: 2%;
    justify-content: center;

`;


const StyledUL = styled.ul`
    display:flex;
    flex-direction:column;
    width: 30%;
    margin: 0 auto;
    align-items:flex-start;
    padding:3% 0 3% 10%;
`;




function UserForm({values,errors,touched,status}){

    const [users, setUsers] = useState([]);

    useEffect(
        () =>{
        
       status && setUsers(users => [...users,status]);     
    },
    [status]
    );



    return(
    <FormContainer>
        <React.Fragment>
        <h1>User Form</h1>
        </React.Fragment>
        <Form>
            <StyledForm>
                <Field type="text" name="name" placeholder="Name" />
                {touched.name && errors.name && (<p>{errors.name}</p>)}
                <Field type="text" name="email" placeholder="Email" />
                {touched.email && errors.email && (<p>{errors.email}</p>)}
                <Field type="password" name="password" placeholder="Password" />
                {touched.password && errors.password && (<p>{errors.password}</p>)}
                <Field type="checkbox" name="tos" placeholder="Terms of Service" checked={values.tos}/>
                <button type="submit">submit</button>
            </StyledForm>
        </Form>
            {users.map(user =>(
                <div>
                <StyledUL key={user.id}>
                <li>{user.name}</li>
                <li>{user.email}</li>
                <li>{user.password}</li>
                </StyledUL> 
                </div>
            ))}
    </FormContainer>
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