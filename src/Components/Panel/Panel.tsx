import React, { Suspense, useContext, useEffect } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { StoreDispatcher } from '../../index';
import { DI, DIProps } from '../../Core';
import Onboarding from './Onboarding/Onboarding';
import { syncNecessaryInfo, syncConnectorInfo } from '../../Actions';

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
        _props.syncConnectorInfo(_props, shop);
        _props.syncNecessaryInfo();
        // webSocketInit({ ...props }, callback);
        // const webhookCall = sessionStorage.getItem('webhook_call');
        // sessionStorage.removeItem('webhook_call');
        // webhookCall === 'true' && props.di.POST('onyx/webhook/create', {});
        // setHasBeenCalled(true);
    }
    return (
        <Routes>
            <Route
                path="/dashboard"
                element={
                    <Suspense fallback={<></>}>
                        <Onboarding />
                    </Suspense>
                }>
                <Route path="*" element={<>NO Page Found 2</>} />
            </Route>
        </Routes>
    );
};

export default DI(Panel, {
    func: {
        syncNecessaryInfo,
        syncConnectorInfo,
    },
});
