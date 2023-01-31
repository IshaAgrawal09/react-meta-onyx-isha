import {
    Card,
    FlexChild,
    FlexLayout,
    TextStyles,
    List,
    Button,
} from '@cedcommerce/ounce-ui';
import React, { useState } from 'react';
import {
    CedLogoOnboarding,
    Checkicon,
    ClipBoard,
    WhiteFacebookIcon,
} from '../Settings/svgs/Svgs';
import {
    APP_SOURCE_NAME,
    APP_TARGET_NAME,
    currency,
    externalRedirectLink,
    timezone,
    urlFetchCalls,
} from '../../../Constant';
import Footer from '../../Footer/Footer';

const Onboarding = (): JSX.Element => {
    const {
        onboardingCheckoutGuide,
        onboardingAboutMetaPixel,
        onboardingFacebookCatalog,
    } = externalRedirectLink;

    const [disableButton, setDisableButton] = useState(false);

    let className = 'inte-fbBtn';
    if (disableButton) {
        className = 'inte-fbBtn inte-btn-disable';
    }
    return (
        <>
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
                                                NOTE: Before linking your Meta
                                                account, make sure your Buy with
                                                Prime catalog includes all
                                                fields required by Meta,
                                                including optional fields not
                                                required by Buy with Prime. This
                                                includes your site's product
                                                detail page URL and your product
                                                description. These fields are
                                                required to build landing pages
                                                for your campaigns.{' '}
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
                                                    Check out this guide to know
                                                    more.
                                                </Button>
                                            </TextStyles>
                                            <TextStyles>
                                                Please note that once you link
                                                your account to the app you will
                                                be able to see the Buy with
                                                Prime catalog everywhere you
                                                manage Facebook campaigns
                                                including the Facebook Ads
                                                manager account.
                                            </TextStyles>
                                            <TextStyles>
                                                Make sure the product titles are
                                                the same as the Direct to
                                                Consumer site product titles as
                                                these will reflect on the Ad
                                                copy.
                                            </TextStyles>
                                            <TextStyles>
                                                We will use Meta Pixel to
                                                leverage customer data to
                                                personalize advertising for
                                                customers with the best
                                                performance of the campaigns in
                                                mind. This data is shared with
                                                Facebook. Check out this&nbsp;
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
                                                &nbsp;guide to understand more
                                                about privacy and safety.
                                            </TextStyles>
                                            <TextStyles>
                                                For optimum performance and
                                                results, check out this&nbsp;
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
                                                    guide on Facebook catalogs.
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
                                <Card
                                    cardType="Bordered"
                                    title={'Link your Facebook Account'}>
                                    <TextStyles>
                                        To create, manage, and publish your
                                        campaigns on Facebook, link your account
                                        with Social Ads for Buy with Prime
                                        account.
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
                                                                    Your Journey
                                                                    ahead!
                                                                </TextStyles>
                                                                <TextStyles
                                                                    alignment="left"
                                                                    fontweight="normal"
                                                                    paragraphTypes="MD-1.4"
                                                                    textcolor="normal"
                                                                    type="Paragraph"
                                                                    utility="none">
                                                                    Check on the
                                                                    following
                                                                    action items
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
                                                        Select Business Manager
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
                                                        Select an active
                                                        Facebook Page
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
                                                        Select an active
                                                        Instagram Profile
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
                                                        Connect Facebook Ad
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
                                                        Select Meta Pixel ID
                                                    </TextStyles>
                                                </FlexLayout>
                                            </FlexLayout>
                                        </FlexLayout>
                                    </div>
                                    <hr />
                                    <button
                                        className={className}
                                        disabled={disableButton}>
                                        <WhiteFacebookIcon />
                                        <span>Authorize and Connect</span>
                                    </button>
                                </Card>
                            </FlexChild>
                        </FlexLayout>
                    </FlexLayout>
                </div>
            </div>
        </>
    );
};

export default Onboarding;
