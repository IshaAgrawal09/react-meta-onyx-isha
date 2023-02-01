import { FlexLayout, Progressbar, TextStyles } from '@cedcommerce/ounce-ui';
import React, { useEffect, useState } from 'react';
import { DI, DIProps } from '../../../Core';
import { SuccessOnboardingIcon } from '../Settings/svgs/Svgs';
import { syncNecessaryInfo, syncConnectorInfo } from '../../../Actions';
import { urlFetchCalls } from '../../../Constant';

interface Onboard extends DIProps {
    callback: any;
    syncNecessaryInfo: any;
    syncConnectorInfo: any;
}
const SuccessOnboarding = (_props: Onboard): JSX.Element => {
    // what is _props.callback()
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState('Setting up your account');

    const {
        get: { setDataInDynamo },
    } = urlFetchCalls;

    var timer;
    if (progress >= 50) {
        timer = setTimeout(() => {
            setProgress(progress + 20);
        }, 300);
    } else if (progress == 100) {
        _props.callback() && clearTimeout(timer);
    }

    const progressBar = async () => {
        await _props.syncConnectorInfo(_props);
        setProgress(25);

        await _props.syncNecessaryInfo();
        _props.di.GET(setDataInDynamo);
        setProgress(50);
        setMessage('Prepping your Dashboard');
    };

    useEffect(() => {
        progressBar();
    }, []);
    return (
        <div className="custom-success-onboarding">
            <div className="custom-success-inner">
                <div className="custom-success-inner-content">
                    <FlexLayout
                        halign="center"
                        valign="center"
                        direction="vertical"
                        spacing="loose">
                        <SuccessOnboardingIcon />
                        <TextStyles
                            alignment="left"
                            displayTypes="XS-3.2"
                            fontweight="extraBold"
                            lineHeight="LH-3.6"
                            textcolor="dark"
                            type="Display"
                            utility="none">
                            You are all set!
                        </TextStyles>
                    </FlexLayout>
                    <div className="mt-40 custom-progress-success">
                        <TextStyles
                            alignment="left"
                            fontweight="normal"
                            lineHeight="LH-2.0"
                            paragraphTypes="MD-1.4"
                            textcolor="dark"
                            type="Paragraph"
                            utility="none">
                            {message}
                        </TextStyles>
                        <Progressbar
                            message=""
                            percentage={progress}
                            progessThickness="thin"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DI(SuccessOnboarding, {
    func: { syncConnectorInfo, syncNecessaryInfo },
});
