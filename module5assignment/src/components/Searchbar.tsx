const Searchbar = ({searchProduct, setSearchProduct}:any) => {

  return (
        <form className="searchbarForm">
            <fieldset className="searchbarFieldset">
                <input 
                type="search" 
                name="searchbar" 
                id="searchbar" 
                placeholder="Search Product..."
                value={searchProduct} 
                onChange={(event) => {setSearchProduct(event.target.value)}} />
            </fieldset>
        </form>
    )
}

export default Searchbar;