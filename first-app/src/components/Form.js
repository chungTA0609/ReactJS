import React, { useState } from "react";



function Form(props){
    function handleChange(e) {
        setName(e.target.value);
      }
    const [name, setName] = useState('Use hooks!');
    function handleChange(e) {
        console.log("Typing!");
      }
      function handleSubmit(e){
        e.preventDefault();
        props.addTask(name);
        setName("");
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                    What needs to be done?
                </label>
            </h2>
            <input type="text" id="new-todo-input" className="input input__lg" name="text" autoComplete="off" value={name} onChange={handleChange}/>
            <button type="submit" className="btn btn__primary btn__lg">
                Add
            </button>
        </form>
        
    );
}



export default Form;