import {
    Button,
    FlexLayout,
    Modal,
    Popover,
    TextStyles,
    Toast,
    ToastWrapper,
} from '@cedcommerce/ounce-ui';
import './dashboardStyle.css';
import React, { useState } from 'react';
import { MoreVertical } from 'react-feather';

import { DI, DIProps } from '../../../Core';
import { urlFetchCalls } from '../../../Constant';
import { Facebook, Instagram } from '../Settings/svgs/Svgs';
import { getPlacement } from './Functions';
interface ActionI extends DIProps {
    action: any;
}

const DashboardAction = (_props: ActionI) => {
    const {
        action,
        di: { PUT, DELETE },
    } = _props;
    const { put, delete: del } = urlFetchCalls;
    const [openActionModal, setOpenActionModal] = useState(false);

    const openAction = () => {
        setOpenActionModal(!openActionModal);
    };

    const [openModal, setOpenModal] = useState(false);
    const [type, setType] = useState<string>('');

    const ModalFunc = (type: string) => {
        setType(type);
        setOpenModal(true);
    };
    const params = {
        id: action.campaign_id,
        shop_id: action.shop_id,
    };

    const getActionCall = (type: string) => {
        console.log(params);
        if (type === 'Archive') {
            DELETE(del.archiveCampaignUrl, params).then((response) => {
                const { success, message } = response;
                if (!success) {
                    _props.error(message);
                } else {
                    _props.success(message);
                    // getCampaigns(get.getCampaignsUrl);
                }
            });
        } else {
            let url;
            if (type === 'Pause') url = put.pauseCampaignUrl;
            else url = put.activeCampaignUrl;

            PUT(url, params).then((result) => {
                const { success, message } = result;
                if (!success) {
                    _props.error(message);
                } else {
                    _props.success(message);
                    // getCampaigns(get.getCampaignsUrl);
                }
            });
        }
        setOpenModal(false);
    };

    return (
        <>
            <Popover
                open={openActionModal}
                onClose={() => setOpenActionModal(!openActionModal)}
                activator={
                    <Button
                        length="fullBtn"
                        disable={
                            action.status[0] === 'Disconnected' ||
                            action.status[0] === 'Archived'
                        }
                        icon={<MoreVertical />}
                        type="Plain"
                        iconRound
                        onClick={() => openAction()}></Button>
                }>
                <FlexLayout direction="vertical">
                    <Button type="Plain">Edit</Button>
                    <Button type="Plain" onClick={() => ModalFunc('Archive')}>
                        Archive
                    </Button>
                    {action.status[0] === 'Paused' ? (
                        <Button
                            type="Plain"
                            onClick={() => ModalFunc('Unpause')}>
                            Unpause
                        </Button>
                    ) : action.status[0] === 'Scheduled' ||
                      action.status[0] === 'Active' ? (
                        <Button type="Plain" onClick={() => ModalFunc('Pause')}>
                            Pause
                        </Button>
                    ) : null}
                </FlexLayout>
            </Popover>

            <Modal
                open={openModal}
                close={() => setOpenModal(!openModal)}
                heading={`${type} campaign`}
                modalSize="medium"
                primaryAction={{
                    content: `${type}`,
                    loading: false,
                    onClick: () => getActionCall(type),
                }}
                secondaryAction={{
                    content: 'Cancel',
                    loading: false,
                    onClick: () => setOpenModal(!openModal),
                }}>
                <TextStyles
                    type="simpleText"
                    content={
                        type === 'Pause'
                            ? 'Do you want to pause this campaign? Pausing this will stop Ads from appearing on Facebook and Instagram. Meanwhile, orders and sales values will continue to track for the duration of the attribution window.'
                            : ` Are you sure you want to ${type.toLowerCase()} this campaign?`
                    }></TextStyles>
                <hr />

                <FlexLayout halign="fill" valign="center">
                    <TextStyles fontweight="extraBold">
                        Plaid shirts to hikers
                    </TextStyles>
                    {action.campaign_placement?.length
                        ? getPlacement(action.campaign_placement)
                        : null}
                    <TextStyles>
                        Daily Budget: ${action.daily_budget}
                    </TextStyles>
                </FlexLayout>
                <hr />

                <TextStyles>
                    {type === 'Pause'
                        ? 'You can resume this campaign at any time by selecting “Unpause” in the action menu.'
                        : type === 'Archive'
                        ? 'NOTE: Campaigns automatically end as you archive any campaign. However, you can always view the performance of your campaign at any time later.'
                        : 'This action will resume the campaign on the platforms you have chosen with the selected budget.'}
                </TextStyles>
            </Modal>
        </>
    );
};

export default DI(DashboardAction);
