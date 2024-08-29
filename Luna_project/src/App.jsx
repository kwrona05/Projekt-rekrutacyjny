import { useEffect, useState } from "react";

import Modules from "./Modules";
import "./App.css";

function App() {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch("http://localhost:3001/modules");
        const data = await response.json();

        setModules(data);
      } catch (error) {
        console.error("Module download error", error);
      }
    };

    fetchModules();
  }, []);

  if (modules.length === 0) {
    return <div>loading..</div>;
  }

  return <Modules modules={modules} />;
}
export default App;
