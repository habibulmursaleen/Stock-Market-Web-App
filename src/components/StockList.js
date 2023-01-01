import React, { useEffect, useState, useContext } from 'react';
import finnHubApi from '../assets/api/finnHubApi';
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs"
import { stockListContext } from '../context/StockListContext';
import { useNavigate } from 'react-router-dom';
import '../../src/App.css'

const StockList = () => {

    //Saving the data from api response
    const [stock, setStock] = useState()
    const {stockList, deleteStock} = useContext(stockListContext)
    const navigate = useNavigate()

    const changeColor = (change) => {
        return change > 0 ? "success" : "danger"
    }
    const renderIcon = (change) => {
        return change > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />
    }

    const handleStockSelect = (symbol) =>{
        navigate(`details/${symbol}`) //passing the url to go 
    }

    //using "useEffect" hooks for data fetching from finnHub API
    useEffect(()=>{
        const fetchData= async () =>{ 
            try{ 
                //"promise" to handle multiple api request at once in asynchronous operation
                const responses = await Promise.all(stockList.map((stock) => {
                    return finnHubApi.get("/quote", {  
                        params:{
                            symbol: stock
                        }
                    })
                })) 

                //to get only data and symbol I put it in a object and return it
                const data = responses.map((response)=>{
                    return {
                        data: response.data,
                        symbol: response.config.params.symbol
                    }
                })
                setStock(data) //saving the response data in useState
                console.log(data)
            } catch (err){
                console.log(err)
            }
        }

        fetchData()
    },[stockList]) 

    return (
        <div>
            <table className='table hover mt-5'>
                <thead style={{color: "rgb(79,89,102)"}}>
                    <tr>
                        <th scope='col'> Name </th>
                        <th scope='col'> Last </th>
                        <th scope='col'> Chg </th>
                        <th scope='col'> Chg% </th>
                        <th scope='col'> High </th>
                        <th scope='col'> Low </th>
                        <th scope='col'> Open </th>
                        <th scope='col'> Pclose </th>
                        <th scope='col'>  </th>
                        <th scope='col'>  </th>
                    </tr>
                </thead>
                <tbody>
                    {/* {} to add some javascript  */}
                    {stock?.map((stockData)=> {
                        return (
                            <tr className='table-row' key ={stockData.symbol}>
                                <th scope='row'>{stockData.symbol}</th>
                                <td>{stockData.data.c}</td>
                                <td className={`text-${changeColor(stockData.data.d)}`}>{stockData.data.d} {renderIcon(stockData.data.d)}</td>
                                <td className={`text-${changeColor(stockData.data.dp)}`}>{stockData.data.dp} {renderIcon(stockData.data.dp)} </td>
                                <td>{stockData.data.h}</td>
                                <td>{stockData.data.l}</td>
                                <td>{stockData.data.o}</td>
                                <td>{stockData.data.pc}</td>
                                <td> 
                                    <button className="btn btn-success btn-sm ml-3 d-inline-block hover-button" 
                                            onClick={()=>handleStockSelect(stockData.symbol)} >Details</button>
                                </td>
                                <td > 
                                    <button className="btn btn-danger btn-sm ml-3 d-inline-block hover-button" 
                                            
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                deleteStock(stockData.symbol)
                                            }}>Remove</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default StockList;