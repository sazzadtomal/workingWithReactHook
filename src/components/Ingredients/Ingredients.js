import React,{ useState, useCallback} from 'react';
import IngredientList from "./IngredientList"
import IngredientForm from './IngredientForm';
import Search from './Search';

const Ingredients=()=> {

  const [userIngredients,setUserIngredients]=useState([]);
  
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
    fetch('https://react-hooks-934ba-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients.json',{
      method:"POST",
      body: JSON.stringify(ingredient),
      headers: {"Content-Type":"application/json"}
    }).then(response=>{
      response.json().then(responseData=>{
        setUserIngredients(prevIngredients=>([...prevIngredients,{id:responseData.name,...ingredient}]))
      })
    })
   
  }


  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList onRemoveItem={()=>{}} ingredients={userIngredients} />
      </section>
    </div>
  );
}

export default Ingredients;
