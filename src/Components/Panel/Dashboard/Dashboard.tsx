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
    Skeleton,
    TextStyles,
    ToolTip,
} from '@cedcommerce/ounce-ui';

import Table, { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import {
    AlertOctagon,
    AlertTriangle,
    Download,
    Filter,
    Plus,
} from 'react-feather';
import { gridTooltip, urlFetchCalls } from '../../../Constant';
import { DI, DIProps } from '../../../Core';
import { Facebook, Instagram } from '../Settings/svgs/Svgs';
import DashboardAction from './DashboardAction';
import { createUrl, getPlacement } from './Functions';
import { StaticGridData } from './StaticData';
import { DataTypeI, ParamsInterface, gridData, showColumns } from './types';
import './dashboardStyle.css';
import DashboardBanner from './DashboardBanner';
import { ErrorModal, WarningModal } from './GridModal';

const Dashboard = (_props: DIProps) => {
    const {
        di: { globalState, GET, POST, environment },
        history,
    } = _props;

    const { get, post } = urlFetchCalls;
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

    useEffect(() => {
        updateGridColumn(showColumns);
    }, []);

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
                            {status[0] === 'Error' ? (
                                <div className="error-btn">
                                    <Button
                                        icon={<AlertTriangle />}
                                        type="DangerPlain"
                                        onClick={() => {
                                            openErrorModalFunc(status[1]);
                                        }}>
                                        Error
                                    </Button>
                                </div>
                            ) : status[1] === 'warning' ? (
                                <FlexLayout direction="vertical">
                                    <FlexChild>
                                        <Badge type="Positive-100">
                                            {status[0]}
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
                                                        status[2]
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
                                        status[0] === 'Paused'
                                            ? 'Warning-200'
                                            : status[0] === 'Pending'
                                            ? 'Neutral-100-Border'
                                            : status[0] === 'Scheduled'
                                            ? 'Positive-100'
                                            : status[0] === 'Active'
                                            ? 'Positive-200'
                                            : status[0] === 'Archived'
                                            ? 'Info-100'
                                            : status[0] === 'Disconnected'
                                            ? 'Neutral-100'
                                            : 'Neutral-200'
                                    }>
                                    {status[0]}
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
        openModalFunc(error);
    };

    const openErrorModalFunc = (error: any) => {
        setErrorModal(true);
        openModalFunc(error);
    };

    const openModalFunc = (error: any) => {
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

    const facebookShopId = _props.redux.current?.target?._id;

    let staticParams = {
        shop_id: facebookShopId,
        'filter[shop_id]': facebookShopId,
        activePage: 1,
        count: 5,
    };

    const localParams: any = _props.di.globalState.get('campaign_params');

    const [selectedFilter, setSelectedFilter] = useState<String[]>([]);
    const [enableApplyFilter, setEnableApplyFilter] = useState(false);
    const [resetFilter, setResetFilter] = useState(false);
    const [prevFilter, setPrevFilter] = useState<String[]>([]);

    const [openManageColumns, setOpenManageColumns] = useState(false);
    const [addManageColumns, setAddManageColumns] = useState<String[]>([]);

    const [downloadCSVparams, setdDownloadCSVParams] =
        useState<ParamsInterface>(staticParams);
    const [initLoading, setInitLoading] = useState(false);

    useEffect(() => {
        if (
            _props.di.globalState.get('showPaymentBanner') == null ||
            _props.di.globalState.get('showInstaBanner') == null
        )
            initCampaign(get.initCampaignUrl);
    }, []);

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
                    if (data.payment_setup === false) {
                        if (
                            _props.di.globalState.get('showPaymentBanner') ==
                            null
                        ) {
                            _props.di.globalState.set(
                                'showPaymentBanner',
                                JSON.stringify(true)
                            );
                        }
                    }
                    if (data.is_instagram_connected === false) {
                        if (
                            _props.di.globalState.get('showInstaBanner') == null
                        ) {
                            _props.di.globalState.set(
                                'showInstaBanner',
                                JSON.stringify(true)
                            );
                        }
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

    const endPoint: string = `${environment.API_ENDPOINT}${
        get.bulkExportCSV
    }?shop_id=${facebookShopId}&bearer=${globalState.getBearerToken()}`;

    const downloadCsvUrl = createUrl(endPoint, downloadCSVparams);

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

            {/* PAYMENT & INSTAGRAM BANNER  */}
            {initLoading ? (
                <Skeleton height="50px" line={3} type="line" width="50px" />
            ) : _props.di.globalState.get('showPaymentBanner') == 'true' ||
              _props.di.globalState.get('showInstaBanner') == 'true' ? (
                <DashboardBanner />
            ) : null}

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
                            <div className="download_tooltip-btn">
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
                                open={openManageColumns}
                                onClose={() => setOpenManageColumns(false)}
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
                </div>
            </Card>
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
        </>
    );
};

export default DI(Dashboard);
