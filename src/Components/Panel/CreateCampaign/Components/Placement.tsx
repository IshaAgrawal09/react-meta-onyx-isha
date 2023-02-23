import {
    Alert,
    CheckBox,
    FlexChild,
    FlexLayout,
    TextStyles,
} from '@cedcommerce/ounce-ui';
import React from 'react';
import { CheckCircle } from 'react-feather';

const Placement = () => {
    return (
        <FlexLayout spacing="loose" valign="start" wrap="noWrap">
            <CheckCircle
                // color={validateComplete() ? '#027A48' : '#70747E'}
                size="20"
                style={{ display: 'block' }}
            />
            <FlexChild>
                <>
                    <TextStyles
                        alignment="left"
                        fontweight="extraBold"
                        paragraphTypes="MD-1.4"
                        subheadingTypes="XS-1.6"
                        textcolor="dark"
                        type="SubHeading"
                        utility="none">
                        Placements
                    </TextStyles>
                    <div className="mt-10 mb-10">
                        <TextStyles>
                            You can select Facebook, Instagram, or both to place
                            your Ads. Please note that if you select both, the
                            Ads placement gets distributed between the two
                            platforms based on the Ad strength.
                        </TextStyles>
                        <div className="mt-10 mb-10">
                            <Alert
                                destroy={false}
                                onClose={function noRefCheck() {}}
                                type="warning">
                                Atleast one platform should be selected.
                            </Alert>
                        </div>
                        <FlexLayout
                            spacing="tight"
                            direction="vertical"
                            wrap="noWrap">
                            <CheckBox
                                key={'facebookCheck'}
                                id=""
                                checked
                                // checked={Placement.includes('facebook')}
                                labelVal="Facebook"
                                name="Name"
                                // onClick={() => {
                                //     setPlacementArray('facebook');
                                // }}
                            />
                            <CheckBox
                                // disabled={!instagram}
                                key={'instagramCheck'}
                                id=""
                                // checked={Placement.includes('instagram')}
                                labelVal="Instagram"
                                name="Name"
                                // onClick={() => {
                                //     setPlacementArray('instagram');
                                // }}
                            />
                        </FlexLayout>
                    </div>
                </>
            </FlexChild>
        </FlexLayout>
    );
};

export default Placement;
