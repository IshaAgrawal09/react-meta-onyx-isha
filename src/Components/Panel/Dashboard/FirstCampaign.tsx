import {
    Button,
    Card,
    FlexChild,
    FlexLayout,
    PageHeader,
    TextStyles,
} from '@cedcommerce/ounce-ui';
import './dashboardStyle.css';
import React from 'react';
import { Plus } from 'react-feather';
import { NoCamp } from '../../../Components/EmptyState/EmptyIllustration';

const FirstCampaign = () => {
    return (
        <>
            <PageHeader
                title="Welcome to Social Ads for Buy with Prime!"
                description="Create and manage all your Buy with Prime Facebook and Instagram campaigns here."
            />

            <Card>
                <div className="firstcampaign-main">
                    <FlexLayout
                        halign="center"
                        valign="center"
                        direction="vertical"
                        spacing="loose">
                        <FlexChild>{<NoCamp />}</FlexChild>
                        <FlexChild>
                            <>
                                <div className="inte-Align--center">
                                    <div className="mb-20">
                                        <TextStyles
                                            subheadingTypes="MD-2.2"
                                            type="SubHeading"
                                            fontweight="extraBold">
                                            Create your First Campaign
                                        </TextStyles>
                                    </div>
                                    <TextStyles>
                                        All you have to do now is start creating
                                        new campaigns. You can view and manage
                                        all your campaigns here. In case you
                                        need help understanding how to create
                                        and manage campaigns, check out
                                        the&nbsp;
                                        <Button
                                            halign="Center"
                                            iconAlign="left"
                                            length="none"
                                            onClick={() => {
                                                window.open(
                                                    `http://${window.location.host}/info/faq?query=How to manage ad campaigns with the Social Ads for the Buy with Prime app?`
                                                );
                                            }}
                                            thickness="thin"
                                            type="TextButton">
                                            Help Doc.
                                        </Button>
                                    </TextStyles>
                                </div>
                            </>
                        </FlexChild>
                        <FlexChild>
                            <Button icon={<Plus />}>Create Campaign</Button>
                        </FlexChild>
                    </FlexLayout>
                </div>
            </Card>
        </>
    );
};

export default FirstCampaign;
