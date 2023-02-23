import {
    Button,
    Datepicker,
    FlexChild,
    FlexLayout,
    FormElement,
    TextField,
    TextStyles,
} from '@cedcommerce/ounce-ui';
import React, { useState } from 'react';
import { CheckCircle } from 'react-feather';
import { externalRedirectLink } from '../../../Constant';
import { campaignFormI } from './create';
import moment from 'moment';

const CampaignForm = (_props: campaignFormI) => {
    const { formData, setFormData, validateComplete } = _props;
    const { contentGuideUrl } = externalRedirectLink;

    const [errorValidation, setErrorValidation] = useState({
        name: false,
        daily_budget: false,
        adText: false,
    });

    const disabledStartDate = (event: any) => {
        return event && event < moment().add(-1, 'day');
    };

    const disabledEndDate = (e: any) => {
        let cloneDate = formData.start_date.clone();
        return e && e < cloneDate.add(0, 'day');
    };

    return (
        <FlexLayout spacing="loose" valign="start" wrap="noWrap">
            <CheckCircle
                color={validateComplete() ? '#027A48' : '#70747E'}
                size="20"
                style={{ display: 'block' }}
            />
            <FlexChild>
                <>
                    <div className="mb-20">
                        <TextStyles
                            alignment="left"
                            fontweight="extraBold"
                            paragraphTypes="MD-1.4"
                            subheadingTypes="XS-1.6"
                            textcolor="dark"
                            type="SubHeading"
                            utility="none">
                            Campaign Details
                        </TextStyles>
                    </div>
                    <FormElement>
                        <TextField
                            name="Campaign Name"
                            error={errorValidation.name}
                            required
                            onChange={(e: string) => {
                                if (e.length > 394) {
                                    setErrorValidation({
                                        ...errorValidation,
                                        name: true,
                                    });
                                } else {
                                    setErrorValidation({
                                        ...errorValidation,
                                        name: false,
                                    });
                                }
                                setFormData({ ...formData, name: e });
                            }}
                            onblur={() => {
                                if (formData.name.length > 394) {
                                    setErrorValidation({
                                        ...errorValidation,
                                        name: true,
                                    });
                                } else {
                                    setErrorValidation({
                                        ...errorValidation,
                                        name: false,
                                    });
                                }
                            }}
                            placeHolder="Enter campaign name"
                            value={formData.name}
                            showHelp="Campaign name limited to 394 characters."
                        />
                        <FlexLayout halign="fill" spacing="loose">
                            <FlexChild desktopWidth="50">
                                <Datepicker
                                    format="DD/MM/YYYY"
                                    name="Start Date"
                                    disabledDate={(e: any) =>
                                        disabledStartDate(e)
                                    }
                                    onChange={(e: any) => {
                                        setFormData({
                                            ...formData,
                                            start_date: e,
                                        });
                                    }}
                                    value={formData.start_date}
                                    picker="date"
                                    placeholder="MM/DD/YYYY"
                                    placement="bottomLeft"
                                    showHelp="Campaign starts at 12 am(EST time zone)"
                                    thickness="thick"
                                />
                            </FlexChild>
                            <FlexChild desktopWidth="50">
                                <Datepicker
                                    disabled={formData.start_date === ''}
                                    disabledDate={(e: any) =>
                                        disabledEndDate(e)
                                    }
                                    format="DD/MM/YYYY"
                                    name="End Date"
                                    onChange={(e: any) => {
                                        setFormData({
                                            ...formData,
                                            end_date: e,
                                        });
                                    }}
                                    value={formData.end_date}
                                    picker="date"
                                    placeholder="MM/DD/YYYY"
                                    placement="bottomLeft"
                                    showHelp="Campaign remains active until paused or til the end date."
                                    thickness="thick"
                                />
                            </FlexChild>
                        </FlexLayout>
                        <TextField
                            name="Daily Budget"
                            error={errorValidation.daily_budget}
                            required
                            onChange={(e) => {
                                if (Number(e) < 5) {
                                    setErrorValidation({
                                        ...errorValidation,
                                        daily_budget: true,
                                    });
                                } else {
                                    setErrorValidation({
                                        ...errorValidation,
                                        daily_budget: false,
                                    });
                                }
                                setFormData({ ...formData, daily_budget: e });
                            }}
                            onblur={() => {
                                if (/[^0-9]/.test(formData.daily_budget)) {
                                    if (formData.daily_budget < 5) {
                                        setErrorValidation({
                                            ...errorValidation,
                                            daily_budget: true,
                                        });
                                    } else {
                                        setErrorValidation({
                                            ...errorValidation,
                                            daily_budget: false,
                                        });
                                    }
                                } else {
                                    setErrorValidation({
                                        ...errorValidation,
                                        daily_budget: true,
                                    });
                                }
                            }}
                            placeHolder="$"
                            value={formData.daily_budget}
                            showHelp="Minimum daily budget is $5. You are charged only when shopper clicks on the Ad."
                        />
                        <TextField
                            name="Ad Text"
                            error={errorValidation.adText}
                            required
                            onChange={(e) => {
                                if (e.length === 0) {
                                    setErrorValidation({
                                        ...errorValidation,
                                        adText: true,
                                    });
                                } else {
                                    setErrorValidation({
                                        ...errorValidation,
                                        adText: false,
                                    });
                                }
                                setFormData({ ...formData, adText: e });
                            }}
                            onblur={() => {
                                if (formData.adText.length === 0) {
                                    setErrorValidation({
                                        ...errorValidation,
                                        adText: true,
                                    });
                                } else {
                                    setErrorValidation({
                                        ...errorValidation,
                                        adText: false,
                                    });
                                }
                            }}
                            placeHolder="Insert the Suitable Ad Text"
                            value={formData.adText}
                        />
                        <span className="inte-form__itemHelp undefined">
                            <span>
                                To know more about high performing and quality
                                content for Ads refer to our
                            </span>{' '}
                            <Button
                                halign="Center"
                                iconAlign="left"
                                length="none"
                                onAction={() => {}}
                                onClick={() => window.open(contentGuideUrl)}
                                thickness="thin"
                                type="TextButton">
                                Content guide.
                            </Button>
                        </span>
                    </FormElement>
                </>
            </FlexChild>
        </FlexLayout>
    );
};

export default CampaignForm;
