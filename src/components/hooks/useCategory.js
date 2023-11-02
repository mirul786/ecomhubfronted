import { useState, useEffect } from "react";
import axios from "axios";
import { NotificationManager } from "react-notifications";

const useCategory = () => {
  const [categories, setCategories] = useState([]);

  // get all categories
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/all-categories`
      );
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
      NotificationManager.error(
        "Something went wrong while getting all categories",
        "Error"
      );
    }
  };

  //lifecycle method
  useEffect(() => {
    getCategories();
  }, []);
  return categories;
};

export default useCategory;
