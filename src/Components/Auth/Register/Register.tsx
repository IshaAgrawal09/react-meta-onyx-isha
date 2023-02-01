import {
    Alert,
    Button,
    CheckBox,
    FlexLayout,
    FormElement,
    Modal,
    TextField,
    TextStyles,
} from '@cedcommerce/ounce-ui';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Eye, EyeOff } from 'react-feather';
import { DI, DIProps, parseJwt, extractUSername } from '../../../Core';
import {
    APP_SOURCE_NAME,
    externalRedirectLink,
    regexValidation,
    urlFetchCalls,
    subject,
    groupCode,
} from '../../../Constant';
import CustomHelpPoints from '../../CustomHelpPoints';
import { RegistrationPage } from '../StaticMessages';
import OtpLayout from './OtpLayout';
import * as queryString from 'query-string';
import { StoreDispatcher } from '../../../index';
import { loginStatus, syncConnectorInfo } from '../../../Actions';
interface registerStateObj {
    brand: string;
    email: string;
    password: string;
    confirmPassword: string;
    eyeOff: boolean;
    tncCheck: boolean;
}

interface otp {
    [key: number]: string;
}

interface PropsI extends DIProps {
    syncConnectorInfo: (props: any, shop_url?: string | null) => void;
    loginStatus: () => void;
}

