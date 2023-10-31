import React from "react";
import ProjectData from "./Components/Projects";

function App() {
  const wpApiUrl = 'http://localhost:8888/portfolio/wp-json/wp/v2/';


  return (
    <div>
      <ProjectData apiUrl={wpApiUrl}/>
    </div>
  );
}

export default App;
