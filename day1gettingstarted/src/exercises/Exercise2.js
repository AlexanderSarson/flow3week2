import React, {useState, useEffect} from 'react';


export default function Exercise2(){

  const [time, setTime] = useState("");
  useEffect(() => {
    setTime(new Date().toLocaleString());
    const interval = setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000)
    return function cleanup(){
      clearInterval(interval);
    }
  },[time])

  return (
    <div>
      <p>The time is: {time}</p>
    </div>
  )
}