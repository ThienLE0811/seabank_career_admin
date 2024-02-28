
import './App.css';
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"


function App() {
  return (
    <div className="App">
      <SwaggerUI url="./swagger-api.json" displayRequestDuration={true} />
    </div>
  );
}

export default App;
