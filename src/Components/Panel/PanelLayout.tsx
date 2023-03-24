import {
    BodyLayout,
    Button,
    Modal,
    NewSidebar,
    Notification,
    Popover,
    Skeleton,
    TextStyles,
    Topbar,
} from '@cedcommerce/ounce-ui';
import React, { useContext, useEffect, useState } from 'react';
import { ArrowRight, Bell } from 'react-feather';
import { Route, Routes, useParams } from 'react-router-dom';
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
import NotificationComp from './NotificationComp';

import Product from './ProductListing';
import Settings from './Settings';
interface panelLayoutI extends DIProps {
    notificationMsg: any;
    notificationCount: number;
}

const PanelLayout = (_props: panelLayoutI): JSX.Element => {
    const { notificationMsg, notificationCount, history } = _props;
    const match = useParams();

    const [redDotNotification, setRedDotNotification] =
        useState<boolean>(false);
    const [openNotification, setOpenNotification] = useState<boolean>(false);
    const [openModalLogout, setOpenModalLogout] = useState<boolean>(false);

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

    const timezone = (time: string) => {
        const today = new Date().getTime();
        const given = new Date(time);
        const prevTime = given.getTime();
        const timeGap = today - prevTime;
        const seconds = timeGap / 1000;
        const minutes = seconds / 60;
        const hours = minutes / 60;
        const day = hours / 24;
        const month = day / 30;
        const year = month / 12;
        const finalDate = given.toLocaleDateString('en-us');

        if (Math.floor(year) > 0) return finalDate;
        else if (Math.floor(month) > 0) return finalDate;
        else if (Math.floor(day) > 0) return finalDate;
        else if (Math.floor(hours) > 0) return `${Math.floor(hours)} hours ago`;
        else if (Math.floor(minutes) > 0)
            return `${Math.floor(minutes)} mins ago`;
        else if (Math.floor(seconds) > 0)
            return `${Math.floor(seconds)} secs ago`;
        else return finalDate;
    };

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
                <Route
                    path="notification"
                    element={
                        <NotificationComp
                            count={notificationCount}
                            notificationMsg={notificationMsg}
                            timezone={timezone}
                        />
                    }
                />
            </Routes>
        );
    }
    return (
        <>
            <Topbar
                connectRight={
                    <Popover
                        popoverWidth={350}
                        popoverContainer="element"
                        open={openNotification}
                        onClose={() => setOpenNotification(!openNotification)}
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
                        {notificationCount === 0 ? (
                            <Skeleton
                                height="20px"
                                line={4}
                                type="line"
                                width="50px"
                            />
                        ) : (
                            <div>
                                {notificationMsg?.map(
                                    (item: any, index: number) => {
                                        if (index < 3) {
                                            return (
                                                <Notification
                                                    key={index}
                                                    type={item.severity}
                                                    desciption={timezone(
                                                        item.created_at
                                                    )}
                                                    destroy={false}>
                                                    <TextStyles
                                                        utility="line-clamp-singleRow"
                                                        key={'Text' + index}>
                                                        {item.message}
                                                    </TextStyles>
                                                </Notification>
                                            );
                                        }
                                    }
                                )}
                                <hr />
                                <Button
                                    type="Plain"
                                    icon={<ArrowRight size={20} />}
                                    iconAlign="left"
                                    onClick={() => {
                                        setOpenNotification(!openNotification);
                                        history(
                                            `/panel/${match.uId}/notification`
                                        );
                                    }}>
                                    View All Notifications
                                </Button>
                            </div>
                        )}
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
