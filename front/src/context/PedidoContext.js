import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { getPedidos } from '../service/pedidos';


const initialState = {
    cliente: null,
    producto: null,
    cantidad: null,
    items: [],
    editPedido:null,
    errors:null

}

function pedidoReducer(state, action) {
    switch (action.type) {
        case 'select customer':
            return {
                ...state, cliente: action.payload
            }
        case 'select product':
            return {
                ...state, producto: action.payload
            }
        case 'select quantity':
            return {
                ...state, cantidad: action.payload
            }
        case 'add item':
            return {
                ...state,
                items: [...state.items, action.payload]
            };

        default:
            return state;

        case 'delete item':
            return { ...state, items: state.items.filter((_, index) => index !== action.payload) }

        case 'restart':
            return initialState

        case 'select pedido edit':
            return { ...state, editPedido: action.payload }
        case 'select customer edit':
            return { ...state, editPedido: { ...state.editPedido, cliente: action.payload } };
        case 'add quantity item edit':
            return { 
                ...state, 
                editPedido: {
                    ...state.editPedido, 
                    items: state.editPedido.items.map((item, idx) => 
                        idx === action.payload.index ? { ...item, cantidad: action.payload.cantidad, total_item:action.payload.cantidad * item.producto.precio } : item
                    )
                } 
            };
        case 'set error':
            return {...state, errors: {...state.errors, [action.payload.name]:action.payload.value}}
        
    }
}
const PedidoContext = createContext();

export const usePedido = () => useContext(PedidoContext);

export const PedidoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(pedidoReducer, initialState);
    const [pedidos, setPedidos] = useState([])
    const [search, setSearch] = useState({
        q:'', fecha:new Date().toISOString().slice(0,10),
        factura:false, recibo:false
    })


    
    
    const fetchPedidos = async () => {
        const searchParams = new URLSearchParams(search);
       
        try {
            const response = await getPedidos(searchParams);
            setPedidos(response);
        } catch (error) {
            console.error('Error fetching pedidos:', error);
        }
    }
    const updatePedidos = () => {
        fetchPedidos();
    }

    useEffect(() => {
        fetchPedidos()
    }, [search])

    const handleSearch = (e) => {
        const { value, name } = e.target;
        setSearch(prevSearch => ({ ...prevSearch, [name]: value }));
    }
    
    return (
        <PedidoContext.Provider value={{ state, dispatch, pedidos, updatePedidos, handleSearch }}>
            {children}
        </PedidoContext.Provider>
    );
};
