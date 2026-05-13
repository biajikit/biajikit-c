import { useState, useEffect } from 'react';

// 全局状态
let globalShowNav = false;
const listeners: (() => void)[] = [];

// 全局存储目标元素
let targetElement: HTMLElement | null = null;
let inited = false;

// 全局滚动监听
function initScroll() {
    if (inited) return;
    inited = true;

    window.addEventListener('scroll', () => {
        if (!targetElement) return;

        const rect = targetElement.getBoundingClientRect();
        const isPartiallyVisible = rect.top < 0 && rect.bottom > 0;

        if (isPartiallyVisible !== globalShowNav) {
            globalShowNav = isPartiallyVisible;
            listeners.forEach(fn => fn());
        }
    });
}

export function useScrollTrigger() {
    const [, forceUpdate] = useState(0);

    useEffect(() => {
        initScroll();

        const update = () => forceUpdate(n => n + 1);
        listeners.push(update);
        return () => {
            const i = listeners.indexOf(update);
            if (i !== -1) listeners.splice(i, 1);
        };
    }, []);

    const bindTarget = (el: HTMLElement | null) => {
        if (el) targetElement = el;
    };

    return {
        isOutOfView: globalShowNav,
        bindTarget,
    };
}