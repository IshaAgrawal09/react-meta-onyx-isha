import {
    Alert,
    Button,
    Card,
    FlexChild,
    FlexLayout,
    PageHeader,
    TextStyles,
} from '@cedcommerce/ounce-ui';
import React, { useEffect, useState } from 'react';
import './createCampaign.css';
import { useParams } from 'react-router-dom';
import { urlFetchCalls } from '../../../Constant';
import { DI, DIProps } from '../../../Core';
import CampaignForm from './Components/CampaignForm';
import Audience from './Components/Audience/Audience';
import CampaignProducts from './Components/CampaignProducts';
import Placement from './Components/Placement';
import TargetLocation from './Components/TargetLocation';
import Preview from './Components/Preview/Preview';
import { campaignDataI } from './create';
import moment from 'moment';

const CreateCampaign = (_props: DIProps) => {
    const { history } = _props;
    const match = useParams();
    const { get } = urlFetchCalls;
    const facebookShopId = _props.redux.current?.target?._id;

    const [data, setData] = useState<any>();

    const [fillData, setFillData] = useState({
        campaign_details: false,
        products: true,
        location: true,
        audience: false,
        placement: true,
    });

    const [campaignData, setCampaignData] = useState<campaignDataI>({
        name: '',
        start_date: '',
        end_date: '',
        daily_budget: '',
        adText: '',
        gender: '0',
        max_age: '65+',
        min_age: '18',
        // groups: [],
        placements: ['facebook'],
    });

    const initCampaignParams = {
        shop_id: facebookShopId,
    };

    useEffect(() => {
        initCampaign();
        if (match.CId !== undefined) {
            const params = {
                shop_id: facebookShopId,
                id: match.CId,
            };

            _props.di.GET(get.getCampaignUrl, params).then((response: any) => {
                const { success, data } = response;
                if (success) {
                    setCampaignData({
                        ...campaignData,
                        name: data?.campaign_name ?? '',
                        start_date: data?.start_date ?? '',
                        end_date: data?.end_date ?? '',
                        daily_budget: data?.budget ?? '',
                        adText: '',
                        gender:
                            data?.gender == 'all'
                                ? '0'
                                : data?.gender == 'male'
                                ? '1'
                                : '2',
                        max_age:
                            Number(data?.max_age) > 64 ? '65+' : data?.max_age,
                        min_age: data?.min_age ?? '18',
                        placements: data?.platforms ?? ['facebook'],
                    });
                } else {
                    let data = {
                        name: 'SuperHandy Catalog',
                        start_date: moment('03/03/2023'),
                        end_date: moment('23/03/2023'),
                        daily_budget: '50',
                        adText: 'placements',
                        gender: '0',
                        max_age: '65+',
                        min_age: '25',
                        placements: ['facebook', 'instagram'],
                    };

                    setCampaignData({ ...data });
                }
            });
        }
    }, []);

    const initCampaign = () => {
        _props.di
            .GET(get.initCampaignUrl, initCampaignParams)
            .then((response) => {
                const { success, data } = response;
                if (success) {
                    setData(data);
                }
            });
    };

    const disableButton = () => {
        let bool = Object.values(fillData).find((item: boolean) => {
            if (item === false) return true;
        });
        if (bool === undefined) return false;
        else return true;
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
            {data?.products_count == 0 ? (
                <div className="mt-10 mb-20">
                    <Alert
                        destroy={false}
                        onClose={function noRefCheck() {}}
                        type="danger">
                        <TextStyles
                            alignment="left"
                            fontweight="extraBold"
                            paragraphTypes="MD-1.4"
                            subheadingTypes="XS-1.6"
                            textcolor="dark"
                            type="SubHeading"
                            utility="none">
                            Your facebook catalog is not ready!
                        </TextStyles>
                        <TextStyles>
                            No Product(s) Found! Please recheck if your product
                            catalog has Buy with Prime-eligible products and try
                            again.
                        </TextStyles>
                    </Alert>
                </div>
            ) : null}
            <div
                className={data?.products_count == 0 ? 'disable-campaign' : ''}>
                <FlexLayout
                    childWidth="fullWidth"
                    spacing="extraLoose"
                    wrap="noWrap"
                    wrapMob="wrap">
                    <FlexChild
                        desktopWidth="66"
                        mobileWidth="100"
                        tabWidth="66">
                        <Card>
                            <CampaignForm
                                formData={campaignData}
                                setFormData={setCampaignData}
                                fillData={fillData}
                                setFillData={setFillData}
                            />
                            <hr />
                            <CampaignProducts
                                product_count={data?.products_count}
                            />
                            <hr />
                            <TargetLocation />
                            <hr />
                            <Audience
                                audienceData={campaignData}
                                setAudienceData={setCampaignData}
                                fillData={fillData}
                                setFillData={setFillData}
                            />
                            <hr />
                            <Placement
                                placement={campaignData}
                                setPlacement={setCampaignData}
                                fillData={fillData}
                                setFillData={setFillData}
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
                                    disable={disableButton()}
                                    thickness="large"
                                    type="Primary"
                                    content={
                                        match.CId !== undefined
                                            ? 'Save Changes'
                                            : 'Create Campaign'
                                    }></Button>
                            </FlexLayout>
                        </Card>
                    </FlexChild>
                    <FlexChild
                        desktopWidth="33"
                        mobileWidth="100"
                        tabWidth="33">
                        <Preview productPreview={data?.products_preview} />
                    </FlexChild>
                </FlexLayout>
            </div>
        </>
    );
};

export default DI(CreateCampaign);
