import React,{ useState, useCallback} from 'react';
import IngredientList from "./IngredientList"
import IngredientForm from './IngredientForm';
import Search from './Search';
import ErrorModal from "../UI/ErrorModal"
const Ingredients=()=> {

  const [userIngredients,setUserIngredients]=useState([]);
  const [isLoading,setIsLoading]=useState(false)
  const [error, setError]=useState()
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

  const filteredIngredientsHandler=useCallback(filteredIngredient=>{
    setUserIngredients(filteredIngredient)
},[])

 
  
  const addIngredientHandler= ingredient =>{
    setIsLoading(true)
    fetch('https://react-hooks-934ba-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients.jon',{
      method:"POST",
      body: JSON.stringify(ingredient),
      headers: {"Content-Type":"application/json"}
    }).then(response=>{
      setIsLoading(false)
      response.json().then(responseData=>{
        setUserIngredients(prevIngredients=>([...prevIngredients,{id:responseData.name,...ingredient}]))
      })
    }).catch(error=>{
          setError(error.message)
    })
   
  }
  const removeIngredientHandler= ingredientId =>{
    setIsLoading(true)
    fetch(`https://react-hooks-934ba-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients/${ingredientId}.json`,{
      method:"DELETE",
      headers: {"Content-Type":"application/json"}
    }).then(response=>{
      setIsLoading(false)
      setUserIngredients(prevIngredients=>
        prevIngredients.filter(ingredient=>ingredientId!==ingredient.id)
      )
    })
     
   
  }

  const clearError=()=>{
    setError(null);
    setIsLoading(false)
  }




   console.log(userIngredients)
  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList onRemoveItem={removeIngredientHandler} ingredients={userIngredients} />
      </section>
    </div>
  );
}

export default Ingredients;
