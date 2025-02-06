

const SortProduct = ({setSortValue}: any) => {

    const onChangeHandler = (event: any) => {
        setSortValue(event.target.value);
    };

  return (
    <>  <fieldset className="sortProductContainer">
            <label htmlFor="sortProduct">Sort By:</label>

            <select name="sortDropdown" defaultValue={"default"} id="sortProduct" onClick={onChangeHandler}>

                <option value="default" disabled>Default</option>

                <option>Lowest Price</option>

                <option>Highest Price</option>

                <option>A - Z</option>

                <option>Z - A</option>

            </select>
        </fieldset>
    </>
  )
}

export default SortProduct