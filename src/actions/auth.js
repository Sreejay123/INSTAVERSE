import * as api from '../api'
import { AUTH } from '../constants/actionTypes';
// import { useNavigate } from 'react-router-dom';

export const signin=(FormData,navigate)=>async(dispatch)=>{
    try {

        const {data} = await api.signIn(FormData)

        dispatch({type : AUTH,data})

        navigate('/')

    } catch (error) {

        console.log(error);
    }

}
export const signup=(FormData,navigate)=>async(dispatch)=>{

    try {
        const {data} = await api.signUp(FormData)

        dispatch({type : AUTH,data})

        navigate('/')

    } catch (error) {

        console.log(error);
    }

}