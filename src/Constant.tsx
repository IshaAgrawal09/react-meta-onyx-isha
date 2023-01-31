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
