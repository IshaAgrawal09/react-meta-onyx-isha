export interface DataTypeI {
    key: React.Key;
    campaign_name: string;
    campaign_id?: string;
    daily_budget?: number;
    status: string;
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
    shop_id?: number;
}
