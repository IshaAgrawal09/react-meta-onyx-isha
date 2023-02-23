import {
    Button,
    Card,
    FlexChild,
    FlexLayout,
    PageHeader,
    TextStyles,
} from '@cedcommerce/ounce-ui';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { urlFetchCalls } from '../../../Constant';
import { DI, DIProps } from '../../../Core';
import CampaignForm from './CampaignForm';
import CampaignProducts from './Components/CampaignProducts';
import Placement from './Components/Placement';
import TargetLocation from './Components/TargetLocation';

const CreateCampaign = (_props: DIProps) => {
    const { history } = _props;
    const match = useParams();
    const { get } = urlFetchCalls;
    const facebookShopId = _props.redux.current?.target?._id;

    const [data, setData] = useState<any>();
    const [formData, setFormData] = useState({
        name: '',
        start_date: '',
        end_date: '',
        daily_budget: '',
        adText: '',
    });

    const initCampaignParams = {
        shop_id: facebookShopId,
    };
    useEffect(() => {
        _props.di
            .GET(get.initCampaignUrl, initCampaignParams)
            .then((response) => {
                const { success, data } = response;
                if (success) {
                    setData(data);
                }
            });
    }, []);

    const validateComplete = () => {
        const { name, daily_budget, start_date, end_date, adText } = formData;
        let valid = false;
        if (
            name !== '' &&
            daily_budget !== '' &&
            start_date !== '' &&
            adText !== '' &&
            name.length < 395 &&
            daily_budget > '4'
        ) {
            valid = true;
        }
        return valid;
    };

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
                        <CampaignForm
                            formData={formData}
                            setFormData={setFormData}
                            validateComplete={validateComplete}
                        />
                        <hr />
                        <CampaignProducts
                            product_count={data?.products_count}
                        />
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
