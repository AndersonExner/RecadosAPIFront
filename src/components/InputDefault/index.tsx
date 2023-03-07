import React from 'react';
import { TextField } from '@mui/material'

interface InputDefaultProps {
    type: string;
    name: InputName;
    label: string;
    value: string;
    color: 'error'  | 'primary';
    handleChange: (value: string, key: InputName) => void;
}

export type InputName = 'name' | 'email' | 'password' | 'repassword' | 'description' | 'detail' | 'key'

export function InputDefault({ type, name, label, value, color, handleChange }: InputDefaultProps) {
    return (
        <TextField color={color} focused fullWidth name={name} label={label} variant="outlined" type={type} value={value} onChange={(ev) => handleChange(ev.target.value, name)}/>
    )
}

