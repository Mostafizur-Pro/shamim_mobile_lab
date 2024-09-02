import { useState, useEffect } from "react";
import SelectInput from "@/components/core/inputs/TextSelect";

const MyCategory = ({
  selectedCategory,
  setSelectedCategory,
  setSelectedSubcategory,
  placeholder,
}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("category.json");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    setSelectedSubcategory("");
  };

  const handleSubcategoryChange = (selectedSubcategory) => {
    setSelectedSubcategory(selectedSubcategory);
  };

  return (
    <div>
      <div className="mb-2">
        <SelectInput
          id="category"
          options={categories.map((category) => ({
            value: category.category,
            label: category.category,
          }))}
          label="Select Category"
          placeholder={placeholder ? placeholder : "Select Category"}
          onChange={(e) => handleCategoryChange(e.target.value)}
          required
        />
      </div>
      {selectedCategory && (
        <div className="mb-2">
          <SelectInput
            id="subcategory"
            options={
              selectedCategory &&
              categories.find((cat) => cat.category === selectedCategory)
                ? categories
                    .find((cat) => cat.category === selectedCategory)
                    .subcategory.map((subcat) => ({
                      value: subcat,
                      label: subcat,
                    }))
                : []
            }
            label="Select Subcategory"
            placeholder="Select Subcategory"
            onChange={(e) => handleSubcategoryChange(e.target.value)}
            required
          />
        </div>
      )}
    </div>
  );
};

export default MyCategory;
