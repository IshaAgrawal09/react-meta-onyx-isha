export const createUrl = (endpoint: string, params: any) => {
    let link: string = endpoint;
    if (params.sort) {
        link = `${link}&sort=${params.sort}&order=${params.order}`;
    }
    if (params['filter[campaign_name]']) {
        link = `${link}&filter[campaign_name]=${params['filter[campaign_name]']}`;
    }
    if (params['filter[campaign_id]']) {
        link = `${link}&filter[campaign_id]=${params['filter[campaign_id]']}`;
    }
    if (params['filter[status][0]']) {
        link = `${link}&filter[status][0]=${params['filter[status][0]']}`;
    }
    if (params['filter[status][1]']) {
        link = `${link}&filter[status][1]=${params['filter[status][1]']}`;
    }
    if (params['filter[status][2]']) {
        link = `${link}&filter[status][2]=${params['filter[status][2]']}`;
    }
    if (params['filter[status][3]']) {
        link = `${link}&filter[status][3]=${params['filter[status][3]']}`;
    }
    if (params['filter[status][4]']) {
        link = `${link}&filter[status][4]=${params['filter[status][4]']}`;
    }
    if (params['filter[status][5]']) {
        link = `${link}&filter[status][5]=${params['filter[status][5]']}`;
    }
    if (params['filter[status][6]']) {
        link = `${link}&filter[status][6]=${params['filter[status][6]']}`;
    }
    if (params['filter[status][7]']) {
        link = `${link}&filter[status][7]=${params['filter[status][7]']}`;
    }
    return link;
};
