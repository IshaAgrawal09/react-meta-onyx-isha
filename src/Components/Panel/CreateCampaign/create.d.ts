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
    editFormData: campaignDataI;
    updateChanges: (
        flag: boolean,
        change: boolean,
        code: string,
        value: any
    ) => void;
}

export interface campaignProductsI {
    product_count: number;
}

export interface audienceI {
    editAudienceData: campaignDataI;
    setAudienceData: (val: any) => void;
    retargeting: any;
    updateChanges: (
        flag: boolean,
        change: boolean,
        code: string,
        value: any
    ) => void;
}

export interface placementI {
    editPlacementData: any;
    updateChanges: (
        flag: boolean,
        change: boolean,
        code: string,
        value: any
    ) => void;
}

export interface previewI extends DIProps {
    productPreview: { main_image: string; price: number; title: string }[];
}
