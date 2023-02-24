import {
    Alert,
    CheckBox,
    FlexChild,
    FlexLayout,
    TextStyles,
} from '@cedcommerce/ounce-ui';
import React, { useState } from 'react';
import { CheckCircle } from 'react-feather';
import { placementI } from '../create';

const Placement = (_props: placementI) => {
    const [placementData, setPlacementData] = useState<String[]>(['facebook']);

    const placementFunc = (value: string) => {
        if (placementData.includes(value)) {
            let update = placementData.filter((item) => {
                if (item === value) {
                    return false;
                }
                return item;
            });
            setPlacementData([...update]);
        } else {
            setPlacementData([...placementData, value]);
        }
    };

    return (
        <FlexLayout spacing="loose" valign="start" wrap="noWrap">
            <CheckCircle
                color={placementData.length ? '#027A48' : '#70747E'}
                size="20"
                style={{ display: 'block' }}
            />
            <FlexChild>
                <FlexLayout spacing="loose" direction="vertical">
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

                    <TextStyles>
                        You can select Facebook, Instagram, or both to place
                        your Ads. Please note that if you select both, the Ads
                        placement gets distributed between the two platforms
                        based on the Ad strength.
                    </TextStyles>
                    {placementData.length === 0 ? (
                        <Alert
                            destroy={false}
                            onClose={function noRefCheck() {}}
                            type="warning">
                            Atleast one platform should be selected.
                        </Alert>
                    ) : null}

                    <FlexLayout
                        spacing="tight"
                        direction="vertical"
                        wrap="noWrap">
                        <CheckBox
                            key={'facebookCheck'}
                            checked={placementData.includes('facebook')}
                            labelVal="Facebook"
                            onClick={() => placementFunc('facebook')}
                        />
                        <CheckBox
                            key={'instagramCheck'}
                            checked={placementData.includes('instagram')}
                            labelVal="Instagram"
                            onClick={() => placementFunc('instagram')}
                        />
                    </FlexLayout>
                </FlexLayout>
            </FlexChild>
        </FlexLayout>
    );
};

export default Placement;
