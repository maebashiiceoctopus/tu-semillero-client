import React from 'react';
import { useParams } from 'react-router-dom';
import HomeBanner from "../components/Home/HomeBanner";

export default function BlogPosts(props){
    console.log(props)

    const info= useParams();
    console.log(info)

    const {url}=useParams();
    return (
        <>
       
        <div>
            {url ? (<h1>soy el post </h1>): (<>
                < HomeBanner/> <h1> soy el post</h1></> )}
        </div>
        </>
        
    )
}