import React, {useState, useEffect, useContext} from 'react';
import finnHubApi from '../assets/api/finnHubApi';
import { stockListContext } from '../context/StockListContext';

const Search = () => {

    //for search
    const [search, setSearch] = useState("")
    //to save the results 
    const [results, setResults] = useState([])
    //context
    const {addStock} = useContext(stockListContext)

    //to fetch data
    useEffect(()=>{
        const fetchData= async () => {
            try{
                const response = await finnHubApi.get("/search", {
                    params:{
                        q:search
                    }
                })
                console.log(response)
                setResults(response.data.result)
            } catch (err){
                console.log(err)
            }
        }

        if (search.length>0){
            fetchData()
        } else {
            setResults([])
          }
        
    },[search]) //useEffect will only run when the search changes 

    const renderDropdown = () => {
        const dropDownClass = search ? "show" : null //if search has any result show or null
        return (
          <ul style={{
            height: "500px",
            overflowY: "scroll",
            overflowX: "hidden",
            cursor: "pointer"
          }} className={`dropdown-menu ${dropDownClass}`}>
            {results.map((result) => {
              return (
                <li onClick={() => {
                  addStock(result.symbol)
                  setSearch("") //to hide dropdown
                }} key={result.symbol} className="dropdown-item">{result.description} ({result.symbol})</li>
              )
            })}
          </ul>
        )
      }

    return (
        <div className='w-50 p-5 rounded mx-auto'>
            <div className='form-floating dropdown'>
            <input style={{ backgroundColor: "rgba(145, 158, 171, 0.04)" }} 
                id="search" 
                type="text" 
                className="form-control" 
                placeholder="Search" 
                autoComplete="off"
                value={search}
                onChange={(event)=> setSearch(event.target.value)}
            />
            <label htmlFor="search">Search</label>
            {renderDropdown()}
            </div>
        </div>
    );
};

export default Search;