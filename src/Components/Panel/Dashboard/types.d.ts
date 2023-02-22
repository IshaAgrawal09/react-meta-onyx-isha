export interface DataTypeI {
    key: React.Key;
    campaign_name: string;
    campaign_id?: string;
    daily_budget?: number;
    status: any;
    campaign_placement?: string[];
    start_date?: string;
    end_date?: string;
    sales?: number;
    spend?: any;
    user_id?: string;
    impressions?: number;
    clicks?: number;
    orders?: number;
    roas?: number;
    shop_id?: string;
}
export interface ParamsInterface {
    shop_id: number;
    'filter[shop_id]': number;
    'filter[campaign_name]'?: string;
    activePage: number;
    count: number;
    order?: number | string;
    sort?: number;
}

export interface gridData {
    [key: string]: any;
}

export interface showColumns {
    [key: string]: boolean;
}

export interface errorModalI {
    errorModal: boolean;
    loadingErrorModal: boolean;
    setErrorModal: any;
    errorArray: Object[];
    solutions: any;
}

export interface warningModalI {
    warningModal: boolean;
    loadingErrorModal: boolean;
    setWarningModal: any;
    errorArray: Object[];
    solutions: any;
}
