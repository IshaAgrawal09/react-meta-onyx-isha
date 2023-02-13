import {
    BodyLayout,
    Button,
    FlexChild,
    FlexLayout,
    Modal,
    NewSidebar,
    Popover,
    TextStyles,
    Topbar,
} from '@cedcommerce/ounce-ui';
import React, { useState } from 'react';
import { Bell } from 'react-feather';
import { Route, Routes } from 'react-router-dom';

import Logo from '../../Asests/Images/svg/Logo';
import MobileLogo from '../../Asests/Images/svg/MobileLogo';
import { DI, DIProps } from '../../Core';
import Footer from '../Footer/Footer';
import Dashboard from './Dashboard';
import FirstCampaign from './Dashboard/FirstCampaign';
import Faq from './Faq';
import Help from './Help';
import { Menu, SubMenu } from './Menu';
import Product from './Product';
import Settings from './Settings';

const PanelLayout = (props: DIProps): JSX.Element => {
    const [redDotNotification, setRedDotNotification] = useState(true);
    const [openNotification, setOpenNotification] = useState(false);
    const [openModalLogout, setOpenModalLogout] = useState(false);

    const onChangeHandle = (e: any) => {
        console.log(e, 'onChange');
        if (e.path === 'logout') setOpenModalLogout(true);
        else if (e.path.includes('https:')) window.open(e.path);
        else {
            props.history(e.path);
        }
    };
    const getCurrentPath = (path: string) => {
        const newpAth = '/' + path.split('/')[1] + '/' + path.split('/')[3];
        console.log(newpAth);
        return path;
    };

    function panelRoutes() {
        return (
            <Routes>
                <Route path="setting" element={<Settings />} />
                <Route path="config" element={<Settings />} />
                <Route path="help" element={<Help />} />
                <Route path="faq" element={<Faq />} />
                <Route path="product" element={<Product />} />
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
                        <TextStyles>Notifications</TextStyles>
                    </Popover>
                }></Topbar>
            <div className="sidebar_width_logout">
                <NewSidebar
                    subMenu={SubMenu}
                    path={getCurrentPath(props.location.pathname)}
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
                    onClick: function noRefCheck() {},
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
