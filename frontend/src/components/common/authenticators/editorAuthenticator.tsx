import axios from "axios";
import React, {  useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


export default function EditorAuthenticator({children}:{children:React.ReactNode}){
    const BlogApiUrl =import.meta.env.VITE_POST_API_URL
    const {postId} = useParams()
    const navigate = useNavigate()
       useEffect(()=>{
        axios.get(`${BlogApiUrl}/authenticate_editor/${postId}`,{withCredentials:true}).then(resposne=>{
           
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