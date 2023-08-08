import React,{useState,useEffect,useRef} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const {onLoadIngredients}=props
  const [enteredFilter,setEnteredFilter]=useState('')
  const inputRef=useRef();

  useEffect(()=>{

    setTimeout(()=>{

      if(enteredFilter===inputRef.current.value){
        const query =
        enteredFilter.length === 0
          ? ''
          : `?orderBy="title"&equalTo="${enteredFilter}"`;
    
    
        fetch("https://react-hooks-934ba-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients.json"+query).then(response=>(response.json()).then(
          responseData=>{
            const loadedIngredients=[];
            for(const key in responseData){
              loadedIngredients.push({
                id:key,
                title: responseData[key].title,
                amount:responseData[key].amount
              })
            }
            console.log(loadedIngredients)
            onLoadIngredients(loadedIngredients)
          }
          
        ))

      }
      
   

    },1000)




     
  },[enteredFilter,onLoadIngredients])

   console.log(inputRef.current.value)
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input ref={inputRef} type="text" value={enteredFilter} onChange={event=>{
            setEnteredFilter(event.target.value)
          }}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
