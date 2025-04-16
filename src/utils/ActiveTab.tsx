import { useState } from 'react';

export const UseActiveTab = (initialTab: string) => {
    const [activeTab, setActiveTab] = useState<string>(initialTab);

    const handleActiveTab = (tabname: string) => {
        setActiveTab(tabname);
    };

    return { activeTab, handleActiveTab };
}

export const UseFocus = (initialFocus: boolean) => {
    const [focus, setFocus] = useState<boolean>(initialFocus);

    const handleFocus = (focus: boolean) => {
        setFocus(focus);
    };

    return { focus, handleFocus };
}

export const FocusLogin = () => {
    const [focusLogin, setFocusLogin] = useState<boolean>(false);

    const onFocusLogin = () => {
        setFocusLogin(true);
    };
    const onBlurLogin = () => {
        setFocusLogin(false);
    };
    return { focusLogin, onFocusLogin, onBlurLogin };
};
