import {
    Button,
    Datepicker,
    FlexChild,
    FlexLayout,
    FormElement,
    TextField,
    TextStyles,
} from '@cedcommerce/ounce-ui';
import React from 'react';
import { CheckCircle } from 'react-feather';
import { externalRedirectLink } from '../../../Constant';

const CampaignForm = () => {
    const { contentGuideUrl } = externalRedirectLink;
    return (
        <>
            <FlexLayout spacing="loose" valign="start" wrap="noWrap">
                <CheckCircle
                    // color={validateComplete() ? '#027A48' : '#70747E'}
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
                                required
                                onChange={function noRefCheck() {}}
                                placeHolder="Enter campaign name"
                                value=""
                                showHelp="Campaign name limited to 394 characters."
                            />
                            <FlexLayout halign="fill" spacing="loose">
                                <FlexChild desktopWidth="50">
                                    <Datepicker
                                        format="DD/MM/YYYY HH:mm:ss"
                                        name="Start Date"
                                        onChange={function noRefCheck() {}}
                                        picker="date"
                                        placeholder="MM/DD/YYYY"
                                        placement="bottomLeft"
                                        showHelp="Campaign starts at 12 am(EST time zone)   "
                                        showToday
                                        thickness="thick"
                                    />
                                </FlexChild>
                                <FlexChild desktopWidth="50">
                                    <Datepicker
                                        format="DD/MM/YYYY HH:mm:ss"
                                        name="End Date"
                                        onChange={function noRefCheck() {}}
                                        picker="date"
                                        placeholder="MM/DD/YYYY"
                                        placement="bottomLeft"
                                        showHelp="Campaign remains active until paused or til the end date."
                                        showToday
                                        thickness="thick"
                                    />
                                </FlexChild>
                            </FlexLayout>
                            <TextField
                                name="Daily Budget"
                                required
                                onChange={function noRefCheck() {}}
                                placeHolder="$"
                                value=""
                                showHelp="Minimum daily budget is $5. You are charged only when shopper clicks on the Ad."
                            />
                            <TextField
                                name="Ad Text"
                                required
                                onChange={function noRefCheck() {}}
                                placeHolder="Insert the Suitable Ad Text"
                                value=""
                            />
                            <span className="inte-form__itemHelp undefined">
                                <span>
                                    To know more about high performing and
                                    quality content for Ads refer to our
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
        </>
    );
};

export default CampaignForm;
