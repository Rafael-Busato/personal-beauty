import React, { useEffect, useRef } from 'react';

import { useField } from '@unform/core';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function InputUnform({
  name = '',
  label = '',
  checked = false,
  onChange,
  value = '',
  ...rest
}) {
  const inputRef = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'checked',
    });
  }, [fieldName, registerField]);

  return (
    <div>
      {error ? (
        <FormControlLabel
          style={{ color: 'red' }}
          error={error}
          control={
            <Checkbox
              inputRef={inputRef}
              {...rest}
              checked={checked}
              onChange={onChange}
              name={name}
              value={value}
            />
          }
          label={error.concat(' (' + label + ')')}
        />
      ) : (
        <FormControlLabel
          control={
            <Checkbox
              inputRef={inputRef}
              {...rest}
              name={name}
              checked={checked}
              onChange={onChange}
              value={value}
            />
          }
          label={label}
        />
      )}
    </div>
  );
}
