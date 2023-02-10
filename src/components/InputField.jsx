import React from 'react'

const InputField = ({text,handleInput,handleSubmit}) => {
  return (
    <label>
        <input
          type="text"
          value={text}
          onChange={(event) => {
            handleInput(event.target.value);
          }}
        />
        <button onClick={handleSubmit}>Add Todo</button>
      </label>
  )
}

export default InputField
