import { useEffect } from "react";
import axios from 'axios'




function App() {
  useEffect(()=> {
    axios.get('http://127.0.0.1:8000/')
    .then(res=>console.log(res))
  }, [])
  return (
    <div className="App">
      <h1>asd</h1>
    </div>
  );
}

export default App;
