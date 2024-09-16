import React, {  useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosBlogInstance from "../../../api/AxiosBlogInstance";

export default function EditorAuthenticator({children}:{children:React.ReactNode}){
    const {postId} = useParams()
    const navigate = useNavigate()
       useEffect(()=>{
       axiosBlogInstance.get(`/authenticate_editor/${postId}`,{withCredentials:true}).then(resposne=>{
           
            console.log(resposne.data.status)
            if(!resposne.data.status){
                navigate('/')
            }
        })
       })
        return <>
         {children}
        </>
}