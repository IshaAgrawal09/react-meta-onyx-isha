import {
    Button,
    Card,
    FlexChild,
    FlexLayout,
    PageHeader,
    TextStyles,
} from '@cedcommerce/ounce-ui';
import React from 'react';
import { useParams } from 'react-router-dom';
import { DI, DIProps } from '../../../Core';
import CampaignForm from './CampaignForm';
import CampaignProducts from './Components/CampaignProducts';
import Placement from './Components/Placement';
import TargetLocation from './Components/TargetLocation';

const CreateCampaign = (_Props: DIProps) => {
    const { history } = _Props;
    const match = useParams();

    return (
        <>
            <PageHeader
                title="Setup Campaign"
                reverseNavigation
                description="Facebook Dynamic Ads automatically target the audience based on their interest, intent, and actions."
                onClick={() => history(`/panel/${match.uId}/dashboard`)}
            />
            <FlexLayout
                childWidth="fullWidth"
                spacing="extraLoose"
                wrap="noWrap"
                wrapMob="wrap">
                <FlexChild desktopWidth="66" mobileWidth="100" tabWidth="66">
                    <Card>
                        <CampaignForm />
                        <hr />
                        <CampaignProducts />
                        <hr />
                        <TargetLocation />
                        <hr />
                        <Placement />
                        <hr />
                        <FlexLayout spacing="loose" halign="end">
                            <Button
                                halign="Center"
                                thickness="large"
                                type="Outlined">
                                Cancel
                            </Button>
                            <Button
                                halign="Center"
                                iconAlign="left"
                                length="none"
                                // disable={DisableButton()}
                                thickness="large"
                                type="Primary">
                                Create Campaign
                            </Button>
                        </FlexLayout>
                    </Card>
                </FlexChild>
                <FlexChild desktopWidth="33" mobileWidth="100" tabWidth="33">
                    <Card>
                        <TextStyles>Preview</TextStyles>
                    </Card>
                </FlexChild>
            </FlexLayout>
        </>
    );
};

export default DI(CreateCampaign);
