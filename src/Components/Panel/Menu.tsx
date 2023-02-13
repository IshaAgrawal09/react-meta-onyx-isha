import {
    Home,
    Settings,
    LifeBuoy,
    HelpCircle,
    Box,
    LogOut,
} from 'react-feather';
import React from 'react';

export const Menu: MenuObj[] | any = [
    {
        url: '/overview',
        content: 'Dashboard',
        path: 'dashboard',
        heading: 'Dashboard',
        icon: <Home size="20" color="#3B424F" />,
        showTargetSelect: true,
        showPage: true,
        page_description:
            'You can find a quick update on all of your crucial operations and activities here including your Product(s) and Order(s) updates.',
    },
    {
        url: '/product',
        content: 'Product List',
        path: 'product',
        hidden: false,
        showPage: true,
        icon: <Box size={20} color="#3B424F" />,
        showTargetSelect: true,
        heading: 'Product Listing',
        page_description:
            'Find the list of Shopify Product(s) here that are enabled for `Amazon by CedCommerce’. You can use Match from Amazon to sync your existing Listing with the same SKU(s) or can select and upload New product(s) on Amazon',
    },
    {
        url: '/config',
        content: 'Settings',
        showPage: true,
        showTargetSelect: true,
        icon: <Settings size="20" color="#3B424F" />,
        path: 'config',
        heading: 'Settings',
        page_description:
            'Add or update your Amazon account connectivity within the App. Manage Product Templates or apply Order Synchronization settings.',
    },
    {
        url: '/help',
        content: 'Help',
        showPage: true,
        showTargetSelect: true,
        icon: <LifeBuoy size="20" color="#3B424F" />,
        path: 'help',
        heading: 'Settings',
        page_description:
            'Add or update your Amazon account connectivity within the App. Manage Product Templates or apply Order Synchronization settings.',
    },
    {
        url: '/faq',
        content: 'FAQ',
        showPage: true,
        path: 'faq',
        icon: <HelpCircle size="20" color="#3B424F" />,
        heading: 'FAQ & Troubleshoot',
        page_description: 'Find solutions to all your Queries',
    },
    {
        url: '/logout',
        content: 'Logout',
        showPage: true,
        path: 'logout',
        icon: <LogOut size="20" color="#3B424F" />,
        heading: 'Logout',
        page_description: 'User will logout',
        extraClass: 'custom_logout',
    },
];

export const SubMenu: MenuObj[] | any = [];

export interface MenuObj {
    url: string;
    content: string;
    path: string;
    heading: string;
    hidden?: boolean;
    page_description?: string;
    breadcrum?: string | -1 | boolean;
    showTargetSelect?: boolean;
    showPage?: boolean;
}
