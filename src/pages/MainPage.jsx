import React from 'react';
import CustomTable from '../components/CustomTable';
import {Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const MainPage = () => {

    return (
        <div>
                <h1>
                    MAIN PAGE
                </h1>  
                <Link to = "add">
                    <Button variant = "success" >Создать новый продукт</Button>
                </Link>          
                <CustomTable/>
                <ToastContainer/>
        </div>
    );
};

export default MainPage;