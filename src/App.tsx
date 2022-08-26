import React, { useEffect, useState } from "react";

const App = () => {
const [data, setData] = useState([]);

const fetchApi = async () => {
  const response = await fetch(
    "https://reqres.in/api/users?page=2"
  ).then((res) => res.json());
  setData(response.data);
};

useEffect(() => {
  fetchApi();
}, []);

  return (
    <div>
      React vanilla ss@@
    </div>
  );
};

export default App;