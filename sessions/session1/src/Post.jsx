import React from "react";

const Post = (props) => {
  const name = props.name;
  const isExcitedAbout = props.isExcitedAbout;
  const likes = props.likes;
  return(
    <div>
    <p>{name}</p>
    <p>{isExcitedAbout}</p>
    <p>&#128155; {likes}</p>
  </div>
  )
  
};

export default Post;
