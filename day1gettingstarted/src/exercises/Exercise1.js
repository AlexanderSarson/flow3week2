import React, { useState, useEffect } from 'react';

function Exercise1(props) {
  const [count, setCount] = useState(props.initialValue);
  const [firstRun, setFirstRun] = useState(true);

  useEffect(() =>{
    if(firstRun){
      setFirstRun(false);
    } else {
      localStorage.setItem("count", count);
    }
  },[count,firstRun])
  return (
    <div className="App">
      <p>Count is: {count}</p>
      <p>last Count is: {localStorage.getItem("count")}</p>
     <button onClick={() => setCount(count + props.incrementValue)}>Increment count</button>
     <button onClick={() => setCount(count - props.incrementValue)}>Decrement count</button>

    </div>
  );
}

export default Exercise1;
