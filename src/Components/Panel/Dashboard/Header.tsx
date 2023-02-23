import {
    Badge,
    Button,
    FlexLayout,
    TextStyles,
    ToolTip,
} from '@cedcommerce/ounce-ui';
import React, { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import DashboardAction from './DashboardAction';
import { DataTypeI } from './types';
import './dashboardStyle.css';
import { AlertTriangle, Facebook, Instagram } from 'react-feather';
import { DI, DIProps } from '../../../Core';
import { urlFetchCalls } from '../../../Constant';

const Header = (_props: DIProps) => {
    // const {
    //     di: { globalState, GET, POST, environment },
    //     history,
    // } = _props;
    // const { get, post } = urlFetchCalls;
    // const [errorModal, setErrorModal] = useState(false);
    // const [errorArray, setErrorArray] = useState([]);
    // const [solutions, setSolutions] = useState<any>([{}]);
    // const [loadingErrorModal, setLoadingErrorModal] = useState(false);

    // const openErrorModalFunc = (error: any) => {
    //     setErrorModal(true);
    //     setErrorArray(error);
    //     const errorPayload = error.map((item: any) => ({
    //         title: item.title,
    //         marketplace: 'meta',
    //     }));
    //     setLoadingErrorModal(true);
    //     POST(post.solutionsUrl, errorPayload)
    //         .then((result: any) => {
    //             const { success, data } = result;
    //             if (success) {
    //                 setSolutions([...solutions, data]);
    //             }
    //         })
    //         .finally(() => setLoadingErrorModal(false));
    // };

    const columns = [
        {
            title: (
                <ToolTip
                    position="right"
                    helpText={<TextStyles>Campaigns Details</TextStyles>}
                    open={false}
                    type="light"
                    popoverContainer="body">
                    <div className="download_tooltip">
                        <TextStyles>Campaign</TextStyles>
                    </div>
                </ToolTip>
            ),
            sorter: {
                compare: (a: any, b: any) =>
                    a.campaign_name.length - b.campaign_name.length,
                multiple: 2,
            },
            width: 150,
            dataIndex: 'campaign_name',
            key: 'campaign_name',
            fixed: 'left',
        },
        {
            title: (
                <ToolTip
                    position="right"
                    helpText={
                        <TextStyles>
                            The current status of your campaign.
                        </TextStyles>
                    }
                    open={false}
                    type="light"
                    popoverContainer="body">
                    <div className="download_tooltip">
                        <TextStyles>Status</TextStyles>
                    </div>
                </ToolTip>
            ),
            sorter: {
                compare: (a: any, b: any) => a.status.length - b.status.length,
            },
            dataIndex: 'status',
            width: 150,
            key: 'status',
            fixed: 'left',
            render: (event: any) => {
                return (
                    <>
                        {event[0] === 'Error' ? (
                            <Button
                                icon={<AlertTriangle />}
                                type="DangerPlain"
                                onClick={() => {
                                    // openErrorModalFunc(event[1]);
                                }}>
                                Error
                            </Button>
                        ) : (
                            <Badge
                                type={
                                    event[0] === 'Paused'
                                        ? 'Warning-200'
                                        : event[0] === 'Pending'
                                        ? 'Neutral-100-Border'
                                        : event[0] === 'Scheduled'
                                        ? 'Positive-100'
                                        : event[0] === 'Active'
                                        ? 'Positive-200'
                                        : event[0] === 'Archived'
                                        ? 'Info-100'
                                        : event[0] === 'Disconnected'
                                        ? 'Neutral-100'
                                        : 'Neutral-200'
                                }>
                                {event[0]}
                            </Badge>
                        )}
                    </>
                );
            },
        },
        {
            title: (
                <ToolTip
                    position="right"
                    helpText={
                        <TextStyles>
                            View your data by the platform where your campaign
                            will be shown (e.g. Facebook, Instagram).
                        </TextStyles>
                    }
                    open={false}
                    type="light"
                    popoverContainer="body">
                    <div className="download_tooltip">
                        <TextStyles>Placement</TextStyles>
                    </div>
                </ToolTip>
            ),
            dataIndex: 'campaign_placement',
            width: 110,
            key: 'campaign_placement',
            render: (platform: any) => {
                if (
                    platform.length === 2 &&
                    platform.includes('facebook') &&
                    platform.includes('instagram')
                ) {
                    return (
                        <>
                            <span className="icon-overlapping_icon">
                                <Facebook />
                            </span>
                            <span className="icon-overlapping_icon">
                                <Instagram />
                            </span>
                        </>
                    );
                } else if (
                    platform.length === 1 &&
                    platform.includes('facebook')
                ) {
                    return (
                        <>
                            <span className="icon-overlapping_icon">
                                <Facebook />
                            </span>
                        </>
                    );
                } else if (
                    platform.length === 1 &&
                    platform.includes('instagram')
                ) {
                    return (
                        <>
                            <span className="icon-overlapping_icon">
                                <Instagram />
                            </span>
                        </>
                    );
                }
            },
        },
        {
            title: (
                <ToolTip
                    position="right"
                    helpText={
                        <TextStyles>
                            The date your campaign is scheduled to begin
                            running.
                        </TextStyles>
                    }
                    open={false}
                    type="light"
                    popoverContainer="body">
                    <div className="download_tooltip">
                        <TextStyles>Start Date</TextStyles>
                    </div>
                </ToolTip>
            ),
            sorter: {
                compare: (a: any, b: any) => a.start_date - b.start_date,
                multiple: 2,
            },
            dataIndex: 'start_date',
            key: 'start_date',
        },
        {
            title: (
                <ToolTip
                    position="right"
                    helpText={
                        <TextStyles type="Paragraph">
                            The date your campaign is scheduled to stop running.
                        </TextStyles>
                    }
                    open={false}
                    type="light"
                    popoverContainer="body">
                    <div className="download_tooltip">
                        <TextStyles>End Date</TextStyles>
                    </div>
                </ToolTip>
            ),
            sorter: {
                compare: (a: any, b: any) => a.end_date - b.end_date,
                multiple: 3,
            },
            dataIndex: 'end_date',
            width: 150,
            key: 'end_date',
        },
        {
            title: (
                <ToolTip
                    position="left"
                    helpText={
                        <FlexLayout direction="vertical" spacing="extraTight">
                            <TextStyles
                                alignment="left"
                                fontweight="normal"
                                paragraphTypes="SM-1.3"
                                subheadingTypes="XS-1.6"
                                textcolor="light"
                                type="Paragraph"
                                utility="none">
                                A budget is the amount of money that you want to
                                spend on showing people your campaigns. It's
                                also a cost control tool. It helps control your
                                overall spending for a campaign, the same way a
                                bid strategy helps control your cost per
                                result."
                            </TextStyles>
                            <a
                                href="https://www.facebook.com/business/help/190490051321426?id=629338044106215"
                                target="_blank">
                                Learn More
                            </a>
                        </FlexLayout>
                    }
                    open={false}
                    type="light"
                    popoverContainer="body">
                    <div className="download_tooltip">
                        <TextStyles>Daily Budget</TextStyles>
                    </div>
                </ToolTip>
            ),
            sorter: {
                compare: (a: any, b: any) => a.daily_budget - b.daily_budget,
                multiple: 2,
            },
            dataIndex: 'daily_budget',
            key: 'daily_budget',
        },
        {
            title: (
                <ToolTip
                    position="left"
                    helpText={
                        <TextStyles>
                            The estimated total amount of money you've spent on
                            your campaign during its schedule running time.
                        </TextStyles>
                    }
                    open={false}
                    type="light">
                    <div className="download_tooltip">
                        <TextStyles>Spend</TextStyles>
                    </div>
                </ToolTip>
            ),
            sorter: {
                compare: (a: any, b: any) => a.spend - b.spend,
                multiple: 2,
            },
            dataIndex: 'spend',
            key: 'spend',
        },
        {
            title: (
                <ToolTip
                    position="left"
                    helpText={
                        <TextStyles>
                            Sum of order values we get though campaign's order
                            purchase event.
                        </TextStyles>
                    }
                    open={false}
                    type="light">
                    <div className="download_tooltip">
                        <TextStyles>Sales</TextStyles>
                    </div>
                </ToolTip>
            ),
            sorter: {
                compare: (a: any, b: any) => a.sales - b.sales,
                multiple: 2,
            },
            dataIndex: 'sales',
            key: 'sales',
        },

        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            fixed: 'right',
            width: 80,
            render: (_: any, index: any) => {
                return <DashboardAction action={index} />;
            },
        },
    ];
    return columns;
};

export default DI(Header);
