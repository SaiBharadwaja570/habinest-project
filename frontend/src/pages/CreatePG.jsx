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
            let imgUrl="";
            if(state.photo)
            {
                const formData=new FormData();
                formData.append("photo", state.photo);
                const uploadRes= await axios.post("http://localhost:8000/api/pg/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                })
                imgUrl=uploadRes.data.url;
            }
            const apiObj={
                name:state.name,
                address:state.address,
                priceRange:state.price,
                sharingType:state.sharing,
                photo:imgUrl,
                gender:state.gender,
            }
            await axios({
                method: 'POST',
                url: 'http://localhost:8000/api/pg/',
                data: apiObj
            }).then((res)=>{
                alert("PG made")
            })
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
