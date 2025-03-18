import React, { useState } from "react";
import ChartComponent from "./components/Chart";
import CRUD from "./components/CRUD";
import Search from "./components/Search";

const App = () => {
  const [showCRUD, setShowCRUD] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div>
      <h1>Google Sheets CRUD App</h1>

      <div>
        <button onClick={() => setShowCRUD(!showCRUD)}>Toggle CRUD</button>
        <button onClick={() => setShowSearch(!showSearch)}>Toggle Search</button>
      </div>

      {showSearch && <Search />}
      {showCRUD && <CRUD />}
      <ChartComponent data={{ open: 10, closed: 15, pending: 5 }} />
    </div>
  );
};

export default App;
