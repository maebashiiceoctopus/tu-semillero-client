import React from "react";
import { Row, Col } from "antd";

import { useParams } from "react-router-dom";
import HomeBanner from "../components/Home/HomeBanner";
import PostInfo from "../components/PostInfo";
import PostList from "../components/PostList";



export default function BlogPosts(props) {
  console.log(props);

  const info = useParams();
  console.log(info);

  const { url } = useParams();
  const { location, history } = props;

  return (
    <>
     
          {url ? (
            <PostInfo url={url} />
          ) : (
              <> < HomeBanner/>
               <PostList location={location} history={history} />
              
              </>
          
          )}
      
   

      {/*      <div>
            {url ? (<h1>soy el post </h1>): (<>
                 <h1> soy el post</h1></> )}
        </div> */}
    </>
  );
}
