import React, { useState } from "react";

const Form = () => {
    const [inputValue, setInptValue] = useState("")
    const [isPlaced, setIsPlaced] = useState(false)
    const [message, setMessage] = useState(null);

    // handle the form inputs change
    const handleInputChange = (e) => {
        setInptValue(e.target.value)
    }

    // the logic after click the submit button
    const handleSubmit = async (e) => {
        e.preventDefault();


    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <label>
                Enter input:
                <input type="text" value={setInptValue} onChange={handleInputChange} />
            </label>
    
            {/* <textarea onChange={handleChange} name='commands' type='text' placeholder='commands list here' /> */}
            <button className='btn-submit-form' type='submit' />
            {" "}
            <p>{message}</p>
        </form>
    )
}

export default Form;