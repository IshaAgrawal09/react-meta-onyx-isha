import {
    AdvanceFilter,
    Badge,
    Button,
    Card,
    CheckBox,
    FlexChild,
    FlexLayout,
    Loader,
    Pagination,
    Popover,
    TextStyles,
    ToolTip,
} from '@cedcommerce/ounce-ui';

import Table, { ColumnsType } from 'antd/es/table';
import React, { useEffect, useRef, useState } from 'react';
import { AlertOctagon, AlertTriangle, Filter, Plus } from 'react-feather';
import { DataTypeI, gridData, showColumns } from './types';
import './dashboardStyle.css';
import { gridTooltip, urlFetchCalls } from '../../../Constant';
import { DI, DIProps } from '../../../Core';
import DashboardAction from './DashboardAction';
import { getPlacement } from './Functions';
import { ErrorModal, WarningModal } from './GridModal';
import { StaticGridData } from './StaticData';
import FirstCampaign from './FirstCampaign';
import DashboardHeader from './DashboardHeader';
import GridHeader from './GridHeader';
import GridAddOptions from './GridAddOptions';

export interface gridParamsI {
    shop_id: number;
    'filter[shop_id]': number;
    'filter[campaign_name]'?: string;
    'filter[campaign_id]'?: number;
    activePage: number;
    count: number;
    order?: number | string;
    sort?: number;
}

