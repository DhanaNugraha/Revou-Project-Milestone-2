import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import ProductListing from "@/components/ProductListing";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useParams } from "next/navigation";
useParams;

const CategoryList = ({ data }: any) => {
  const router = useRouter();
  const params = useParams();

  const categoryFetched = data.slice(0, 5);
  let categoryId: any = "";

  if (params.categoryId) {
    categoryId = params.categoryId;
  }

  const handleClickCategory = (event: any) => {
    router.push(`/category/${event.target.id}`);
    return;
  };

  const currentCategoryStyling =
    "w-[1fr] transition-[0.25s] border-b-blue-400 text-blue-400 border-b border-solid hover:border-[#646cff] hover:scale-[108%]";

  const CategoryStyling =
    "w-[1fr] transition-[0.25s] rounded-[1px] border-b border-solid hover:border-[#646cff] hover:scale-[108%]";

  const checkCurrentCategory = (categoryID: any, currentCategory: any) => {
    if (categoryID === currentCategory) {
      return currentCategoryStyling;
    } else {
      return CategoryStyling;
    }
  };

  return (
    <>
      <div className="flex justify-around pt-[2%] pb-[4%]">
        <button
            id="categoryAll"
            key="All"
            className={params.categoryId 
                ? CategoryStyling 
                : currentCategoryStyling}
            >
            All
        </button>
        
        {categoryFetched.map((category: any) => (
          <button
            id={category.id}
            key={category.id}
            className={checkCurrentCategory(category.id, categoryId)}
            onClick={handleClickCategory}
          >
            {category.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default CategoryList;
