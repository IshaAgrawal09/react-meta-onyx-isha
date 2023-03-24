import { FlexLayout, TextStyles } from '@cedcommerce/ounce-ui';
import * as React from 'react';

/**
 * App Source Name
 */
export const APP_SOURCE_NAME = 'onyx';
/**
 * App Target Name
 */
export const APP_TARGET_NAME = 'meta';

/**
 * Title Headers on Auth section
 */
export const cardTitleAuth = {
    login: 'Login',
    register: 'Create Account',
    forgot: 'Generate Password Reset link',
    reset: 'Reset password',
    default: '',
};
export const currency = 'USD';
export const timezone = 'EST';
export const groupCode = 'bwp-product';
export const bwpMailId = 'bwp_meta@cedcommerce.com';
/**
 * Constant for REGEX we are using on app
 */
export const regexValidation = {
    emailFormat:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+\.+([a-zA-Z0-9-]+)2*$/,
};
/**
 * url Endpoints (GET POST PUT DELETE) and redirection url
 */
export const urlFetchCalls = {
    get: {
        allNotification: 'connector/get/allNotifications',
        sendUserMail: 'onyx/user/sendUserMail',
        otpMail: 'user/otpMail',
        installtionForm: 'connector/get/installationForm',
        getRefineProductsUrl: 'connector/product/getRefineProducts',
        queuedTaskUrl: 'connector/get/allQueuedTasks',
        getRefineProductsCountsUrl: 'connector/product/getRefineProductCount',
        abortImportUrl: 'connector/get/feedAbort',
        getCampaignsUrl: 'meta/campaign/getCampaigns',
        getCampaignUrl: 'meta/campaign/getCampaign',
        initCampaignUrl: 'meta/campaign/initCampaign',
        bulkExportCSV: 'meta/campaign/bulkExportCampaign',
        getCampaignsAutoCompleteUrl: 'meta/campaign/campaignAutoComplete',
        setDataInDynamo: 'onyx/user/setDataInDynamo',
        accountStatus: 'meta/account/accountStatus',
        getDisconnectedAccountUrl: 'meta/account/getDisconnectedAccount',
        getPixelsUrl: 'meta/account/getAccountPixels',
        getAudience: 'meta/campaign/getAudience',
        faqSearch: 'webapi/rest/v1/faq/search',
    },
    post: {
        userLogin: 'user/login',
        forgotPassword: 'user/forgot',
        forgotReset: 'core/user/forgotreset',
        resetPassword: 'core/user/resetpassword',
        createUser: 'onyx/user/createUser',
        validateOtp: 'user/validateOtp',
        emailExistsCheck: 'onyx/user/isEmailExist',
        productImport: 'connector/product/import',
        syncProductsUrl: 'connector/product/syncSourceProduct',
        solutionsUrl: 'webapi/rest/v1/solution/get',
        customAudience: 'meta/account/createCustomAudience',
        getConfigUrl: 'connector/config/getConfig',
        updateConfigUrl: 'connector/config/saveConfig',
        updatePixelUrl: 'meta/account/updatePixel',
        createCustomAudience: 'meta/account/createCustomAudience',
        updateCampaign: 'meta/campaign/updateCampaign',
        publishCampaign: 'meta/campaign/publishCampaign',
    },
    put: {
        pauseCampaignUrl: 'meta/campaign/pauseCampaign',
        activeCampaignUrl: 'meta/campaign/activeCampaign',
    },
    delete: {
        archiveCampaignUrl: 'meta/campaign/archiveCampaign',
    },
    redirect: {
        resetPage: '/auth/reset/',
        loginPage: '/auth/login',
    },
};

export const externalRedirectLink = {
    contentGuideUrl:
        'https://www.facebook.com/business/help/223409425500940?id=271710926837064',
    registrationReadOurPolicy: 'https://cedcommerce.com/privacy-policy',
    onboardingCheckoutGuide:
        'https://www.facebook.com/business/help/120325381656392?id=725943027795860',
    onboardingAboutMetaPixel:
        'https://www.facebook.com/business/help/471978536642445?id=1205376682832142',
    onboardingFacebookCatalog:
        'https://www.facebook.com/business/help/2086567618225367?id=725943027795860',
    editProductOnBWPConsole:
        'https://console.buywithprime.amazon.com/login?redirectURI=%2Fproducts',
    supportCedcommerce: 'https://socialsadsforbwp.freshdesk.com/support/home',
};
/**
 * Email Templates Mail Subjects
 */
export const subject = {
    passwordReset:
        'Reset your password for Social Ads for Buy with Prime Account',
    otpMailSend: 'Your One-time passcode for Email verification',
};

// ToolTIp of dashboard Grid

export const gridTooltip: any = {
    campaign_name:
        'Campaign Name is an indentifier for your campaigns or purpose of campaign creation. Choose what you want your campaigns to achieve, such as generating purchases or Page likes.',
    status: 'The current status of your campaign.',
    placement:
        'View your data by the platform where your campaign will be shown (e.g. Facebook, Instagram).',
    start_date: 'The date your campaign is scheduled to begin running.',
    end_date: 'The date your campaign is scheduled to stop running.',
    daily_budget: (
        <FlexLayout direction="vertical" spacing="extraTight">
            <TextStyles
                alignment="left"
                fontweight="normal"
                paragraphTypes="SM-1.3"
                subheadingTypes="XS-1.6"
                textcolor="light"
                type="Paragraph"
                utility="none">
                A budget is the amount of money that you want to spend on
                showing people your campaigns. It's also a cost control tool. It
                helps control your overall spending for a campaign, the same way
                a bid strategy helps control your cost per result."
            </TextStyles>
            <a
                href="https://www.facebook.com/business/help/190490051321426?id=629338044106215"
                target="_blank">
                Learn More
            </a>
        </FlexLayout>
    ),
    sales: `Sum of order values we get though campaign's order purchase event.`,
    spend: `The estimated total amount of money you've spent on your campaign during its schedule running time.`,
    impressions: `The number of times that your campaigns were on-screen.`,
    clicks: `The number of clicks on your campaigns.`,
    orders: `The number of purchase events attributed to your campaigns, based on information received from one or more of your connected Meta Business Tools.`,
    roas: `The total return on campaign spend (ROAS) from purchases. This is based on information received from one or more of your connected Meta Business Tools and attributed to your campaigns.`,
};