const Dashboard = (_props: DIProps) => {
    const {
        di: { GET, POST },
    } = _props;

    const facebookShopId = _props.redux.current?.target?._id;
    const { get, post } = urlFetchCalls;

    let staticParams = {
        shop_id: facebookShopId,
        'filter[shop_id]': facebookShopId,
        activePage: 1,
        count: 5,
    };
    const [showColumns, setShowColumns] = useState<showColumns>({
        campaign_name: true,
        status: true,
        placement: true,
        start_date: true,
        end_date: true,
        daily_budget: true,
        spend: true,
        sales: true,
        impressions: false,
        clicks: false,
        orders: false,
        roas: false,
        action: true,
    });

    const [sorting, setSorting] = useState();
    const [gridColumn, setGridColumn] = useState<ColumnsType<DataTypeI>>([]);
    const [gridData, setGridData] = useState<any>(StaticGridData);
    const [gridLoading, setGridLoading] = useState<boolean>(false);
    const [params, setParams] = useState<gridParamsI>(staticParams);

    useEffect(() => {
        updateGridColumn(showColumns);
        if (
            _props.di.globalState.get('showPaymentBanner') == null ||
            _props.di.globalState.get('showInstaBanner') == null
        )
            initCampaign(get.initCampaignUrl);
        // getCampaignFunc(get.getCampaignsUrl, params);
    }, []);

    const getCampaignFunc = (url: string, params: any) => {
        setGridLoading(true);
        GET(url, { ...params })
            .then((result) => {
                const { success, data } = result;
                if (success) {
                    setGridData(data.rows);
                }
            })
            .finally(() => {
                setGridLoading(false);
            });
    };

    const updateGridColumn = (col: any) => {
        let tempArray: any = [];
        for (const item in col) {
            let row: gridData = {};
            if (item === 'action') {
                row['title'] = 'action';
            } else {
                row['title'] = (
                    <ToolTip
                        position="right"
                        helpText={<TextStyles>{gridTooltip[item]}</TextStyles>}
                        open={false}
                        type="light"
                        popoverContainer="body">
                        <div className="download_tooltip">
                            <TextStyles>{item}</TextStyles>
                        </div>
                    </ToolTip>
                );
            }
            (row['dataIndex'] = item), (row['key'] = item);

            // POSITION
            if (
                item === 'campaign_name' ||
                item === 'status' ||
                item === 'placement'
            ) {
                row['fixed'] = 'left';
                row['width'] = 140;
            } else if (item === 'action') {
                row['fixed'] = 'right';
            }

            if (item === 'status') {
                row['render'] = (_: any, event: any) => {
                    const { status } = event;
                    return (
                        <>
                            {status === 'ERROR' ? (
                                <div className="error-btn">
                                    <Button
                                        icon={<AlertTriangle />}
                                        type="DangerPlain"
                                        onClick={() => {
                                            openErrorModalFunc(event?.error);
                                        }}>
                                        Error
                                    </Button>
                                </div>
                            ) : event.hasOwnProperty('warning') ? (
                                <FlexLayout direction="vertical">
                                    <FlexChild>
                                        <Badge type="Positive-100">
                                            {status}
                                        </Badge>
                                    </FlexChild>
                                    <FlexChild>
                                        <div className="warning-btn">
                                            <Button
                                                icon={
                                                    <AlertOctagon color="#B28C35" />
                                                }
                                                type="Plain"
                                                onClick={() => {
                                                    openWarningModalFunc(
                                                        event.warning
                                                    );
                                                }}>
                                                Warning
                                            </Button>
                                        </div>
                                    </FlexChild>
                                </FlexLayout>
                            ) : (
                                <Badge
                                    type={
                                        status === 'PAUSED'
                                            ? 'Warning-200'
                                            : status === 'PENDING'
                                            ? 'Neutral-100-Border'
                                            : status === 'SCHEDULED'
                                            ? 'Positive-100'
                                            : status === 'ACTIVE'
                                            ? 'Positive-200'
                                            : status === 'ARCHIVED'
                                            ? 'Info-100'
                                            : status === 'DISCONNECTED'
                                            ? 'Neutral-100'
                                            : 'Neutral-200'
                                    }>
                                    {status.toLowerCase()}
                                </Badge>
                            )}
                        </>
                    );
                };
            }

            if (item === 'placement') {
                row['render'] = (_: any, event: any) => {
                    const { campaign_placement } = event;
                    return getPlacement(campaign_placement);
                };
            }
            if (item === 'action') {
                row['render'] = (_: any, action: any) => {
                    return <DashboardAction action={action} />;
                };
            }

            if (col[item]) {
                tempArray.push(row);
            }
        }
        setGridColumn(tempArray);
    };

    const [errorModal, setErrorModal] = useState(false);
    const [warningModal, setWarningModal] = useState(false);
    const [errorArray, setErrorArray] = useState([]);
    const [solutions, setSolutions] = useState<any>([]);
    const [loadingErrorModal, setLoadingErrorModal] = useState(false);

    const openWarningModalFunc = (error: any) => {
        setWarningModal(true);
        errorWarningModalFunc(error);
    };

    const openErrorModalFunc = (error: any) => {
        setErrorModal(true);
        errorWarningModalFunc(error);
    };

    const errorWarningModalFunc = (error: any) => {
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
                    setSolutions([...data]);
                }
            })
            .finally(() => setLoadingErrorModal(false));
    };

    const localParams: any = _props.di.globalState.get('campaign_params');

    const [selectedFilter, setSelectedFilter] = useState<String[]>([]);
    const [enableApplyFilter, setEnableApplyFilter] = useState(false);
    const [resetFilter, setResetFilter] = useState(false);
    const [prevFilter, setPrevFilter] = useState<String[]>([]);

    const [openManageColumns, setOpenManageColumns] = useState(false);
    const [addManageColumns, setAddManageColumns] = useState<String[]>([]);

    const [initLoading, setInitLoading] = useState(false);

    const initCampaignParams = {
        shop_id: facebookShopId,
    };

    const initCampaign = (url: string) => {
        setInitLoading(true);
        _props.di
            .GET(url, initCampaignParams)
            .then((result) => {
                const { success, data } = result;
                if (success) {
                    if (
                        data.payment_setup === false &&
                        _props.di.globalState.get('showPaymentBanner') == null
                    ) {
                        _props.di.globalState.set(
                            'showPaymentBanner',
                            JSON.stringify(true)
                        );
                    }
                    if (
                        data.is_instagram_connected === false &&
                        _props.di.globalState.get('showInstaBanner') == null
                    ) {
                        _props.di.globalState.set(
                            'showInstaBanner',
                            JSON.stringify(true)
                        );
                    }
                }
            })
            .finally(() => {
                setInitLoading(false);
            });
    };

    if (localParams != null) {
        staticParams = JSON.parse(localParams);
    }

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

    const extraColumns = ['impressions', 'clicks', 'orders', 'roas'];

    const handleManageColumns = (val: string) => {
        let extraCol = [...addManageColumns];
        let tempCol = { ...showColumns };
        if (extraCol.includes(val)) {
            tempCol[val] = false;
            let update = extraCol.filter((item) => {
                return item !== val;
            });

            extraCol = [...update];
        } else {
            tempCol[val] = true;
            extraCol.push(val);
        }
        setShowColumns({ ...tempCol });
        setAddManageColumns([...extraCol]);
        updateGridColumn(tempCol);
    };
    const timer = useRef<any>();

    const data: DataTypeI[] = gridData;
    return (
        <>
            <div>
                <DashboardHeader
                    initLoading={initLoading}
                    gridData={gridData}
                />
                {gridData?.length == 0 ? (
                    <FirstCampaign />
                ) : (
                    <Card>
                        <GridHeader />
                        <hr />
                        <FlexLayout halign="fill" valign="center">
                            <FlexChild
                                desktopWidth="50"
                                mobileWidth="100"
                                tabWidth="50">
                                <GridAddOptions
                                    setGridData={setGridData}
                                    getCampaignFunc={getCampaignFunc}
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
                                        icon={
                                            <Filter color="#2a2a2a" size={16} />
                                        }
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
                                                                        labelVal={
                                                                            item
                                                                        }
                                                                        key={
                                                                            index
                                                                        }
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
                                        open={openManageColumns}
                                        onClose={() =>
                                            setOpenManageColumns(false)
                                        }
                                        activator={
                                            <Button
                                                type="Outlined"
                                                icon={<Plus />}
                                                onClick={() =>
                                                    setOpenManageColumns(
                                                        !openManageColumns
                                                    )
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
                                                            handleManageColumns(
                                                                item
                                                            )
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
                            {gridLoading ? (
                                <Loader type="Loader1" />
                            ) : (
                                <>
                                    <Table
                                        showSorterTooltip={{ title: null }}
                                        pagination={false}
                                        columns={gridColumn ?? '0'}
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
                                </>
                            )}
                        </div>
                    </Card>
                )}

                <ErrorModal
                    solutions={solutions}
                    errorModal={errorModal}
                    setErrorModal={setErrorModal}
                    loadingErrorModal={loadingErrorModal}
                    errorArray={errorArray}
                />
                <WarningModal
                    solutions={solutions}
                    warningModal={warningModal}
                    setWarningModal={setWarningModal}
                    loadingErrorModal={loadingErrorModal}
                    errorArray={errorArray}
                />
            </div>
        </>
    );
};

export default DI(Dashboard);
