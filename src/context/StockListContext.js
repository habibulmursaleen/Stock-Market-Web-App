import  React, {createContext, useState, useEffect } from "react";

export const stockListContext = createContext()

const StockListContextProvider = (props) => {
    //For the Table list
    const [stockList, setStockList] = useState(["GOOGL", "MSFT", "AMZN", "META"])

    // adding a new stock
    const addStock =(stock)=>{
        //to avoid duplicate
        if(stockList.indexOf(stock)=== -1){
            setStockList([...stockList, stock])
        }
    }

    //deleting a stock
    //it will go through the stocklist and find all the entries that do not match, if no not match we keep it but if matched we delete
    const deleteStock =(stock)=>{
        setStockList(stockList.filter((item)=>{
            return item !==stock
        }))
    }

    //local storage
    useEffect(() => {
        localStorage.setItem("stockList", stockList)
      }, [stockList])
    
    return (<stockListContext.Provider value={{stockList, addStock, deleteStock}}> 
    {props.children}
    </stockListContext.Provider>)
};

export default StockListContextProvider;