const Register = (_props: PropsI): JSX.Element => {
    const {
        redux: { current },
    } = _props;
    const onyxShopId = current?.source._id;
    const match = useParams();
    console.log(_props.match, 'match');
    const [state, setState] = useState<registerStateObj>({
        brand: '',
        email: '',
        password: '',
        confirmPassword: '',
        eyeOff: false,
        tncCheck: true,
    });
    const [token, setToken] = useState('');
    const [timer, setTimer] = useState(5);
    const [loading, setLoading] = useState({
        resendLoading: false,
        registerLoading: false,
    });
    const navigate = useNavigate();
    const dispacher = useContext(StoreDispatcher);
    const { brand, email, password, confirmPassword, eyeOff, tncCheck } = state;

    // ERROR OF ALL THE FIELDS
    const [errorValidation, setErrorValidation] = useState({
        email: { error: false, message: '', showError: false },
        brand: { error: false, message: '', showError: false },
        password: { error: false, message: '', showError: false },
        confirmPassword: { error: false, message: '', showError: false },
    });
    const [verifiedUser, setVerifiedUser] = useState(false);
    const otpTimer = 60;
    const otpDigit = 5;

    const [openOtp, setOpenOtp] = useState(false);
    const [attempt, setAttempt] = useState<number>(4);
    const [sec, setSec] = useState<number>(otpTimer % 60);
    const [min, setMin] = useState<number>(Math.floor(otpTimer / 60));
    const [validOtp, setValidOtp] = useState<any>({
        error: false,
        validation: false,
        message: '',
    });
    const [otp, setOtp] = useState<otp>({});
    const [activeIndex, setActiveIndex] = useState<number>(0);

    useEffect(() => {
        if (token != '') {
            const tokenDecoded = parseJwt(token);
            dispacher({
                type: 'user_id',
                state: {
                    user_id: tokenDecoded['user_id'],
                },
            });
            _props.syncConnectorInfo(_props);
        } else {
            if (match['*']?.includes('/register')) {
                const Token: any = _props.di.globalState.getBearerToken();
                if (Token) {
                    const tokenDecoded = parseJwt(Token);
                    dispacher({
                        type: 'user_id',
                        state: {
                            user_id: tokenDecoded['user_id'],
                        },
                    });
                    _props.syncConnectorInfo(_props);
                }
            }
        }
    }, [_props.match.uId]);

    useEffect(() => {
        dispacher({
            type: 'logout',
            state: {},
        });
        if (!match['*']?.includes('/register'))
            _props.di.globalState.removeLocalStorage('auth_token');
        tokenCheck();
    }, []);

    const tokenCheck = () => {
        const queryParams: any = queryString.parse(_props.location.search);
        if (queryParams['user_token'] != null) {
            setToken(queryParams['user_token']);
            const tokenDecoded = parseJwt(queryParams['user_token']);
            console.log(tokenDecoded['user_id']);
            _props.di.globalState.set(
                `${tokenDecoded['user_id']}_user_authenticated`,
                `true`
            );
            _props.di.globalState.set(
                `${tokenDecoded['user_id']}_auth_token`,
                queryParams['user_token']
            );
            _props.di.globalState.set(
                `${tokenDecoded['user_id']}_username`,
                extractUSername(queryParams['username'] ?? 'User')
            );
            _props.loginStatus();

            navigate(`/auth/${tokenDecoded['user_id']}/register`);
        }
    };

    // DISABLED BUTTON UNTILL ALL FIELDS ARE FILLED
    function disabled() {
        let desabledVal = false;
        if (
            brand == '' ||
            email == '' ||
            password == '' ||
            confirmPassword == '' ||
            password !== confirmPassword ||
            !tncCheck
        )
            desabledVal = true;
        return desabledVal;
    }

    const {
        post: { createUser, validateOtp, emailExistsCheck, productImport },
        get: { sendUserMail, otpMail },
    } = urlFetchCalls;

    // USER REGISTRATION FUNC
    const userRegistration = async () => {
        const payload = { data: { email: email } };
        setLoading({
            ...loading,
            registerLoading: true,
        });
        await _props.di.POST(emailExistsCheck, payload).then((res) => {
            if (res.success) {
                const url = `${otpMail}?email=${email}&subject=${subject.otpMailSend}&templateSource=${APP_SOURCE_NAME}`;
                _props.di.GET(url).then((result) => {
                    const { success, message, no_of_attempts_left } = result;
                    if (success) {
                        setAttempt(no_of_attempts_left);
                        setOpenOtp(true);
                        setLoading({
                            ...loading,
                            registerLoading: false,
                        });
                    } else {
                        _props.error(message);
                        setLoading({
                            ...loading,
                            registerLoading: false,
                        });
                    }
                });
            } else {
                _props.error(res.message);
                setLoading({
                    ...loading,
                    registerLoading: false,
                });
            }
        });
    };

    // RESEND BTN
    const resend = () => {
        setLoading({
            ...loading,
            resendLoading: true,
        });
        const url = `${otpMail}?email=${email}&subject=${subject.otpMailSend}&templateSource=${APP_SOURCE_NAME}`;
        _props.di.GET(url).then((response) => {
            const { success, message, no_of_attempts_left } = response;
            if (success) {
                setAttempt(no_of_attempts_left);
                setOtp({});
                setSec(otpTimer % 60);
                setMin(Math.floor(otpTimer / 60));
                setLoading({
                    ...loading,
                    resendLoading: false,
                });
                const timeOut = setTimeout(Timing, 1000);

                if (sec === 0 && min === 0) {
                    clearTimeout(timeOut);
                }
                setActiveIndex(0);
            } else {
                setOtp({});
                setLoading({
                    ...loading,
                    resendLoading: false,
                });
                setSec(otpTimer % 60);
                setMin(Math.floor(otpTimer / 60));
                _props.error(message);
            }
        });
    };

    // TIMER
    const Timing = () => {
        if (sec > 0) {
            setSec(sec - 1);
        } else if (sec === 0 && min > 0) {
            setSec(59);
            if (min > 0) {
                setMin(min - 1);
            }
        }
    };

    if ((min !== 0 || sec !== 0 || attempt === 0) && openOtp) {
        const timeOut = setTimeout(Timing, 1000);
        if (sec === 0 && min === 0) {
            clearTimeout(timeOut);
        }
    }

    const registeruser = () => {
        const payload = {
            data: {
                user: {
                    email: email,
                    new_password: password,
                    confirm_password: password,
                },
                config: [
                    {
                        key: 'brand',
                        value: brand,
                        group_code: groupCode,
                    },
                ],
            },
        };
        _props.di.POST(createUser, payload).then((response) => {
            const { success, message, code } = response;
            if (success) {
                _props.di.POST(productImport, {
                    source: {
                        marketplace: APP_SOURCE_NAME,
                        shopId: onyxShopId,
                        data: {
                            filter_options: {
                                isPrimeIntended: true,
                            },
                            filter_condition: 'or',
                        },
                    },
                });
                setOpenOtp(false);
                setVerifiedUser(true);
                _props.di.GET(sendUserMail);
            } else {
                if (code == 'token_user_not_found') {
                    _props.error(RegistrationPage.UserNotFound);
                    setOpenOtp(false);
                    return;
                }
                let errorMsg = message;
                if (errorMsg.toLowerCase().includes('already exist')) {
                    errorMsg = RegistrationPage.emailExists;
                }
                _props.error(errorMsg);
            }
        });
    };
    if (verifiedUser) {
        const timeout = setTimeout(() => {
            setTimer(timer - 1);
        }, 1000);
        if (timer == 0) {
            clearTimeout(timeout);
            _props.history(`/panel/${match.uId}/dashboard`);
        }
    }

    const otpVerification = (otpObj: object) => {
        if (Object.keys(otpObj).length === otpDigit) {
            let otpArr = Object.values(otpObj);
            let otp = parseInt(otpArr.join(''));
            const payload = { otp: otp, email: email };
            _props.di.POST(validateOtp, payload).then((res) => {
                const { success, message } = res;
                if (success) {
                    registeruser();
                    setValidOtp({
                        error: false,
                        validation: true,
                        message: message,
                    });
                } else {
                    setValidOtp({
                        error: true,
                        validation: false,
                        message: message,
                    });
                }
            });
        }
    };

    return (
        <>
            {' '}
            {verifiedUser ? (
                <div className="custom-card-message">
                    <FormElement>
                        <Alert type="success" destroy={false}>
                            Your email has been successfully verified. Account
                            creation is in progress.
                        </Alert>
                        <div className="timer_position">
                            <TextStyles>
                                Redirecting in {timer} seconds.
                            </TextStyles>
                        </div>
                    </FormElement>
                </div>
            ) : (
                <FormElement>
                    <TextField
                        name="Store / Brand Name"
                        error={errorValidation['brand']['showError']}
                        showHelp={errorValidation['brand']['message']}
                        required={true}
                        onChange={(event) => {
                            if (event.length === 0) {
                                setErrorValidation({
                                    ...errorValidation,
                                    brand: {
                                        ...errorValidation.brand,
                                        showError: false,
                                        message: '',
                                        error: true,
                                    },
                                });
                            } else if (brand.length > 100) {
                                setErrorValidation({
                                    ...errorValidation,
                                    brand: {
                                        ...errorValidation.brand,
                                        message: '',
                                        showError: false,
                                        error: true,
                                    },
                                });
                            } else {
                                setErrorValidation({
                                    ...errorValidation,
                                    brand: {
                                        ...errorValidation.brand,
                                        message: '',
                                        showError: false,
                                        error: false,
                                    },
                                });
                            }
                            setState({
                                ...state,
                                brand: event,
                            });
                        }}
                        onblur={() => {
                            if (brand.length === 0) {
                                setErrorValidation({
                                    ...errorValidation,
                                    brand: {
                                        ...errorValidation.brand,
                                        showError: true,
                                        message: '',
                                    },
                                });
                            } else if (brand.length > 10) {
                                setErrorValidation({
                                    ...errorValidation,
                                    brand: {
                                        ...errorValidation.brand,
                                        message:
                                            'Maximum character limit is 100.',
                                        showError: true,
                                    },
                                });
                            }
                        }}
                        placeHolder="Enter Store / Brand Name"
                        value={brand}
                    />
                    <TextField
                        name="Email"
                        error={errorValidation['email']['showError']}
                        showHelp={errorValidation['email']['message']}
                        required={true}
                        placeHolder="Enter Email"
                        value={email}
                        onChange={(event) => {
                            if (email.length === 0) {
                                setErrorValidation({
                                    ...errorValidation,
                                    email: {
                                        ...errorValidation.email,
                                        message: '',
                                        showError: false,
                                        error: true,
                                    },
                                });
                            } else if (
                                !email.match(regexValidation.emailFormat)
                            ) {
                                setErrorValidation({
                                    ...errorValidation,
                                    email: {
                                        ...errorValidation.email,
                                        message: '',
                                        showError: false,
                                        error: true,
                                    },
                                });
                            } else {
                                setErrorValidation({
                                    ...errorValidation,
                                    email: {
                                        ...errorValidation.email,
                                        message: '',
                                        showError: false,
                                        error: false,
                                    },
                                });
                            }
                            setState({
                                ...state,
                                email: event,
                            });
                        }}
                        onblur={() => {
                            if (email.length === 0) {
                                setErrorValidation({
                                    ...errorValidation,
                                    email: {
                                        ...errorValidation.email,
                                        message: 'Please enter a valid email',
                                        showError: true,
                                    },
                                });
                            } else if (
                                !email.match(regexValidation.emailFormat)
                            ) {
                                setErrorValidation({
                                    ...errorValidation,
                                    email: {
                                        ...errorValidation.email,
                                        message: 'Please enter a valid email',
                                        showError: true,
                                    },
                                });
                            }
                        }}
                    />
                    <TextField
                        name="Create Password"
                        error={errorValidation['password']['showError']}
                        required={true}
                        onChange={(event) => {
                            if (password.length === 0) {
                                setErrorValidation({
                                    ...errorValidation,
                                    password: {
                                        ...errorValidation.password,
                                        showError: false,
                                        error: true,
                                    },
                                });
                            } else {
                                setErrorValidation({
                                    ...errorValidation,
                                    password: {
                                        ...errorValidation.password,
                                        showError: false,
                                        error: false,
                                    },
                                });
                            }
                            setState({
                                ...state,
                                password: event,
                            });
                        }}
                        onblur={() => {
                            if (password.length === 0) {
                                setErrorValidation({
                                    ...errorValidation,
                                    password: {
                                        ...errorValidation.password,
                                        showError: true,
                                    },
                                });
                            }
                        }}
                        placeHolder="Enter Password"
                        value={password}
                        type={'password'}
                        strength={true}
                        show={eyeOff}
                        innerSufIcon={
                            eyeOff ? (
                                <Eye
                                    onClick={() =>
                                        setState({
                                            ...state,
                                            eyeOff: !eyeOff,
                                        })
                                    }
                                />
                            ) : (
                                <EyeOff
                                    onClick={() =>
                                        setState({
                                            ...state,
                                            eyeOff: !eyeOff,
                                        })
                                    }
                                />
                            )
                        }
                    />
                    <CustomHelpPoints />
                    <TextField
                        name="Confirm Password"
                        error={errorValidation['confirmPassword']['showError']}
                        showHelp={errorValidation['confirmPassword']['message']}
                        required={true}
                        onChange={(event) => {
                            if (event.length === 0) {
                                setErrorValidation({
                                    ...errorValidation,
                                    confirmPassword: {
                                        ...errorValidation.confirmPassword,
                                        message: '',
                                        showError: true,
                                    },
                                });
                            } else {
                                if (event !== password) {
                                    setErrorValidation({
                                        ...errorValidation,
                                        confirmPassword: {
                                            ...errorValidation.confirmPassword,
                                            message: "Password doesn't match",
                                            showError: true,
                                        },
                                    });
                                } else {
                                    setErrorValidation({
                                        ...errorValidation,
                                        confirmPassword: {
                                            ...errorValidation.confirmPassword,
                                            error: false,
                                            message: '',
                                            showError: false,
                                        },
                                    });
                                }
                            }
                            setState({
                                ...state,
                                confirmPassword: event,
                            });
                        }}
                        onblur={() => {
                            if (confirmPassword.length === 0) {
                                setErrorValidation({
                                    ...errorValidation,
                                    confirmPassword: {
                                        ...errorValidation.confirmPassword,
                                        message: '',
                                        showError: true,
                                    },
                                });
                            }
                        }}
                        type="password"
                        placeHolder="Confirm Password"
                        value={confirmPassword}
                    />
                    <FlexLayout>
                        <CheckBox
                            checked={tncCheck}
                            labelVal="Accept Terms and Conditions."
                            onClick={() =>
                                setState({
                                    ...state,
                                    tncCheck: !tncCheck,
                                })
                            }
                        />
                        <Button
                            type="TextButton"
                            content="Read Our Policies"
                            onClick={() =>
                                window.open(
                                    externalRedirectLink.registrationReadOurPolicy
                                )
                            }></Button>
                    </FlexLayout>
                    <Button
                        length="fullBtn"
                        loading={loading.registerLoading}
                        thickness="large"
                        content="Create Account"
                        disable={disabled()}
                        onClick={() => userRegistration()}></Button>
                </FormElement>
            )}
            {/* OTP SECTION  */}
            <Modal
                open={openOtp}
                close={() => {
                    setOpenOtp(false);
                    setValidOtp({
                        validation: false,
                        message: '',
                    });
                }}
                heading="Verify Email Address"
                modalSize="small">
                <OtpLayout
                    email={email}
                    otpDigit={otpDigit}
                    validOtp={validOtp}
                    setValidOtp={setValidOtp}
                    setActiveIndex={setActiveIndex}
                    activeIndex={activeIndex}
                    validOtpFunc={(e: object) => otpVerification(e)}
                />
                <div className="mt-10">
                    <TextStyles
                        textcolor={
                            validOtp.validation && !validOtp.error
                                ? 'positive'
                                : 'negative'
                        }>
                        {validOtp.message}
                    </TextStyles>
                </div>
                <div className="mt-10">
                    <FlexLayout halign="fill">
                        <FlexLayout spacing="loose">
                            <Button
                                type="TextButton"
                                loading={loading.resendLoading}
                                onClick={resend}
                                disable={
                                    min !== 0 || sec !== 0 || attempt === 0
                                }>
                                Resend One-time passcode
                            </Button>
                            <span
                                className="inte__text none inte__font--normal"
                                style={{ color: '#8C9098' }}>
                                ({attempt} attempts left)
                            </span>
                        </FlexLayout>
                        {min !== 0 ||
                            (sec !== 0 && (
                                <span className="inte__text  inte__text--negative none inte__font--bold">
                                    {min < 10 ? '0' + min : min}:
                                    {sec < 10 ? '0' + sec : sec}
                                </span>
                            ))}
                    </FlexLayout>
                </div>
            </Modal>
        </>
    );
};

export default DI(Register, { func: { loginStatus, syncConnectorInfo } });
