import React, { useContext, useEffect, useState } from 'react';
import './Panel.css';
import { StoreDispatcher } from '../../index';
import { DI, DIProps } from '../../Core';
import Onboarding from './Onboarding/Onboarding';
import { syncNecessaryInfo, syncConnectorInfo } from '../../Actions';
import PanelLayout from './PanelLayout';
import { Loader } from '@cedcommerce/ounce-ui';
import { urlFetchCalls } from '../../Constant';

export interface PanelProps extends DIProps {
    name?: string;
    syncNecessaryInfo: () => void;
    syncConnectorInfo: (props: any, shop_url?: string | null) => void;
    syncProfileInfo: () => void;
    loginStatus: () => void;
    syncServices: () => void;
}
const Panel = (_props: PanelProps): JSX.Element => {
    const {
        di: { GET },
    } = _props;
    const { get } = urlFetchCalls;
    const dispatcher = useContext(StoreDispatcher);

    const [message, setMessage] = useState<string>('');
    const [notfCount, setnotfCount] = useState<number>(0);
    const [notfData, setNotfData] = useState<any>();
    const [call, setCall] = useState<boolean>(false);

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

    useEffect(() => {
        if (message.length > 0) {
            const payload = {
                activePage: 2,
                count: 10,
            };
            GET(get.allNotification, payload).then((response: any) => {
                if (response.success) {
                    const { data } = response;
                    setNotfData(data.rows);
                    setnotfCount(data.count);
                }
            });
        }
    }, [message]);

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
        bodyLayout = (
            <PanelLayout
                notificationMsg={notfData}
                notificationCount={notfCount}
            />
        );
    }

    const webSocketFunc = () => {
        const socket = new WebSocket(
            'wss://a5zls8ce93.execute-api.us-east-2.amazonaws.com/beta'
        );
        socket.onopen = function (e) {
            console.log('connection established!');

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
        };
    };

    return <>{call ? bodyLayout : <Loader type="Loader1" {..._props} />}</>;
};

export default DI(Panel, {
    func: {
        syncNecessaryInfo,
        syncConnectorInfo,
    },
});
