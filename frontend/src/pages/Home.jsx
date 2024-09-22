import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "./utils";

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged Out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8000/products";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };

      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
      setProducts(result);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h1>Welcome, {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {products.length > 0 ? (
          products.map((item) => (
            <ul key={item.id}>
              <li>
                <span>
                  {item.name}: {item.price}
                </span>
              </li>
            </ul>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
