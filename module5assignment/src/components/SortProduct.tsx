

const SortProduct = ({setSortValue}: any) => {

    const onChangeHandler = (event: any) => {
        setSortValue(event.target.value);
    };

  return (
    <>  <fieldset className="sortProductContainer">
            <label htmlFor="sortDropdown">Sort By:</label>

            <select name="sortDropdown" id="sortProduct" onClick={onChangeHandler}>

                <option value="default" selected disabled>Default</option>

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