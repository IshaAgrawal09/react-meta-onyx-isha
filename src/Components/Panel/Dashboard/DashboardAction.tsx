import { Button, Popover, TextStyles } from '@cedcommerce/ounce-ui';
import React, { useState } from 'react';
import { MoreVertical } from 'react-feather';
interface ActionI {
    action: any;
}
const DashboardAction = (_props: ActionI) => {
    const { action } = _props;
    const [openActionModal, setOpenActionModal] = useState(false);

    const openAction = () => {
        setOpenActionModal(!openActionModal);
    };

    return (
        <Popover
            open={openActionModal}
            activator={
                action.status === 'Pending' ||
                action.status === 'Ended' ||
                action.status === 'Archived' ? (
                    <Button
                        length="fullBtn"
                        disable
                        icon={<MoreVertical />}
                        type="Plain"
                        iconRound
                        onClick={() => openAction()}></Button>
                ) : (
                    <Button
                        length="fullBtn"
                        icon={<MoreVertical />}
                        type="Plain"
                        iconRound
                        onClick={() => openAction()}></Button>
                )
            }>
            <TextStyles>Notifications</TextStyles>
        </Popover>
    );
};

export default DashboardAction;
