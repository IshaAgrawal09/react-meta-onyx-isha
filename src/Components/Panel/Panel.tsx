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
    const [message, setMessage] = useState('');
    const [call, setCall] = useState(false);

    const clientId = process.env.REACT_WEBSOCEKT_CLIENTID;
    const token = sessionStorage.getItem(_props.match.uId + '_auth_token');
    const userId = _props.match.uId;

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
        webSocketFunc();
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
        bodyLayout = <PanelLayout notificationMsg={message} />;
    }

    const webSocketFunc = () => {
        const socket = new WebSocket(
            'wss://a5zls8ce93.execute-api.us-east-2.amazonaws.com/beta'
        );
        socket.onopen = function (e) {
            console.log('connection established!', userId, clientId, token);

            socket.send(
                '{ "action": "identity","client_id":' +
                    clientId +
                    ',"customer_id":"' +
                    userId +
                    '","token":"' +
                    token +
                    '"}'
            );
        };
        socket.onmessage = function (message) {
            setMessage(message.data);
            console.log(message);
        };
    };
    console.log('Message: ', message);
    return <>{call ? bodyLayout : <Loader type="Loader1" {..._props} />}</>;
};

export default DI(Panel, {
    func: {
        syncNecessaryInfo,
        syncConnectorInfo,
    },
});
