import {
    Alert,
    Button,
    FlexChild,
    FlexLayout,
    TextStyles,
} from '@cedcommerce/ounce-ui';
import React from 'react';
import { CheckCircle } from 'react-feather';
import { campaignProductsI } from '../create';

const CampaignProducts = (_props: campaignProductsI) => {
    const { product_count } = _props;
    return (
        <>
            <FlexLayout spacing="loose" valign="start" wrap="noWrap">
                <CheckCircle
                    color="#027A48"
                    size="20"
                    style={{ display: 'block' }}
                />
                <FlexChild>
                    <>
                        <TextStyles
                            alignment="left"
                            fontweight="extraBold"
                            paragraphTypes="MD-1.4"
                            subheadingTypes="XS-1.6"
                            textcolor="dark"
                            type="SubHeading"
                            utility="none">
                            Buy with Prime-eligible Products
                        </TextStyles>
                        <div className="mt-10 mb-10">
                            <TextStyles textcolor="light">
                                Make sure your product catalog is synced with
                                the app so that Facebook can select the most
                                suitable products to advertise.
                                <Button
                                    type="TextButton"
                                    onClick={() => {
                                        window.open(
                                            `http://${window.location.host}/info/faq?query=How does the Catalog Sync process work?`
                                        );
                                    }}>
                                    Learn more about the Catalog Sync process.
                                </Button>
                            </TextStyles>
                        </div>
                        {product_count === 0 ? (
                            <Alert destroy={false} type="warning">
                                <TextStyles
                                    textcolor="dark"
                                    type="SubHeading"
                                    fontweight="bold"
                                    subheadingTypes="XS-1.6">
                                    Catalog is not synced
                                </TextStyles>
                                <TextStyles>
                                    You have synchronized 0 in-stock
                                    Prime-eligible products.
                                </TextStyles>
                            </Alert>
                        ) : (
                            <Alert destroy={false} type="info">
                                <TextStyles>
                                    {`You have synchronized ${product_count} in-stock Buy with
                                    Prime-eligible products.`}
                                </TextStyles>
                            </Alert>
                        )}
                    </>
                </FlexChild>
            </FlexLayout>
        </>
    );
};

export default CampaignProducts;
