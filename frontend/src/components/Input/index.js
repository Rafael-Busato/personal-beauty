import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import ReactInputMask from 'react-input-mask';
import { useField } from '@unform/core';

import { Container, Error } from './styles';
import { promises } from 'dns';

// interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
//   name: string;
//   // eslint-disable-next-line @typescript-eslint/ban-types
//   containerStyle?: object;
//   icon: ComponentType<IconBaseProps>;
// }

const Input = ({
  name,
  hasMask = false,
  containerStyle = {},
  icon: Icon,
  errorInput = false,
  ...rest
}) => {
  const inputRef = useRef(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback((event) => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref, value) {
        ref.setInputValue(value);
      },
      clearValue(ref) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  function teste(um, dois, tres, quatro) {
    console.log(um.target.value.length);
    console.log(dois);
    console.log(tres);
    console.log(quatro);
  }

  return (
    <Container
      style={containerStyle}
      isErrored={!!error || !!errorInput}
      isFilled={isFilled}
      isFocused={isFocused}
    >
      {Icon && <Icon size={20} />}
      {hasMask ? (
        <ReactInputMask
          onChangeCapture={teste}
          // beforeMaskedValueChange={teste}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          ref={inputRef}
          {...rest}
        />
      ) : (
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          ref={inputRef}
          {...rest}
        />
      )}

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
