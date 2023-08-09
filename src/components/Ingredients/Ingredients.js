import React,{ useState, useCallback, useReducer} from 'react';
import IngredientList from "./IngredientList"
import IngredientForm from './IngredientForm';
import Search from './Search';
import ErrorModal from "../UI/ErrorModal"


const ingredientReducer=(currentIngredients, action)=>{
           switch (action.type){
            case "SET":
              return action.ingredients;
            case "ADD":
              return [...currentIngredients,action.ingredient];
            case "DELETE":
              return currentIngredients.filter(ing=>ing.id!==action.id)
            default:
              throw new Error()
           }
}

const httpReducer=(curHttpState,action)=>{
  switch (action.type){
    case "SEND":
      return {loading:true,error: null}
    case "RESPONSE":
      return {...curHttpState,loading:false}
    case "ERROR":
      return {loading:false,error:action.error}
    case "CLEAR" :
      return {...curHttpState,error:null}  
      default:
       throw new Error("Something went wrong")
  }
}





const Ingredients=()=> {
  const [userIngredient,dispatch]=useReducer(ingredientReducer,[])
  const [httpState,dispatchHttp]=useReducer(httpReducer,{loading:false, error: null})
  // useEffect(()=>{
  //   fetch("https://react-hooks-934ba-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients.json").then(response=>(response.json()).then(
  //     responseData=>{
  //       const loadedIngredients=[];
  //       for(const key in responseData){
  //         loadedIngredients.push({
  //           id:key,
  //           title: responseData[key].title,
  //           amount:responseData[key].amount
  //         })
  //       }
  //       setUserIngredients(loadedIngredients)
  //     }
  //   ))

  // },[])

  const filteredIngredientsHandler=useCallback(filteredIngredients=>dispatch({type: "SET",ingredients:filteredIngredients}),[])

 
  
  const addIngredientHandler= ingredient =>{
    dispatchHttp({type:"SEND"})
    fetch('https://react-hooks-934ba-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients.jsn',{
      method:"POST",
      body: JSON.stringify(ingredient),
      headers: {"Content-Type":"application/json"}
    }).then(response=>{
      dispatchHttp({type:"RESPONSE"})
      response.json().then(responseData=>{
        dispatch( {type:"ADD", ingredient:{ide:responseData.name,...ingredient}})
      })
    }).catch(errorData=>{
      dispatchHttp({type:"ERROR", error:errorData.message})}
    )
   
  }
  const removeIngredientHandler= ingredientId =>{
    dispatchHttp({type:"SEND"})
    fetch(`https://react-hooks-934ba-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients/${ingredientId}.json`,{
      method:"DELETE",
      headers: {"Content-Type":"application/json"}
    }).then(response=>{
      dispatchHttp({type:"RESPONSE"})
      dispatch({type:"DELETE", id:ingredientId})
    }).catch(
      errorData=>{
        console.log("error");
        dispatchHttp({type:"ERROR", error:errorData.message})}
    )
     
   
  }

  const clearError=()=>{
       dispatchHttp({type:"CLEAR"})
  }

  console.log("error state", httpState.error)

  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={httpState.loading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList onRemoveItem={removeIngredientHandler} ingredients={userIngredient} />
      </section>
    </div>
  );
}

export default Ingredients;
