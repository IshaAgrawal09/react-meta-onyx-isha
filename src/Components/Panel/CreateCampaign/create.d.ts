import { DIProps } from '../../../Core';

export interface campaignDataI {
    name: string;
    gender: string;
    min_age: string;
    max_age: string;
    placements: string[];
    start_date?: any;
    end_date?: any;
    adText: string;
    daily_budget: string;
}

export interface campaignFormI {
    formData: campaignDataI;
    setFormData: (val: any) => void;
    fillData: {
        campaign_details: boolean;
        products: boolean;
        location: boolean;
        audience: boolean;
        placement: boolean;
    };
    setFillData: (val: any) => void;
}

export interface campaignProductsI {
    product_count: number;
}

export interface audienceI {
    audienceData: campaignDataI;
    setAudienceData: (val: any) => void;
    fillData: {
        campaign_details: boolean;
        products: boolean;
        location: boolean;
        audience: boolean;
        placement: boolean;
    };
    setFillData: (val: any) => void;
}

export interface placementI {
    placement: campaignDataI;
    setPlacement: (val: any) => void;
    fillData: {
        campaign_details: boolean;
        products: boolean;
        location: boolean;
        audience: boolean;
        placement: boolean;
    };
    setFillData: (val: any) => void;
}

export interface previewI extends DIProps {
    productPreview: { main_image: string; price: number; title: string }[];
}
