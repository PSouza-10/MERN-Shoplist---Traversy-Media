
import {GET_item,ADD_item, DEL_item,ITEMS_loading} from '../actions/types'


const IniState = {
    items : [],
    loading: false
}

export default function (state = IniState, action){
    switch(action.type){
        case GET_item:
            return{
                ...state,
                items : action.payload,
                loading: false
            }
        case DEL_item:
            return{
                ...state,
                items : state.items.filter(item => item._id !== action.payload )    
            }
        case ADD_item : 
            return{
                ...state,
                items: [action.payload, ...state.items]
            }
        case ITEMS_loading:
            return{
                ...state,
                loading: true
            }
        default:
            return state;
    }
}