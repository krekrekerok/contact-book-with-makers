import axios from 'axios';
import React, { useReducer } from 'react';
import { toast } from 'react-toastify';
import { API } from '../helpers/const';
// создаётся контекст
export const productContext =  React.createContext()

// состояние по умолчанию
const INIT_STATE = {
    products: null,
    productToEdit: null
}

// меняет state
const reducer = (state = INIT_STATE, action) =>{
    switch(action.type) {
        case "GET_PRODUCTS":
            return {...state, products: action.payload}
        case "GET_PRODUCT_TO_EDIT":
            return {...state, productToEdit: action.payload}
        default:
            return{...state}
    }
}

// state создается в провайдере с помощью useReducer
// логика и бд
const ProductsContextProvider = ({children}) => {

    // useReducer хук - принимает reducer и знач.по умолч. и возвращает массив c двумя элементами: state и dispatch который вызывает reducer(меняет state)
    // useState хук - принимает знач.по умолч. и возвращает два массива: state(состояние) и setState который меняет состояние 
    // dipatch({action: type, payload(obj)}) - если меняется состояние
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const addProduct = async(newProduct)=>{
        try {
            await axios.post('http://localhost:8005/products', newProduct)
            toast("Удачно создано!")
        } catch (e){
            toast("Ошибка приложения. Попробуйте ещё раз")
        }
}

    const getProducts = async() =>{
        const {data} = await axios(API)
        dispatch({
            type: "GET_PRODUCTS",
            payload: data
        })
    }

    const deleteProduct = async (id) =>{
        await axios.delete(`${API}/${id}`)
        getProducts()
    }

    const getProductToEdit = async (id) => {
        const {data} = await axios(`${API}/${id}`)
        dispatch({
            type: "GET_PRODUCT_TO_EDIT",
            payload: data
        })
    }

    const saveEditedProduct = async (editedProduct) =>{
        await axios.patch(`${API}/${editedProduct.id}`, editedProduct)
        getProducts()
    }


    return (
        <productContext.Provider value={{
            products: state.products,
            productToEdit: state.productToEdit,
            addProduct,
            getProducts,
            deleteProduct,
            getProductToEdit,
            saveEditedProduct
        }} >
            {children}
        </productContext.Provider>
    );
};

export default ProductsContextProvider;