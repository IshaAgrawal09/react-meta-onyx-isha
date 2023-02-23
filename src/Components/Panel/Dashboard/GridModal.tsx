import {
    Accordion,
    FlexChild,
    FlexLayout,
    Modal,
    Skeleton,
    TextStyles,
} from '@cedcommerce/ounce-ui';
import * as React from 'react';
import { AlertOctagon, AlertTriangle } from 'react-feather';
import { errorModalI, warningModalI } from './types';
export const ErrorModal = (_props: errorModalI) => {
    const {
        errorArray,
        errorModal,
        setErrorModal,
        loadingErrorModal,
        solutions,
    } = _props;

    const [openSolution, setOpenSolution] = React.useState<boolean[]>([]);

    React.useEffect(() => {
        const temp = Array(errorArray.length).fill(false);
        setOpenSolution([...temp]);
    }, [errorArray]);

    const openResolution = (i: number) => {
        const temp = openSolution.map((item: boolean, index: number) =>
            index === i ? !item : false
        );
        setOpenSolution([...temp]);
    };

    return (
        <>
            <Modal
                open={errorModal}
                close={() => setErrorModal(!errorModal)}
                heading="Errors"
                modalSize="small">
                {loadingErrorModal ? (
                    <Skeleton height="50px" line={2} type="line" width="50px" />
                ) : (
                    errorArray?.map((item: any, index: number) => {
                        return (
                            <div className="mb-20">
                                <FlexLayout
                                    spacing="loose"
                                    valign="start"
                                    wrap="noWrap"
                                    key={index}>
                                    <AlertTriangle
                                        color="#C4281C"
                                        size="20"
                                        style={{ display: 'block' }}
                                    />
                                    <FlexChild desktopWidth="100">
                                        <FlexLayout direction="vertical">
                                            <FlexChild>
                                                <>
                                                    <TextStyles
                                                        alignment="left"
                                                        fontweight="extraBold"
                                                        textcolor="dark"
                                                        type="neutralText"
                                                        utility="none">
                                                        {item?.title}
                                                    </TextStyles>
                                                    <TextStyles
                                                        alignment="left"
                                                        fontweight="normal"
                                                        textcolor="dark"
                                                        type="none"
                                                        utility="custom-heading_camp1">
                                                        {item?.description}
                                                    </TextStyles>
                                                </>
                                            </FlexChild>
                                            {solutions?.[index]
                                                ?.solution_exists ? (
                                                <FlexChild>
                                                    <div className="mt-10">
                                                        <Accordion
                                                            key={index}
                                                            boxed
                                                            active={
                                                                openSolution[
                                                                    index
                                                                ]
                                                            }
                                                            icon
                                                            iconAlign="right"
                                                            onClick={() =>
                                                                openResolution(
                                                                    index
                                                                )
                                                            }
                                                            title="Resolutions">
                                                            <TextStyles textcolor="light">
                                                                {
                                                                    solutions?.[
                                                                        index
                                                                    ]?.answer
                                                                }
                                                            </TextStyles>
                                                        </Accordion>
                                                    </div>
                                                </FlexChild>
                                            ) : null}
                                        </FlexLayout>
                                    </FlexChild>
                                </FlexLayout>
                            </div>
                        );
                    })
                )}
            </Modal>
        </>
    );
};

export const WarningModal = (_props: warningModalI) => {
    const {
        errorArray,
        warningModal,
        setWarningModal,
        loadingErrorModal,
        solutions,
    } = _props;

    const [openSolution, setOpenSolution] = React.useState<boolean[]>([]);

    React.useEffect(() => {
        const temp = Array(errorArray.length).fill(false);
        setOpenSolution([...temp]);
    }, [errorArray]);

    const openResolution = (i: number) => {
        const temp = openSolution.map((item: boolean, index: number) =>
            index === i ? !item : false
        );
        setOpenSolution([...temp]);
    };

    return (
        <>
            <Modal
                open={warningModal}
                close={() => setWarningModal(!warningModal)}
                heading="Warning"
                modalSize="small">
                {loadingErrorModal ? (
                    <Skeleton height="50px" line={2} type="line" width="50px" />
                ) : (
                    errorArray?.map((item: any, index: number) => {
                        return (
                            <div className="mb-20">
                                <FlexLayout
                                    spacing="loose"
                                    valign="start"
                                    wrap="noWrap"
                                    key={index}>
                                    <AlertOctagon
                                        color="#B28C35"
                                        size="20"
                                        style={{ display: 'block' }}
                                    />
                                    <FlexChild desktopWidth="100">
                                        <FlexLayout direction="vertical">
                                            <FlexChild>
                                                <>
                                                    <TextStyles
                                                        alignment="left"
                                                        fontweight="extraBold"
                                                        textcolor="dark"
                                                        type="neutralText"
                                                        utility="none">
                                                        {item?.title}
                                                    </TextStyles>
                                                    <TextStyles
                                                        alignment="left"
                                                        fontweight="normal"
                                                        textcolor="dark"
                                                        type="none"
                                                        utility="custom-heading_camp1">
                                                        {item?.description}
                                                    </TextStyles>
                                                </>
                                            </FlexChild>
                                            {solutions?.[index]
                                                ?.solution_exists ? (
                                                <FlexChild>
                                                    <div className="mt-10">
                                                        <Accordion
                                                            key={index}
                                                            boxed
                                                            active={
                                                                openSolution[
                                                                    index
                                                                ]
                                                            }
                                                            icon
                                                            iconAlign="right"
                                                            onClick={() =>
                                                                openResolution(
                                                                    index
                                                                )
                                                            }
                                                            title="Resolutions">
                                                            <TextStyles textcolor="light">
                                                                {
                                                                    solutions?.[
                                                                        index
                                                                    ]?.answer
                                                                }
                                                            </TextStyles>
                                                        </Accordion>
                                                    </div>
                                                </FlexChild>
                                            ) : null}
                                        </FlexLayout>
                                    </FlexChild>
                                </FlexLayout>
                            </div>
                        );
                    })
                )}
            </Modal>
        </>
    );
};
