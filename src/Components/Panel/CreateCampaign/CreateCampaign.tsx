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
import Audience from './Components/Audience/Audience';
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

    const [audienceData, setAudienceData] = useState({
        gender: '0',
        max_age: '65+',
        min_age: '18',
        groups: [],
    });

    const [placement, setPlacement] = useState([]);

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
            Number(daily_budget) > 4
        ) {
            valid = true;
        }
        return valid;
    };

    let createParams = {
        call_to_action: 'SHOP_NOW',
        form_token: data?.form_token,
        locations: [
            {
                key: 'US',
                name: 'United States',
                type: 'country',
                country_code: 'US',
                country_name: 'United States',
                supports_region: true,
                supports_city: true,
            },
        ],
        shop_id: 1031,
        status: 'ACTIVE',
        type: 'basic',
        website_url: 'https://www.amazon.com',
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
                        <Audience
                            audienceData={audienceData}
                            setAudienceData={setAudienceData}
                        />
                        <hr />
                        <Placement
                            placement={placement}
                            setPlacement={setPlacement}
                        />
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
