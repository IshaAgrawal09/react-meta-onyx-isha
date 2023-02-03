import React, { useContext, useEffect, useState } from 'react';
import { StoreDispatcher } from '../../index';
import { DI, DIProps } from '../../Core';
import Onboarding from './Onboarding/Onboarding';
import { syncNecessaryInfo, syncConnectorInfo } from '../../Actions';
import PanelLayout from './PanelLayout';
import { Loader } from '@cedcommerce/ounce-ui';

export interface PanelProps extends DIProps {
    name?: string;
    syncNecessaryInfo: () => void;
    syncConnectorInfo: (props: any, shop_url?: string | null) => void;
    syncProfileInfo: () => void;
    loginStatus: () => void;
    syncServices: () => void;
}
const Panel = (_props: PanelProps): JSX.Element => {
    const dispatcher = useContext(StoreDispatcher);
    const [showDashboard, setShowDashboard] = useState(false);
    const [call, setCall] = useState(false);

    useEffect(() => {
        dispatcher({
            type: 'user_id',
            state: {
                user_id: _props.match.uId,
            },
        });
        con();
    }, [_props.match.uId]);

    async function con() {
        const shop = _props.di.globalState.get(`shop`);
        await _props.syncConnectorInfo(_props, shop);
        await _props.syncNecessaryInfo();
        // webSocketInit({ ...props }, callback);
        // const webhookCall = sessionStorage.getItem('webhook_call');
        // sessionStorage.removeItem('webhook_call');
        // webhookCall === 'true' && props.di.POST('onyx/webhook/create', {});
        // setHasBeenCalled(true);
        setCall(true);
    }

    let bodyLayout = null;
    let onBoardingFlag = true;

    if (_props?.redux?.basic) {
        const steps: any = _props.redux.basic.stepActive;
        if (steps == 1) {
            onBoardingFlag = false;
        }
    }
    if (onBoardingFlag) {
        bodyLayout = <Onboarding />;
    } else {
        bodyLayout = <PanelLayout />;
    }

    return <>{call ? bodyLayout : <Loader type="Loader1" {..._props} />}</>;
};

export default DI(Panel, {
    func: {
        syncNecessaryInfo,
        syncConnectorInfo,
    },
});
