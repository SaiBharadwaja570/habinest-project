import React, { useReducer } from 'react'
import axios from 'axios'
const CreatePG = () => {

    function reducer(state, action){
        switch(action.type){
          case "name": //action name
            return {...state, name: action.payload}
          case "address":
            return {...state, address: action.payload}
          case "price":
            return {...state, price: action.payload}
          case "sharing":
            return {...state, sharing: action.payload}
          case "photo":
            return {...state, photo: action.payload}
          case "gender":
            return {...state, gender: action.payload}
          default:
            return state
        }
      }
    const [state, dispatch]=useReducer(reducer, {name:"", address:"", price:"", sharing:"", photo:null, gender:""});
    const handleSubmit= async ()=>{
        try {
            const formData = new FormData();
            formData.append("name", state.name);
            formData.append("address", state.address);
            formData.append("priceRange", state.price);
            formData.append("sharingType", state.sharing);
            formData.append("gender", state.gender);
            formData.append("photo", state.photo);
            const res=await axios({
                method:"POST",
                url:"http://localhost:8000/api/pg/",
                data:formData,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(()=>{
                alert("PG made")
            });
        } catch (error) {
            console.error("Upload or submission failed", error)
        }
        
    }
    return (
        <div>
            <input type="text" placeholder='Name' onChange={(e)=>{dispatch({type:"name", payload:e.target.value})}}/>
            <input type="text" placeholder='Address' onChange={(e)=>{dispatch({type:"address", payload:e.target.value})}}/>
            <input type="number" placeholder='Price range' onChange={(e)=>{dispatch({type:"price", payload:e.target.value})}}/>
            <input type="text" placeholder='Sharing type' onChange={(e)=>{dispatch({type:"sharing", payload:e.target.value})}}/>
            <input type="file" placeholder='Photo' accept='image/*' onChange={(e)=>{dispatch({type:"photo", payload:e.target.files[0]})}}/>
            <select name="gender" id="gender" onChange={(e)=>{dispatch({type:"gender", payload:e.target.value})}}>
                <option value="Gents">Gents</option>
                <option value="Women">Women</option>
                <option value="Coliving">Coliving</option>
            </select>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default CreatePG
