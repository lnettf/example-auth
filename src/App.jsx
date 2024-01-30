import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchInfo = async () => {
      const response = await axios.get("http://localhost:8000/api/products");
      setProducts(response.data.data);
    };

    fetchInfo();
  }, []);

  return (
    <div>
      <h1>Lista de productos</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h3>
            {product.name} - {product.detail}
          </h3>
        </div>
      ))}
    </div>
  );
}

export default App;
