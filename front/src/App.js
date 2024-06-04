import { useContext } from "react";

import AuthContext from "./context/AuthContext";




function App() {
  const { logoutUser } = useContext(AuthContext);
  return (
    <div className="App">
      <h1>INICIO</h1>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
}

export default App;
