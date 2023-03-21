import {
    Card,
    FlexChild,
    FlexLayout,
    TextStyles,
    List,
    Button,
    Alert,
    Modal,
} from '@cedcommerce/ounce-ui';
import React, { useState } from 'react';
import {
    CedLogoOnboarding,
    Checkicon,
    ClipBoard,
    WhiteFacebookIcon,
} from '../Settings/svgs/Svgs';
import { APP_SOURCE_NAME, externalRedirectLink } from '../../../Constant';
import Footer from '../../Footer/Footer';
import { DI, DIProps } from '../../../Core';
import { syncConnectorInfo, syncNecessaryInfo } from '../../../Actions';
import SuccessOnboarding from './SuccessOnboarding';
interface Props extends DIProps {
    syncNecessaryInfo: any;
    syncConnectorInfo: any;
}

const Onboarding = (_props: Props): JSX.Element => {
    const {
        onboardingCheckoutGuide,
        onboardingAboutMetaPixel,
        onboardingFacebookCatalog,
    } = externalRedirectLink;

    const {
        redux: { user_id, current },
    } = _props;

    // const {
    //     get: { installtionForm, setDataInDynamo },
    // } = urlFetchCalls;

    const onyxShopId = current?.source?._id;

    const [disableButton, setDisableButton] = useState(false);
    const [errorMsgForFB, setErrorMsgForFB] = useState<string | null>(
        localStorage.getItem('errorMsgForFB')
    );

    const [errorConnectingFB, setErrorConnectingFB] = useState<boolean>(false);
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [successBanner, setSuccessBanner] = useState<boolean>(false);

    let className = 'inte-fbBtn';
    if (disableButton) {
        className = 'inte-fbBtn inte-btn-disable';
    }

    const ConnectFunc = () => {
        const appTag = _props.di.environment.appTag;
        const State = {
            app_tag: appTag,
            user_id: user_id,
            source: APP_SOURCE_NAME,
            source_shop_id: onyxShopId,
        };
        // const url = `${
        //     _props.di.environment.API_ENDPOINT
        // }${installtionForm}?code=${APP_TARGET_NAME}&state=${JSON.stringify(
        //     State
        // )}&bearer=${_props.di.globalState.getBearerToken()}&currency=${currency}&timezone=${timezone}`;

        // const url =
        //     'http://localhost:6500/show/message?success=false&message=kjhdichbdvgbcidshvkdsbvdsv';

        const url =
            'http://localhost:6500/auth/login?user_token={eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjM4OWQ1YTBiZDJkMjkxNGFkMDBkZWU3Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjc1MjQzNDAxLCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzZDlmNzQ5ODZiODBkNzg4YzA4MmI4NiJ9.U6mCrYFs8J2Ixdb6TOUuta3SjAAi1TNcx3hZc7B7rcSkMutJI7rGIGZ_Nh5qiog56OFUUSGTOP-yc9TCIpkVEilSPe0kM7qga7X8jpKDOSKxD-cg_y1aSaNns_G8J_r40uV1k_QsJhfCSkGzyeHRHmhWwlyJXLflUOw0xFpbQBZzHOt7js0gYHSiSMjVzN__aNysGVlDJj7SlK0PCWztdE9uoAFVmJ-vmKNCrAHt12La94SBN3WLScV69Ex4RJVJ5dCy0jqcMErg-UoXF-zAdePhg82xpa_-CuyaXR-8OPTKHcIUKOHPJ98bIKgnlKnzMEHhi-DtebSNvBhkOMzwxg}&connectionStatus=1';

        const win = window.open(url);
        setDisableButton(true);

        const int = setInterval(async () => {
            if (win?.closed) {
                const canImport = localStorage.getItem('CanImport');
                setDisableButton(false);
                clearInterval(int);
                if (canImport === 'true') {
                    setSuccessBanner(true);
                    setErrorConnectingFB(false);

                    // why we are using this here
                    setTimeout(() => {
                        // setOnboardingComplete('true'),
                        _props.di.globalState.set('onboarding', 'true');
                    }, 500);
                } else {
                    setSuccessBanner(false);
                    setErrorConnectingFB(true);
                }
                localStorage.removeItem('CanImport');
            }
        });
        if (localStorage.getItem('errorMsgForFB')) {
            setErrorMsgForFB(localStorage.getItem('errorMsgForFB'));
            // localStorage.removeItem('errorMsgForFB');
        }
    };
    return (
        <>
            {successBanner ? (
                <SuccessOnboarding />
            ) : (
                <div className="inte-welcomeMeta__Wrapper">
                    <div className="inte-WelcomeMeta__Wrapper-Inner-onboard">
                        <FlexLayout direction="vertical" spacing="extraLoose">
                            <FlexLayout spacing="extraLoose" valign="center">
                                <CedLogoOnboarding />
                                <FlexLayout direction="vertical">
                                    <TextStyles
                                        headingTypes="LG-2.8"
                                        lineHeight="LH-3.6"
                                        textcolor="normal"
                                        type="Heading">
                                        Welcome!
                                    </TextStyles>
                                    <TextStyles
                                        headingTypes="LG-2.8"
                                        lineHeight="LH-3.6"
                                        fontweight="extraBold"
                                        type="Heading">
                                        Social Ads for Buy with Prime
                                    </TextStyles>
                                </FlexLayout>
                            </FlexLayout>
                            <FlexLayout spacing="extraLoose">
                                <FlexChild
                                    desktopWidth="50"
                                    tabWidth="50"
                                    mobileWidth="100">
                                    <Card
                                        cardType="Bordered"
                                        title={'Things You Should know!'}>
                                        <div className="custom-list-onboard">
                                            <List type={'disc'}>
                                                <TextStyles textcolor="light">
                                                    NOTE: Before linking your
                                                    Meta account, make sure your
                                                    Buy with Prime catalog
                                                    includes all fields required
                                                    by Meta, including optional
                                                    fields not required by Buy
                                                    with Prime. This includes
                                                    your site's product detail
                                                    page URL and your product
                                                    description. These fields
                                                    are required to build
                                                    landing pages for your
                                                    campaigns.{' '}
                                                    <Button
                                                        halign="Center"
                                                        iconAlign="left"
                                                        length="none"
                                                        onAction={function noRefCheck() {}}
                                                        onClick={() => {
                                                            window.open(
                                                                onboardingCheckoutGuide
                                                            );
                                                        }}
                                                        thickness="thin"
                                                        type="TextButton">
                                                        Check out this guide to
                                                        know more.
                                                    </Button>
                                                </TextStyles>
                                                <TextStyles>
                                                    Please note that once you
                                                    link your account to the app
                                                    you will be able to see the
                                                    Buy with Prime catalog
                                                    everywhere you manage
                                                    Facebook campaigns including
                                                    the Facebook Ads manager
                                                    account.
                                                </TextStyles>
                                                <TextStyles>
                                                    Make sure the product titles
                                                    are the same as the Direct
                                                    to Consumer site product
                                                    titles as these will reflect
                                                    on the Ad copy.
                                                </TextStyles>
                                                <TextStyles>
                                                    We will use Meta Pixel to
                                                    leverage customer data to
                                                    personalize advertising for
                                                    customers with the best
                                                    performance of the campaigns
                                                    in mind. This data is shared
                                                    with Facebook. Check out
                                                    this&nbsp;
                                                    <Button
                                                        halign="Center"
                                                        iconAlign="left"
                                                        length="none"
                                                        onAction={function noRefCheck() {}}
                                                        onClick={() => {
                                                            window.open(
                                                                onboardingAboutMetaPixel
                                                            );
                                                        }}
                                                        thickness="thin"
                                                        type="TextButton">
                                                        About Meta Pixel
                                                    </Button>
                                                    &nbsp;guide to understand
                                                    more about privacy and
                                                    safety.
                                                </TextStyles>
                                                <TextStyles>
                                                    For optimum performance and
                                                    results, check out
                                                    this&nbsp;
                                                    <Button
                                                        halign="Center"
                                                        iconAlign="left"
                                                        length="none"
                                                        onAction={function noRefCheck() {}}
                                                        onClick={() => {
                                                            window.open(
                                                                onboardingFacebookCatalog
                                                            );
                                                        }}
                                                        thickness="thin"
                                                        type="TextButton">
                                                        guide on Facebook
                                                        catalogs.
                                                    </Button>
                                                </TextStyles>
                                            </List>
                                        </div>
                                    </Card>
                                </FlexChild>
                                <FlexChild
                                    desktopWidth="50"
                                    tabWidth="50"
                                    mobileWidth="100">
                                    <>
                                        <div className="onborading-card">
                                            <Card>
                                                <div className="mb-20">
                                                    {errorConnectingFB ? (
                                                        <Alert
                                                            type="danger"
                                                            destroy={false}>
                                                            Unable to connect
                                                            your account. Please
                                                            try again.
                                                            {errorMsgForFB?.length ? (
                                                                <Button
                                                                    type="TextButton"
                                                                    onClick={() => {
                                                                        setOpenErrorModal(
                                                                            !openErrorModal
                                                                        );
                                                                    }}>
                                                                    Wondering
                                                                    what went
                                                                    wrong?
                                                                </Button>
                                                            ) : null}
                                                        </Alert>
                                                    ) : null}
                                                </div>
                                                <TextStyles
                                                    fontweight="extraBold"
                                                    textcolor="dark">
                                                    Link your Facebook Account
                                                </TextStyles>
                                                <TextStyles>
                                                    To create, manage, and
                                                    publish your campaigns on
                                                    Facebook, link your account
                                                    with Social Ads for Buy with
                                                    Prime account.
                                                </TextStyles>
                                                <div className="custom-info-onboard">
                                                    <FlexLayout
                                                        spacing="loose"
                                                        direction="vertical">
                                                        <FlexLayout>
                                                            <FlexChild desktopWidth="80">
                                                                <FlexLayout
                                                                    valign="center"
                                                                    halign="fill">
                                                                    <FlexChild>
                                                                        <>
                                                                            <TextStyles
                                                                                alignment="left"
                                                                                fontweight="extraBold"
                                                                                paragraphTypes="MD-1.4"
                                                                                textcolor="dark"
                                                                                type="Paragraph"
                                                                                utility="none">
                                                                                Your
                                                                                Journey
                                                                                ahead!
                                                                            </TextStyles>
                                                                            <TextStyles
                                                                                alignment="left"
                                                                                fontweight="normal"
                                                                                paragraphTypes="MD-1.4"
                                                                                textcolor="normal"
                                                                                type="Paragraph"
                                                                                utility="none">
                                                                                Check
                                                                                on
                                                                                the
                                                                                following
                                                                                action
                                                                                items
                                                                                before
                                                                                proceeding:
                                                                            </TextStyles>
                                                                        </>
                                                                    </FlexChild>
                                                                </FlexLayout>
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <ClipBoard />
                                                            </FlexChild>
                                                        </FlexLayout>
                                                        <FlexLayout
                                                            direction="vertical"
                                                            spacing="tight">
                                                            <FlexLayout
                                                                spacing="tight"
                                                                wrap="noWrap">
                                                                <Checkicon />
                                                                <TextStyles
                                                                    alignment="left"
                                                                    fontweight="normal"
                                                                    textcolor="dark"
                                                                    type="Paragraph"
                                                                    utility="none">
                                                                    Select
                                                                    Business
                                                                    Manager
                                                                </TextStyles>
                                                            </FlexLayout>
                                                            <FlexLayout
                                                                spacing="tight"
                                                                wrap="noWrap">
                                                                <Checkicon />
                                                                <TextStyles
                                                                    alignment="left"
                                                                    fontweight="normal"
                                                                    textcolor="dark"
                                                                    type="Paragraph"
                                                                    utility="none">
                                                                    Select an
                                                                    active
                                                                    Facebook
                                                                    Page
                                                                </TextStyles>
                                                            </FlexLayout>
                                                            <FlexLayout
                                                                spacing="tight"
                                                                wrap="noWrap">
                                                                <Checkicon />
                                                                <TextStyles
                                                                    alignment="left"
                                                                    fontweight="normal"
                                                                    textcolor="dark"
                                                                    type="Paragraph"
                                                                    utility="none">
                                                                    Select an
                                                                    active
                                                                    Instagram
                                                                    Profile
                                                                </TextStyles>
                                                            </FlexLayout>
                                                            <FlexLayout
                                                                spacing="tight"
                                                                wrap="noWrap">
                                                                <Checkicon />
                                                                <TextStyles
                                                                    alignment="left"
                                                                    fontweight="normal"
                                                                    textcolor="dark"
                                                                    type="Paragraph"
                                                                    utility="none">
                                                                    Connect
                                                                    Facebook Ad
                                                                    Account
                                                                </TextStyles>
                                                            </FlexLayout>
                                                            <FlexLayout
                                                                spacing="tight"
                                                                wrap="noWrap">
                                                                <Checkicon />
                                                                <TextStyles
                                                                    alignment="left"
                                                                    fontweight="normal"
                                                                    textcolor="dark"
                                                                    type="Paragraph"
                                                                    utility="none">
                                                                    Select Meta
                                                                    Pixel ID
                                                                </TextStyles>
                                                            </FlexLayout>
                                                        </FlexLayout>
                                                    </FlexLayout>
                                                </div>
                                                <hr />
                                                <button
                                                    disabled={disableButton}
                                                    onClick={() =>
                                                        ConnectFunc()
                                                    }
                                                    className={className}>
                                                    {disableButton ? (
                                                        <div className="custom_auth_loader"></div>
                                                    ) : (
                                                        <>
                                                            <WhiteFacebookIcon />
                                                            <span>
                                                                Authorize and
                                                                Connect
                                                            </span>
                                                        </>
                                                    )}
                                                </button>
                                            </Card>
                                        </div>
                                    </>
                                </FlexChild>
                            </FlexLayout>
                        </FlexLayout>
                    </div>
                </div>
            )}
            <Footer />
            <Modal
                open={openErrorModal}
                close={() => setOpenErrorModal(false)}
                heading="Account Connection Error"
                modalSize="small"
                primaryAction={{
                    content: 'Okay',
                    loading: false,
                    onClick: () => setOpenErrorModal(false),
                }}>
                <TextStyles>
                    An error occured while connecting your Facebook account.
                    Here are some of the reasons why this happened.
                    <div className="mt-20">
                        <List type="disc">
                            <TextStyles
                                alignment="left"
                                fontweight="normal"
                                textcolor="dark"
                                type="none"
                                utility="custom-heading_camp1">
                                {errorMsgForFB ?? ''}
                            </TextStyles>
                        </List>
                    </div>
                </TextStyles>
            </Modal>
        </>
    );
};

export default DI(Onboarding, {
    func: { syncConnectorInfo, syncNecessaryInfo },
});
