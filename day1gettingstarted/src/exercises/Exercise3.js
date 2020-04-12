import React, {useState, useEffect} from 'react';

function Exercise3() {
  const [joke, setJoke] = useState("Press the button for joke!");
  const [jokeTimer, setJokeTimer] = useState("This is the joke timer");
  function getJoke(){
    fetch("https://api.chucknorris.io/jokes/random")
    .then(res =>res.json())
    .then(data => setJoke(data.value))
  }
  useEffect(() => {
    const interval = setInterval(() => {
      const header =  {
        headers: {
             Accept: 'application/json'
        }
     }
      fetch("https://icanhazdadjoke.com",header)
      .then(res =>res.json())
      .then(data => setJokeTimer(data.joke))
    }, 10000);
    return function cleanup(){
      clearInterval(interval);
    }
  },[jokeTimer])


  return (
    <div>
      <button onClick={() => getJoke()}>Get Joke</button>
      <p>Jokes</p>
      <p>{joke}</p>
      <h1>Joke interval 10 seconds under here</h1>
      <p>{jokeTimer}</p>
    </div>
  );
}


export default Exercise3;