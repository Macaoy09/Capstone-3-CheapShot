import { useState } from "react";
import ProductCard from "./ProductCard";


const SearchProduct = () => {
    const [ search, setSearch ] = useState('');
    const [ searchResult, setSearchResult ] = useState([]);

    const handleSearch = () => {
        fetch(`${process.env.REACT_APP_API_URL}/products/searchByName`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: search
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            const  filterActiveProducts = data.filter((product) => product.isActive !== false)
            console.log(filterActiveProducts)
            setSearchResult(filterActiveProducts);
        })

    }

    return (
        <div className=" mt-5">
          <h2>Search Product</h2>
          <div className="form-group">
            <label className='mt-2' htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              style={{width: '400px'}}
              placeholder="Search"
              className="form-control mt-2"
              value={search}
              required
              onChange={event => setSearch(event.target.value)}
            />
          </div>
          <button className="btn btn-primary mt-3 mb-5" onClick={handleSearch}>
            Search
          </button>
          {searchResult.length > 0 ?(
            <>
            <h3 className=" mb-5">Search Results:</h3>
            <ul>
              {searchResult.map(product => (
                <ProductCard productProps={product} key={product.id}/>
              ))}
            </ul>
            </>
          ): null}
        </div>
      );
    
}

export default SearchProduct;
    