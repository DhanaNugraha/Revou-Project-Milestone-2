
import { useRouter } from "next/router";

const CategoryList = ({ data }: any) => {
  const router = useRouter();

  const categoryFetched = data.slice(0, 5);
  let categoryId: any = "";

  if (router.query.categoryId) {
    categoryId = Number(router.query.categoryId);
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
      <div className="flex justify-around pt-[2%] pb-[2%] normalCategoryList">
        <button
            id="categoryAll"
            key="All"
            className={router.query.categoryId 
                ? CategoryStyling 
                : currentCategoryStyling}
            onClick={() => router.push("/")}
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

      <fieldset className="dropdownCategoryListContainer">
        <div className="categoryContainerRight">
          <label htmlFor="categoryListDropdown">Category:</label>

          <select name="categoryDropdown" defaultValue={"default"} id="categoryListDropdown">

              <option
                id="categoryAll"
                key="All"
                className={router.query.categoryId 
                    ? CategoryStyling 
                    : currentCategoryStyling}
                onClick={() => router.push("/")}
              >
                All
              </option>

              {categoryFetched.map((category: any) => (
                <option
                  id={category.id}
                  key={category.id}
                  className={checkCurrentCategory(category.id, categoryId)}
                  onClick={handleClickCategory}
                >
                  {category.name}
                </option>
              ))}

          </select>
        </div>
      </fieldset>
    </>
  );
};

export default CategoryList;
