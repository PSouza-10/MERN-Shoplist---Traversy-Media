import {GET_item,ADD_item, DEL_item,ITEMS_loading} from './types'
import axios from 'axios'

export const getItem = () => dispatch => {
    dispatch(setItemsLoading())
    axios
        .get('/api/items')
        .then(res =>
            dispatch({
                type:GET_item,
                payload: res.data
            })
        )
}

export const delItem = id => dispatch => {
    axios
    .delete(`/api/items/${id}`)
    .then(res =>
        dispatch({
            type: DEL_item,
            payload: id
        })
    )
}

    
    
    
    
   


export const addItem = item => dispatch => {
    axios
        .post('/api/items',item)
        .then(res =>
            dispatch({
                type: ADD_item,
                payload: res.data
            })    
        )
}

export const setItemsLoading = () => {
    return{
        type: ITEMS_loading
    }
}