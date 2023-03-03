import {
    Alert,
    CheckBox,
    FlexChild,
    FlexLayout,
    TextStyles,
} from '@cedcommerce/ounce-ui';
import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'react-feather';
import { useParams } from 'react-router-dom';
import { placementI } from '../create';

const Placement = (_props: placementI) => {
    const { editPlacementData, updateChanges } = _props;
    const match = useParams();

    const [placement, setPlacement] = useState(['facebook']);

    useEffect(() => {
        updateChanges(placementFill(), changeFunc(), 'platforms', placement);
    }, [placement]);

    useEffect(() => {
        setPlacement([...editPlacementData]);
    }, [editPlacementData]);

    const placementFunc = (val: string) => {
        if (placement.includes(val)) {
            const temp: string[] = [...placement];
            temp.splice(placement.indexOf(val), 1);
            setPlacement(temp);
        } else {
            setPlacement([...placement, val]);
        }
    };

    const placementFill = () => {
        let valid = false;
        if (placement.length) valid = true;
        return valid;
    };

    const changeFunc = () => {
        let change = false;
        let previous = [...editPlacementData];

        if (match.CId !== undefined) {
            let current: string[] = [...placement];

            let difference = current.filter((item) => !previous.includes(item));
            if (previous.length !== current.length && difference.length === 0)
                change = true;
            else if (difference.length) change = true;
            else change = false;
        }
        return change;
    };

    return (
        <FlexLayout spacing="loose" valign="start" wrap="noWrap">
            <CheckCircle
                color={placementFill() ? '#027A48' : '#70747E'}
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
                    {placement.length === 0 ? (
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
                            checked={placement.includes('facebook')}
                            labelVal="Facebook"
                            onClick={() => placementFunc('facebook')}
                        />
                        <CheckBox
                            key={'instagramCheck'}
                            checked={placement.includes('instagram')}
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
