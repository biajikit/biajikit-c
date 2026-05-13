import { useState, useEffect } from 'react';

let globalShowDialog = '';
const listeners: (() => void)[] = [];

export function useDialog() {
    const [, forceUpdate] = useState(0);

    useEffect(() => {
        const update = () => forceUpdate(n => n + 1);
        listeners.push(update);
        return () => {
            const idx = listeners.indexOf(update);
            if (idx > -1) listeners.splice(idx, 1);
        };
    }, []);

    const setDialog = (type?: string) => {
        const newValue = globalShowDialog === type ? '' : type || '';
        globalShowDialog = newValue;

        if (newValue) {
            document.body.style.overflowY = 'hidden';
            document.body.style.height = '100vh';
        } else {
            document.body.style.overflowY = 'auto';
            document.body.style.height = 'auto';
        }

        listeners.forEach(fn => fn());
    };

    return {
        showDialog: globalShowDialog,
        setDialog,
    };
}