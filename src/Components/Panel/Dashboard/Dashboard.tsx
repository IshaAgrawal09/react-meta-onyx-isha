import {
    Accordion,
    AdvanceFilter,
    AutoComplete,
    Badge,
    Button,
    Card,
    CheckBox,
    FlexChild,
    FlexLayout,
    Modal,
    PageHeader,
    Pagination,
    Popover,
    Skeleton,
    TextStyles,
    ToolTip,
} from '@cedcommerce/ounce-ui';

import Table, { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { AlertTriangle, Download, Filter, Plus } from 'react-feather';
import { urlFetchCalls } from '../../../Constant';
import { DI, DIProps } from '../../../Core';
import { Facebook, Instagram } from '../Settings/svgs/Svgs';
import DashboardAction from './DashboardAction';
import { createUrl } from './Functions';
import { StaticGridData } from './StaticData';
import { DataTypeI } from './types';
import './dashboardStyle.css';
import DashboardBanner from './DashboardBanner';

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

    const { get, post } = urlFetchCalls;

    const [errorModal, setErrorModal] = useState(false);
    const [errorArray, setErrorArray] = useState([]);
    const [solutions, setSolutions] = useState<any>([{}]);
    const [loadingErrorModal, setLoadingErrorModal] = useState(false);

    const openErrorModalFunc = (error: any) => {
        setErrorModal(true);
        setErrorArray(error);
        const errorPayload = error.map((item: any) => ({
            title: item.title,
            marketplace: 'meta',
        }));
        setLoadingErrorModal(true);
        POST(post.solutionsUrl, errorPayload)
            .then((result: any) => {
                const { success, data } = result;
                if (success) {
                    setSolutions([...solutions, data]);
                }
            })
            .finally(() => setLoadingErrorModal(false));
    };

    let columns: ColumnsType<DataTypeI> = [
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
            render: (event) => {
                return (
                    <>
                        {event[0] === 'Error' ? (
                            <Button
                                icon={<AlertTriangle />}
                                type="DangerPlain"
                                onClick={() => {
                                    openErrorModalFunc(event[1]);
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

    const [gridColumn, setGridColumn] = useState(columns);

    const [openActionModal, setOpenActionModal] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState<String[]>([]);
    const [enableApplyFilter, setEnableApplyFilter] = useState(false);
    const [resetFilter, setResetFilter] = useState(false);
    const [prevFilter, setPrevFilter] = useState<String[]>([]);

    const [manageColumns, setManageColumns] = useState(false);
    const [addManageColumns, setAddManageColumns] = useState<String[]>([]);

    const [params, setParams] = useState<ParamsInterface>(staticParams);
    const [initLoading, setInitLoading] = useState(false);
    const [paymentBanner, setPaymentBanner] = useState(false);
    const [instaBanner, setInstaBanner] = useState(false);

    useEffect(() => {
        if (
            _props.di.globalState.get('showPaymentBanner') == undefined ||
            _props.di.globalState.get('showInstaBanner') == undefined
        )
            initCampaign(get.initCampaignUrl);
    }, []);

    const initCampaignParams = {
        shop_id: facebookShopId,
    };

    const initCampaign = (url: string) => {
        setInitLoading(true);
        _props.di.GET(url, initCampaignParams).then((result) => {
            const { success, data, error } = result;
            if (success) {
                if (data.is_instagram_connected === false) {
                    setInstaBanner(true);
                    if (
                        _props.di.globalState.get('showInstaBanner') ==
                        undefined
                    ) {
                        _props.di.globalState.set(
                            'showInstaBanner',
                            JSON.stringify(true)
                        );
                    }
                }
                if (data.payment_setup === false) {
                    setPaymentBanner(true);
                    if (
                        _props.di.globalState.get('showPaymentBanner') ==
                        undefined
                    ) {
                        _props.di.globalState.set(
                            'showPaymentBanner',
                            JSON.stringify(true)
                        );
                    }
                }
            }
        });
    };

    if (localParams != null) {
        staticParams = JSON.parse(localParams);
    }

    const endPoint: string = `${environment.API_ENDPOINT}${
        get.bulkExportCSV
    }?shop_id=${facebookShopId}&bearer=${globalState.getBearerToken()}`;

    const downloadCsvUrl = createUrl(endPoint, params);

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
            {(paymentBanner || instaBanner) && (
                <DashboardBanner
                    paymentBanner={paymentBanner}
                    instaBanner={instaBanner}
                />
            )}
            <Card>
                <FlexLayout halign="fill" valign="center">
                    <ToolTip
                        popoverContainer="element"
                        open={false}
                        position="right"
                        helpText={
                            <div className="custom-tooltip--msg">
                                <TextStyles
                                    alignment="left"
                                    fontweight="normal"
                                    paragraphTypes="SM-1.3"
                                    subheadingTypes="XS-1.6"
                                    textcolor="light"
                                    type="Paragraph"
                                    utility="none">
                                    Campaign Reports are auto synced every hour.
                                </TextStyles>
                            </div>
                        }
                        type="light">
                        <div style={{ borderBottom: '1px dashed black' }}>
                            <TextStyles
                                fontweight="extraBold"
                                subheadingTypes="SM-1.8"
                                type="SubHeading">
                                Campaigns
                            </TextStyles>
                        </div>
                    </ToolTip>
                    <div className="table-head-tootip">
                        <ToolTip
                            position="left"
                            popoverContainer="element"
                            extraClass="download_csv"
                            open={false}
                            helpText={
                                <div className="custom-tooltip--msg">
                                    <TextStyles>
                                        If you want to download reports for
                                        specific campaigns, make sure you apply
                                        the required filters, then click on
                                        download report. Else, for a general
                                        report of all the campaigns. First,
                                        ensure no filters are selected before
                                        you download the report.
                                    </TextStyles>
                                </div>
                            }
                            type="light">
                            <div className="download_tooltip">
                                <Button
                                    type="Outlined"
                                    icon={<Download />}
                                    onClick={() => window.open(downloadCsvUrl)}>
                                    Download Report
                                </Button>
                            </div>
                        </ToolTip>
                    </div>
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
                        showSorterTooltip={{ title: null }}
                        pagination={false}
                        columns={gridColumn}
                        dataSource={data}
                        scroll={{ x: 1300 }}
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
            <Modal
                open={errorModal}
                close={() => setErrorModal(!errorModal)}
                heading="Errors"
                modalSize="small">
                {loadingErrorModal ? (
                    <Skeleton height="50px" line={3} type="line" width="50px" />
                ) : (
                    errorArray?.map((item: any, index: number) => {
                        return (
                            <FlexLayout
                                spacing="loose"
                                valign="start"
                                wrap="noWrap"
                                key={index}>
                                <AlertTriangle
                                    color="#C4281C"
                                    size="20"
                                    style={{ display: 'block' }}
                                />
                                <FlexChild desktopWidth="100">
                                    <FlexLayout direction="vertical">
                                        <TextStyles
                                            alignment="left"
                                            fontweight="extraBold"
                                            textcolor="dark"
                                            type="neutralText"
                                            utility="none">
                                            {item?.title}
                                        </TextStyles>
                                        <TextStyles
                                            alignment="left"
                                            fontweight="normal"
                                            textcolor="dark"
                                            type="none"
                                            utility="custom-heading_camp1">
                                            {item?.description}
                                        </TextStyles>
                                    </FlexLayout>
                                </FlexChild>
                            </FlexLayout>
                        );
                    })
                )}
            </Modal>
        </>
    );
};

export default DI(Dashboard);
