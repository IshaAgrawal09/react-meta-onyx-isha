import { FlexLayout, TextField, TextStyles } from '@cedcommerce/ounce-ui';
import React, { useEffect, useState } from 'react';
import { DI, DIProps } from '../../../Core';
interface Props extends DIProps {
    email: string;
    otpDigit: number;
    validOtp: any;
    setValidOtp: any;
    validOtpFunc: any;
    setActiveIndex: any;
    activeIndex: number;
}
interface otp {
    [key: number]: string;
}
const OtpLayout = (_props: Props): JSX.Element => {
    const {
        email,
        otpDigit,
        validOtp,
        setValidOtp,
        validOtpFunc,
        activeIndex,
        setActiveIndex,
    } = _props;

    const [otp, setOtp] = useState<otp>({});

    // FOCUS OF INDEX
    useEffect(() => {
        const nextIndex: any = document.getElementById(`otp-${activeIndex}`);
        nextIndex && nextIndex.focus();
    }, [activeIndex]);

    const pasteOtp = (val: string) => {
        let tempArr = val.split('');
        if (tempArr.length > otpDigit) {
            tempArr.shift();
        }
        const obj = Object.assign({}, tempArr);
        setOtp({ ...obj });
        validOtpFunc(obj);
    };

    // ONCHANGE FUNC
    const otpChangeHandle = (value: string, index: number) => {
        setValidOtp({
            error: false,
            validation: false,
            message: '',
        });
        if (value.length === otpDigit && otp[index]?.length === undefined) {
            pasteOtp(value);
            return;
        } else if (
            value.length === otpDigit + 1 &&
            otp[index]?.length !== undefined
        ) {
            pasteOtp(value);
            return;
        }
        let temp = { ...otp };
        if (value.length <= 2) {
            temp[index] = value.substring(value.length - 1);
            setOtp({ ...temp });
            value && setActiveIndex(index + 1);
        }
        validOtpFunc(temp);
    };

    // BACKSPACE FUNC
    const backSpaceAction = (index: number) => {
        setValidOtp({
            error: false,
            validation: false,
            message: '',
        });
        let current = { ...otp };
        delete current[index];
        setOtp({ ...current });
        setActiveIndex(index - 1);
    };

    return (
        <FlexLayout spacing="loose" direction="vertical">
            <TextStyles>
                An email with a verification code has been sent to&nbsp;
                <strong>{email}</strong>
            </TextStyles>
            <TextStyles>Enter your code here:</TextStyles>
            <FlexLayout spacing="mediumTight" wrap="noWrap">
                {Array(otpDigit)
                    .fill(0)
                    .map((_, index) => {
                        return (
                            <div className="otpValues" key={index}>
                                <TextField
                                    controlStates={
                                        Object.keys(otp).length === otpDigit
                                            ? validOtp.validation &&
                                              !validOtp.error
                                                ? 'Success'
                                                : !validOtp.validation &&
                                                  validOtp.error
                                                ? 'Error'
                                                : null
                                            : null
                                    }
                                    key={index}
                                    id={`otp-${index}`}
                                    type="text"
                                    onBackspace={() => backSpaceAction(index)}
                                    onChange={(event) => {
                                        if (/^\d+$/.test(event)) {
                                            otpChangeHandle(event, index);
                                        }
                                    }}
                                    value={otp[index] ?? ''}
                                />
                            </div>
                        );
                    })}
            </FlexLayout>
        </FlexLayout>
    );
};

export default DI(OtpLayout);
