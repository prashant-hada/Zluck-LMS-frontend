import { useMutation } from "@tanstack/react-query"
import {userLogin, userLogout, userRegister} from "./api"

export function useLogin(){
    return useMutation({
        mutationFn: (data)=> userLogin(data),

        onSettled:(data, error)=>{
            if(error)console.error(error);
            console.log(data);
        }
    })
}

export function useRegister(){
    return useMutation({
        mutationFn: (data)=> userRegister(data),

        onSettled:(data, error)=>{
            if(error)console.error(error);
            console.log(data);
        }
    })
}

export function useLogout(){
    return useMutation({
        mutationFn: ()=> userLogout(),

        onSettled:(_, error)=>{
            if(error)console.error(error);
        }
    })
}
