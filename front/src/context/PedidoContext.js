import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { getPedidos } from '../service/pedidos';


const initialState = {
    cliente: null,
    producto: null,
    cantidad: null,
    items: []
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
    }
}
const PedidoContext = createContext();

export const usePedido = () => useContext(PedidoContext);

export const PedidoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(pedidoReducer, initialState);
    const [pedidos, setPedidos] = useState([])

    const fetchPedidos = async () => {
        try {
            const response = await getPedidos();
            setPedidos(response);
        } catch (error) {
            console.error('Error fetching pedidos:', error);
        }
    }
    const updatePedidos = async () => {
        await fetchPedidos()
    }
    useEffect(() => {
        fetchPedidos()
    }, [])


    return (
        <PedidoContext.Provider value={{ state, dispatch, pedidos, updatePedidos }}>
            {children}
        </PedidoContext.Provider>
    );
};
