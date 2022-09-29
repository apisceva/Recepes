import React, { useContext, createContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = createContext();

const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const fetchMeals = async (url) => {
    setLoading(true);
    try {
      const { data } = await axios(url);
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    } catch (e) {
      console.log(e.response);
    }
    setLoading(false);
  };

  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl);
  };

  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, []);

  useEffect(() => {
    if (!searchTerm) return;

    fetchMeals(`${allMealsUrl}${searchTerm}`);
  }, [searchTerm]);

  return (
    <AppContext.Provider
      value={{ loading, meals, setSearchTerm, fetchRandomMeal, showModal }}
    >
      {" "}
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
