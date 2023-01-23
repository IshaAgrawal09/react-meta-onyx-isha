import { Card, FormElement, TextField } from '@cedcommerce/ounce-ui';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

interface registerStateObj {
    brand: string;
    email: string;
    password: string;
    confirmPassword: string;
    eyeOff: boolean;
    tncCheck: boolean;
}
const Register = (): JSX.Element => {
    const [state, setState] = useState<registerStateObj>({
        brand: '',
        email: '',
        password: '',
        confirmPassword: '',
        eyeOff: false,
        tncCheck: false,
    });
    return (
        <FormElement>
            <TextField
                name="Store / Brand Name"
                required={true}
                onChange={function noRefCheck() {}}
                placeHolder="Enter Store / Brand Name"
                value={state.brand}
            />
            <TextField
                name="Email"
                required={true}
                onChange={function noRefCheck() {}}
                placeHolder="Enter Email"
                value={state.email}
            />
            <TextField
                name="Create Password"
                required={true}
                onChange={function noRefCheck() {}}
                placeHolder="Enter Password"
                value={state.password}
                type={'password'}
                strength={true}
                show={state.eyeOff}
            />
            <TextField
                name="Confirm Password"
                required={true}
                onChange={function noRefCheck() {}}
                placeHolder="Confirm Password"
                value={state.confirmPassword}
            />
        </FormElement>
    );
};

export default Register;
