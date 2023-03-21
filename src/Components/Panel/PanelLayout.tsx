import {
    BodyLayout,
    Button,
    Modal,
    NewSidebar,
    Popover,
    TextStyles,
    Topbar,
} from '@cedcommerce/ounce-ui';
import React, { useContext, useEffect, useState } from 'react';
import { Bell } from 'react-feather';
import { Route, Routes } from 'react-router-dom';
import { StoreDispatcher } from '../../../src';
import Logo from '../../Asests/Images/svg/Logo';
import MobileLogo from '../../Asests/Images/svg/MobileLogo';
import { DI, DIProps } from '../../Core';
import Footer from '../Footer/Footer';
import CreateCampaign from './CreateCampaign';
import Dashboard from './Dashboard';
import Faq from './Faq';
import Help from './Help';
import { Menu, SubMenu } from './Menu';
import Product from './ProductListing';
import Settings from './Settings';
interface panelLayoutI extends DIProps {
    notificationMsg: string;
}

const PanelLayout = (_props: panelLayoutI): JSX.Element => {
    const { notificationMsg } = _props;
    const [notificationArr, setNotificationArr] = useState([]);
    const [redDotNotification, setRedDotNotification] = useState(false);
    const [openNotification, setOpenNotification] = useState(false);
    const [openModalLogout, setOpenModalLogout] = useState(false);

    const dispatcher = useContext(StoreDispatcher);

    const onChangeHandle = (e: any) => {
        if (e.path === 'logout') setOpenModalLogout(true);
        else _props.history(e.path);
    };
    const getCurrentPath = (path: string) => {
        const newpAth = '/' + path.split('/')[1] + '/' + path.split('/')[3];
        return path;
    };

    const logoutUser = () => {
        dispatcher({
            type: 'logout',
            state: {},
        });

        _props.history('/auth');
        _props.di.globalState.removeLocalStorage('showInstaBanner');
        _props.di.globalState.removeLocalStorage('showPaymentBanner');
        _props.di.globalState.removeLocalStorage('auth_token');
        setOpenModalLogout(false);
    };

    useEffect(() => {
        if (notificationMsg) setRedDotNotification(true);
    }, [notificationMsg]);

    function panelRoutes() {
        return (
            <Routes>
                <Route path="setting" element={<Settings />} />
                <Route path="config" element={<Settings />} />
                <Route path="help" element={<Help />} />
                <Route path="faq" element={<Faq />} />
                <Route path="product" element={<Product />} />
                <Route path="dashboard/create" element={<CreateCampaign />} />
                <Route path="camp/:CId/edit" element={<CreateCampaign />} />
                <Route path="dashboard" element={<Dashboard />} />
            </Routes>
        );
    }
    return (
        <>
            <Topbar
                connectRight={
                    <Popover
                        open={openNotification}
                        activator={
                            <>
                                {redDotNotification && (
                                    <span className="red-dot"></span>
                                )}
                                <Button
                                    type="Outlined"
                                    icon={<Bell size={16} color="#000" />}
                                    onClick={() => {
                                        setOpenNotification(!openNotification);
                                        setRedDotNotification(false);
                                    }}></Button>
                            </>
                        }>
                        <div className="mt-20">
                            <TextStyles>{notificationMsg}</TextStyles>
                        </div>
                    </Popover>
                }></Topbar>
            <div className="sidebar_width_logout">
                <NewSidebar
                    subMenu={SubMenu}
                    path={getCurrentPath(_props.location.pathname)}
                    menu={Menu}
                    onChange={(e: any) => onChangeHandle(e)}
                    logo={<Logo />}
                    mobileLogo={<MobileLogo />}
                />
            </div>
            <BodyLayout>
                <>
                    {panelRoutes()}
                    <Footer />
                </>
            </BodyLayout>
            <Modal
                open={openModalLogout}
                close={() => setOpenModalLogout(false)}
                heading="Logging Out"
                modalSize="small"
                primaryAction={{
                    content: 'Log Out',
                    loading: false,
                    onClick: () => logoutUser(),
                }}
                secondaryAction={{
                    content: 'Cancel',
                    loading: false,
                    onClick: () => setOpenModalLogout(false),
                }}>
                Are you sure you want to logout? You can always log back in
                later.
            </Modal>
        </>
    );
};

export default DI(PanelLayout);
// webSocketInit({ ...props }, callback);
// const webhookCall = sessionStorage.getItem('webhook_call');
// sessionStorage.removeItem('webhook_call');
// webhookCall === 'true' && props.di.POST('onyx/webhook/create', {});
// setHasBeenCalled(true);
