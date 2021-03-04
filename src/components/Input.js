import { useRef, useEffect } from 'react';

const Input = ({
    id,
    value,
    type = 'text',
    onInputChange,
    isFocused,
    children,
  }) => {
    const inputRef = useRef();
  
    useEffect(() => {
      if (isFocused) {
        inputRef.current.focus();
      }
    }, [isFocused]);
  
    return (
      <>
        <label htmlFor={id}>{children}</label>
        &nbsp;
        <input
          ref={inputRef}
          id={id}
          type={type}
          value={value}
          onChange={onInputChange}
        />
      </>
    );
  };
  
  export default Input;