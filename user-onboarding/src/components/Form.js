import React, {useState, useEffect} from 'react';
import {withFormik,Form,Field} from 'formik';
import * as Yup from "yup";
import axios from 'axios';


function UserForm(props){

    const [users, setUsers] = useState([]);



    return(
        <div>
        <Form>
        <Field></Field>
        <Field></Field>
        <Field></Field>
        <Field></Field>
        <button>submit</button>
        
        
        
        
        </Form>
        </div>










    )




}




export default FormikForm