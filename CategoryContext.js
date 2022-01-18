import React, { useState, useEffect, createContext, useContext } from "react";
import { UserContext } from "./UserContext";

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {
  const { user } = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const [categoryTypes, setCategoryTypes] = useState([
    "Income",
    "Savings",
    "Expense",
  ]);
  const [categoryIcons, setCategoryIcons] = useState([
    "account_balance",
    "shopping_cart",
    "shop",
    "card_giftcard",
    "credit_card",
    "offline_bolt",
    "local_drink",
    "house",
    "local_bar",
    "local_cafe",
    "fastfood",
    "smartphone",
    "devices_other",
    "laptop",
    "computer",
    "local_taxi",
    "commute",
    "train",
    "local_mall",
    "beach_access",
    "local_hospital",
    "pets",
    "fitness_center",
    "flight",
    "school",
    "wifi",
    "people",
    "loyalty",
    "card_membership",
  ]);

  useEffect(() => {
    setCategories(user.categories ?? []);
  }, [user.categories]);

  return (
    <CategoryContext.Provider
      value={{ categories, setCategories, categoryTypes, categoryIcons }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};
