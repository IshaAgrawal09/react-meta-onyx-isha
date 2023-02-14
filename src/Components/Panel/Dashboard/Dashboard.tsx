import {
    AdvanceFilter,
    AutoComplete,
    Badge,
    Button,
    Card,
    CheckBox,
    FlexChild,
    FlexLayout,
    PageHeader,
    Pagination,
    Popover,
    TextStyles,
} from '@cedcommerce/ounce-ui';

import Table, { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { AlertTriangle, Download, Filter, Plus } from 'react-feather';
import { urlFetchCalls } from '../../../Constant';
import { DI, DIProps } from '../../../Core';
import { Facebook, Instagram } from '../Settings/svgs/Svgs';
import DashboardAction from './DashboardAction';
import { createUrl } from './Functions';
import { StaticGridData } from './StaticData';
import { DataTypeI } from './types';

interface ParamsInterface {
    shop_id: number;
    'filter[shop_id]': number;
    'filter[campaign_name]'?: string;
    activePage: number;
    count: number;
    order?: number | string;
    sort?: number;
}

// interface dashboardI extends DIProps {}

const Dashboard = (_props: DIProps) => {
    const {
        di: { globalState, GET, POST, environment },
        history,
    } = _props;

    let columns: ColumnsType<DataTypeI> = [
        {
            title: 'Campaign',
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
            title: 'Status',
            sorter: {
                compare: (a: any, b: any) => a.status.length - b.status.length,
            },
            dataIndex: 'status',
            width: 150,
            key: 'status',
            fixed: 'left',
            render: (event) => {
                return (
                    <>
                        {event === 'Error' ? (
                            <Button icon={<AlertTriangle />} type="DangerPlain">
                                Error
                            </Button>
                        ) : (
                            <Badge
                                type={
                                    event === 'Paused'
                                        ? 'Warning-200'
                                        : event === 'Pending'
                                        ? 'Neutral-100-Border'
                                        : event === 'Scheduled'
                                        ? 'Positive-100'
                                        : event === 'Active'
                                        ? 'Positive-200'
                                        : event === 'Archived'
                                        ? 'Info-100'
                                        : event === 'Disconnected'
                                        ? 'Neutral-100'
                                        : 'Neutral-200'
                                }>
                                {event}
                            </Badge>
                        )}
                    </>
                );
            },
        },
        {
            title: 'Placement',
            dataIndex: 'campaign_placement',
            width: 110,
            key: 'campaign_placement',
            render: (platform) => {
                if (
                    platform.length === 2 &&
                    platform.includes('facebook') &&
                    platform.includes('instagram')
                ) {
                    return (
                        <>
                            <span className="icon-overlapping_icon">
                                <Facebook />
                            </span>{' '}
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
            title: 'Start Date',
            sorter: {
                compare: (a: any, b: any) => a.start_date - b.start_date,
                multiple: 2,
            },
            dataIndex: 'start_date',
            key: 'start_date',
        },
        {
            title: 'End Date',
            sorter: {
                compare: (a: any, b: any) => a.end_date - b.end_date,
                multiple: 3,
            },
            dataIndex: 'end_date',
            width: 150,
            key: 'end_date',
        },
        {
            title: 'Daily Budget',
            sorter: {
                compare: (a: any, b: any) => a.daily_budget - b.daily_budget,
                multiple: 2,
            },
            dataIndex: 'daily_budget',
            key: 'daily_budget',
        },
        {
            title: 'Spend',
            sorter: {
                compare: (a: any, b: any) => a.spend - b.spend,
                multiple: 2,
            },
            dataIndex: 'spend',
            key: 'spend',
        },
        {
            title: 'Sales',
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
            render: (_, index) => {
                return <DashboardAction action={index} />;
            },
        },
    ];

    const facebookShopId = _props.redux.current?.target?._id;

    let staticParams = {
        shop_id: facebookShopId,
        'filter[shop_id]': facebookShopId,
        activePage: 1,
        count: 5,
    };

    const localParams: any = _props.di.globalState.get('campaign_params');
    const { get, post } = urlFetchCalls;

    const [gridColumn, setGridColumn] = useState(columns);

    const [openActionModal, setOpenActionModal] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState<String[]>([]);
    const [enableApplyFilter, setEnableApplyFilter] = useState(false);
    const [resetFilter, setResetFilter] = useState(false);
    const [prevFilter, setPrevFilter] = useState<String[]>([]);

    const [manageColumns, setManageColumns] = useState(false);
    const [addManageColumns, setAddManageColumns] = useState<String[]>([]);

    const [params, setParams] = useState<ParamsInterface>(staticParams);

    if (localParams != null) {
        staticParams = JSON.parse(localParams);
    }

    const endPoint: string = `${environment.API_ENDPOINT}${
        get.bulkExportCSV
    }?shop_id=${facebookShopId}&bearer=${globalState.getBearerToken()}`;

    const downloadCsvUrl = createUrl(endPoint, params);

    const openAction = (index: object) => {
        setOpenActionModal(!openActionModal);
    };

    const statusFiltersAvailable = [
        'Archived',
        'Active',
        'Disconnected',
        'Ended',
        'Error',
        'Paused',
        'Pending',
        'Scheduled',
    ];

    // FILTER FUNCTION
    const checkedFilterFunc = (filterVal: string) => {
        let filterData = [...selectedFilter];

        if (filterData.length === 0) {
            filterData.push(filterVal);
        } else {
            if (filterData?.includes(filterVal)) {
                let update = filterData.filter((item) => {
                    return item != filterVal;
                });
                filterData = [...update];
            } else {
                filterData.push(filterVal);
            }
        }

        let difference = filterData.filter(
            (item) => !prevFilter.includes(item)
        );

        if (prevFilter.length !== filterData.length && difference.length === 0)
            setEnableApplyFilter(true);
        else if (difference.length) setEnableApplyFilter(true);
        else setEnableApplyFilter(false);

        if (filterData.length !== 0) setResetFilter(true);
        else setResetFilter(false);

        setSelectedFilter([...filterData]);
    };

    const applyFilter = () => {
        setPrevFilter([...selectedFilter]);
        setEnableApplyFilter(false);
    };

    const resetFilterFunc = () => {
        setSelectedFilter([]);
        setResetFilter(false);
        setEnableApplyFilter(true);
    };

    const filterClosedFunc = () => {
        if (prevFilter.length === selectedFilter.length)
            setEnableApplyFilter(false);
        else {
            setEnableApplyFilter(true);
        }
    };

    const extraColumns = ['Impressions', 'Clicks', 'Orders', 'ROAS'];

    const handleManageColumns = (val: string) => {
        let tempColumns = [...addManageColumns];
        let temp = [...gridColumn];
        temp.pop();
        if (tempColumns.length === 0) {
            tempColumns.push(val);
            temp.push({
                title: val,
                sorter: {
                    compare: (a: any, b: any) => a.val - b.val,
                    multiple: 2,
                },
                dataIndex: val.toLowerCase(),
                key: val.toLowerCase(),
            });
        } else {
            if (tempColumns.includes(val)) {
                let update = tempColumns.filter((item) => {
                    return item !== val;
                });

                tempColumns = [...update];
                let removeHeader = temp.filter((item: any) => {
                    return item.dataIndex !== val.toLowerCase();
                });
                temp = [...removeHeader];
            } else {
                tempColumns.push(val);
                temp.push({
                    title: val,
                    sorter: {
                        compare: (a: any, b: any) =>
                            a.val?.toLowerCase() - b.val?.toLowerCase(),
                        multiple: 2,
                    },
                    dataIndex: val.toLowerCase(),
                    key: val.toLowerCase(),
                });
            }
        }
        temp.push({
            title: 'Action',
            dataIndex: 'operation',
            key: 'operation',
            fixed: 'right',
            width: 80,
            render: (_, index) => {
                return <DashboardAction action={index} />;
            },
        });
        setAddManageColumns([...tempColumns]);
        setGridColumn([...temp]);
    };

    const data: DataTypeI[] = StaticGridData;
    return (
        <>
            <PageHeader
                title="Welcome to Social Ads for Buy with Prime!"
                action={
                    <FlexLayout spacing="loose" wrap="noWrap">
                        <Button
                            onClick={function noRefCheck() {}}
                            type="Primary"
                            icon={<Plus color="#fff" size={16} />}
                            iconRound={false}>
                            Create Campaign
                        </Button>
                    </FlexLayout>
                }
                description="Create and manage all your Buy with Prime Facebook and Instagram campaigns here."
            />
            <Card>
                <FlexLayout halign="fill" valign="center">
                    <TextStyles
                        fontweight="extraBold"
                        content="Campaigns"
                        subheadingTypes="SM-1.8"
                        type="SubHeading"></TextStyles>
                    <Button
                        type="Outlined"
                        icon={<Download />}
                        onClick={() => window.open(downloadCsvUrl)}>
                        Download Report
                    </Button>
                </FlexLayout>
                <hr />
                <FlexLayout halign="fill" valign="center">
                    <FlexChild
                        desktopWidth="50"
                        mobileWidth="100"
                        tabWidth="50">
                        <AutoComplete
                            clearButton
                            clearFunction={function noRefCheck() {}}
                            extraClass=""
                            onChange={function noRefCheck() {}}
                            onClick={function noRefCheck() {}}
                            onEnter={function noRefCheck() {}}
                            options={[
                                {
                                    label: 'Sloane',
                                    value: 'Sloane',
                                },
                            ]}
                            placeHolder="Search Campaigns"
                            popoverPosition="left"
                            setHiglighted
                            thickness="thick"
                            value=""
                        />
                    </FlexChild>
                    <FlexChild
                        desktopWidth="50"
                        mobileWidth="100"
                        tabWidth="50">
                        <FlexLayout
                            halign="end"
                            valign="center"
                            spacing="loose">
                            <AdvanceFilter
                                button="Filter"
                                icon={<Filter color="#2a2a2a" size={16} />}
                                disableApply={!enableApplyFilter}
                                filters={[
                                    {
                                        children: (
                                            <FlexLayout
                                                direction="vertical"
                                                spacing="loose">
                                                {statusFiltersAvailable.map(
                                                    (
                                                        item: string,
                                                        index: number
                                                    ) => {
                                                        return (
                                                            <CheckBox
                                                                labelVal={item}
                                                                key={index}
                                                                checked={selectedFilter.includes(
                                                                    item
                                                                )}
                                                                onClick={() =>
                                                                    checkedFilterFunc(
                                                                        item
                                                                    )
                                                                }
                                                            />
                                                        );
                                                    }
                                                )}
                                            </FlexLayout>
                                        ),
                                        name: 'Status',
                                    },
                                ]}
                                heading="Filters"
                                resetFilter={() => resetFilterFunc()}
                                disableReset={!resetFilter}
                                onApply={applyFilter}
                                onClose={() => filterClosedFunc()}
                                type="Outlined"
                            />
                            <Popover
                                open={manageColumns}
                                onClose={() => setManageColumns(false)}
                                activator={
                                    <Button
                                        type="Outlined"
                                        icon={<Plus />}
                                        onClick={() =>
                                            setManageColumns(!manageColumns)
                                        }>
                                        Manage Columns
                                    </Button>
                                }
                                popoverContainer="body"
                                popoverWidth={200}>
                                <FlexLayout
                                    spacing="loose"
                                    direction="vertical">
                                    {extraColumns.map((item, index) => {
                                        return (
                                            <CheckBox
                                                labelVal={item}
                                                key={index}
                                                checked={addManageColumns.includes(
                                                    item
                                                )}
                                                onClick={() =>
                                                    handleManageColumns(item)
                                                }
                                            />
                                        );
                                    })}
                                </FlexLayout>
                            </Popover>
                        </FlexLayout>
                    </FlexChild>
                </FlexLayout>
                <div className="mt-30">
                    <Table
                        pagination={false}
                        columns={gridColumn}
                        dataSource={data}
                        scroll={{ x: 1100 }}
                    />
                    <div className="mt-20">
                        <Pagination
                            countPerPage="10"
                            currentPage={1}
                            onCountChange={function noRefCheck() {}}
                            onEnter={function noRefCheck() {}}
                            onNext={function noRefCheck() {}}
                            onPrevious={function noRefCheck() {}}
                            optionPerPage={[
                                {
                                    label: '10',
                                    value: '10',
                                },
                            ]}
                            totalPages={20}
                            totalitem={200}
                        />
                    </div>
                </div>
            </Card>
        </>
    );
};

export default DI(Dashboard);
