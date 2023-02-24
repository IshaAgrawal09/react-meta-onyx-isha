import {
    Alert,
    FlexChild,
    FlexLayout,
    TextStyles,
} from '@cedcommerce/ounce-ui';
import React from 'react';
import { CheckCircle } from 'react-feather';

const TargetLocation = () => {
    return (
        <FlexLayout spacing="loose" valign="start" wrap="noWrap">
            <CheckCircle
                color="#027A48"
                size="20"
                style={{ display: 'block' }}
            />
            <FlexChild desktopWidth="100">
                <FlexLayout spacing="loose" direction="vertical">
                    <TextStyles
                        alignment="left"
                        fontweight="extraBold"
                        paragraphTypes="MD-1.4"
                        subheadingTypes="XS-1.6"
                        textcolor="dark"
                        type="SubHeading"
                        utility="none">
                        Target Location
                    </TextStyles>
                    <FlexChild
                        desktopWidth="100"
                        tabWidth="100"
                        mobileWidth="100">
                        <Alert destroy={false} type="info">
                            <TextStyles
                                textcolor="dark"
                                type="SubHeading"
                                fontweight="bold"
                                subheadingTypes="XS-1.6">
                                Target location is limited to the US only.
                            </TextStyles>
                            <TextStyles textcolor="light">
                                United States
                            </TextStyles>
                        </Alert>
                    </FlexChild>
                </FlexLayout>
            </FlexChild>
        </FlexLayout>
    );
};

export default TargetLocation;
