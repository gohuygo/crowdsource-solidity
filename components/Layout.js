import React from 'react';


export default(props) => {
  return(
    <div>
      <h1> HEADER </h1>
      {props.children}
      <h1> FOOTER </h1>
    </div>
  )
};
