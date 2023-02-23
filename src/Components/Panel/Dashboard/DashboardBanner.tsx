import { Alert, Button } from '@cedcommerce/ounce-ui';
import React, { useState } from 'react';
import { DI, DIProps } from '../../../Core';

const DashboardBanner = (_props: DIProps) => {
    const [showPaymentAlert, setShowPaymentAlert] = useState(true);
    const [showInstaAlert, setShowInstaAlert] = useState(true);

    return (
        <>
            {_props.di.globalState.get('showPaymentBanner') == 'true' &&
            showPaymentAlert ? (
                <div className="mb-20">
                    <Alert
                        desciption={
                            <p className="Paragraph  inte__text--light none inte__font--normal inte__Paragraph--font--medium">
                                Please set up the payment method on Meta to
                                publish your ads.
                                <br />
                                <Button
                                    type="TextButton"
                                    onClick={() => {
                                        window.open(
                                            'https://www.facebook.com/business/help/132073386867900?id=160022731342707'
                                        );
                                    }}>
                                    Learn how to add/update payment methods for
                                    ads on Meta.
                                </Button>
                            </p>
                        }
                        destroy
                        onClose={() => {
                            _props.di.globalState.set(
                                'showPaymentBanner',
                                JSON.stringify(false)
                            );
                            setShowPaymentAlert(false);
                        }}
                        type="warning">
                        Set up Payment Details!
                    </Alert>
                </div>
            ) : null}

            {_props.di.globalState.get('showInstaBanner') == 'true' &&
            showInstaAlert ? (
                <div className="mb-20">
                    <Alert
                        desciption={
                            <p className="Paragraph  inte__text--light none inte__font--normal inte__Paragraph--font--medium">
                                If you want place your Ads on Instagram account,
                                then your Instagram account should be connected
                                to the Social Ads for Buy with Prime accounts.
                                <br />
                                <Button
                                    type="TextButton"
                                    onClick={() => {
                                        window.open(
                                            `http://${window.location.host}/info/faq?query=How can I connect my Instagram account with Social Ads for Buy with Prime app?`
                                        );
                                    }}>
                                    Learn how to connect your instagram account
                                </Button>
                            </p>
                        }
                        destroy
                        onClose={() => {
                            _props.di.globalState.set(
                                'showInstaBanner',
                                JSON.stringify(false)
                            );
                            setShowInstaAlert(false);
                        }}
                        type="warning">
                        Instagram not connected!
                    </Alert>
                </div>
            ) : null}
        </>
    );
};

export default DI(DashboardBanner);
