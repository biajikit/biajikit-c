import {useState, useEffect, useRef} from 'react';

let globalShowNav = false;
let activeTitleIndex = -1;
const listeners: (() => void)[] = [];

let targetElement: HTMLElement | null = null;
let scrollContainer: HTMLDivElement | null = null;
let inited = false;
let isScrollingLock = false;
let latestTitles: HTMLElement[] = [];

// 判断大小屏 小屏是页面整体滚动 大屏是区域滚动
function isLargeScreen() {
    if (!scrollContainer) return false;
    return scrollContainer.scrollHeight > scrollContainer.clientHeight;
}

// 初始化滚动监听
function initScroll(scrollNavToCenter: (index: number) => void) {
    if (inited) return;
    inited = true;

    const handleScroll = (e: Event) => {
        if (!targetElement || isScrollingLock) return;

        const largeScreen = isLargeScreen();
        const isContainerScroll = e.target === scrollContainer;

        if (largeScreen && isContainerScroll && window.scrollY !== 0) {
            window.scrollTo({top: 0, behavior: 'instant'});
        }

        if (!largeScreen) {
            const rect = targetElement.getBoundingClientRect();
            const isPartiallyVisible = rect.top < 0 && rect.bottom > 0;
            if (isPartiallyVisible !== globalShowNav) {
                globalShowNav = isPartiallyVisible;
                listeners.forEach(fn => fn());
            }
        }

        const viewportHeight = largeScreen && scrollContainer
            ? scrollContainer.clientHeight
            : window.innerHeight;
        const halfViewport = viewportHeight / 2;
        const titles = latestTitles;
        let newActiveIndex = -1;

        titles.forEach((title, index) => {
            const titleRect = title.getBoundingClientRect();
            let isInView: boolean;

            if (largeScreen && scrollContainer) {
                const containerRect = scrollContainer.getBoundingClientRect();
                const relTop = titleRect.top - containerRect.top;
                const relBottom = titleRect.bottom - containerRect.top;
                isInView = relBottom > 0 && relTop < viewportHeight;
            } else {
                isInView = titleRect.bottom > 0 && titleRect.top < viewportHeight;
            }

            const isAboveHalf = titleRect.top < halfViewport;
            if (isInView && isAboveHalf) newActiveIndex = index;
        });

        if (newActiveIndex !== -1 && newActiveIndex !== activeTitleIndex) {
            activeTitleIndex = newActiveIndex;
            listeners.forEach(fn => fn());
            setTimeout(() => scrollNavToCenter(newActiveIndex), 50);
        }
    };

    window.addEventListener('scroll', handleScroll);
}

export function useScrollTrigger() {
    const [, forceUpdate] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLElement[]>([]);

    const navContainerRef = useRef<HTMLDivElement>(null);
    const navItemRefs = useRef<(HTMLElement | null)[]>([]);

    const updateTitles = () => {
        latestTitles = titleRef.current.filter(el => !!el);
    };

    const refreshNavRefs = () => {
        navItemRefs.current = [];
    };

    // 小屏滚动当前项居中显示
    const scrollNavToCenter = (index: number) => {
        const container = navContainerRef.current;
        const item = navItemRefs.current[index];
        if (!container || !item) return;

        const containerW = container.offsetWidth;
        const itemW = item.offsetWidth;
        const itemLeft = item.offsetLeft;

        const scroll = itemLeft - (containerW / 2) + (itemW / 2) - 32;
        container.scrollTo({left: scroll, behavior: 'smooth'});
    };

    useEffect(() => {
        scrollContainer = scrollContainerRef.current;
        latestTitles = titleRef.current;

        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', (e) => {
                if (!targetElement || isScrollingLock) return;

                const container = scrollContainer;
                const largeScreen = isLargeScreen();
                const isContainerScroll = e.target === container;

                if (largeScreen && isContainerScroll && window.scrollY !== 0) {
                    window.scrollTo({top: 0, behavior: 'instant'});
                }

                const viewportHeight = largeScreen && container
                    ? container.clientHeight
                    : window.innerHeight;
                const halfViewport = viewportHeight / 2;
                const titles = latestTitles;
                let newActiveIndex = -1;

                titles.forEach((title, index) => {
                    const titleRect = title.getBoundingClientRect();
                    let isInView: boolean;

                    if (largeScreen && container) {
                        const containerRect = container.getBoundingClientRect();
                        const relTop = titleRect.top - containerRect.top;
                        const relBottom = titleRect.bottom - containerRect.top;
                        isInView = relBottom > 0 && relTop < viewportHeight;
                    } else {
                        isInView = titleRect.bottom > 0 && titleRect.top < viewportHeight;
                    }

                    const isAboveHalf = titleRect.top < halfViewport;
                    if (isInView && isAboveHalf) newActiveIndex = index;
                });

                if (newActiveIndex !== -1 && newActiveIndex !== activeTitleIndex) {
                    activeTitleIndex = newActiveIndex;
                    listeners.forEach(fn => fn());
                    setTimeout(() => scrollNavToCenter(newActiveIndex), 50);
                }
            });
        }

        initScroll(scrollNavToCenter);
        const update = () => forceUpdate(n => n + 1);
        listeners.push(update);
        return () => {
            const i = listeners.indexOf(update);
            if (i !== -1) listeners.splice(i, 1);
        };
    }, []);

    // 绑定列表区域节点
    const bindTarget = (el: HTMLElement | null) => {
        if (el) targetElement = el;
    };

    // 点击导航滚动到指定位置
    const scrollToIndex = (index: number) => {
        const titles = latestTitles;
        const targetTitle = titles[index];
        if (!targetTitle) return;

        isScrollingLock = true;
        activeTitleIndex = index;
        listeners.forEach(fn => fn());
        setTimeout(() => scrollNavToCenter(index), 50);

        const largeScreen = isLargeScreen();
        const viewportHeight = largeScreen && scrollContainer
            ? scrollContainer.clientHeight
            : window.innerHeight;

        const titleHeight = targetTitle.offsetHeight;
        const centerOffset = viewportHeight / 2 - titleHeight / 2 - 1;

        if (largeScreen && scrollContainer) {
            const targetTopInContainer = targetTitle.offsetTop;
            const finalTop = targetTopInContainer - centerOffset;
            scrollContainer.scrollTo({top: finalTop, behavior: 'smooth'});
            waitForScrollEnd(scrollContainer, () => {
                isScrollingLock = false;
            });
        } else {
            const targetTop = targetTitle.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({top: targetTop - centerOffset, behavior: 'smooth'});
            waitForScrollEnd(window, () => {
                isScrollingLock = false;
            });
        }
    };

    return {
        isOutOfView: globalShowNav, // 滚动区域是否在可视区域内
        bindTarget, // 列表区域节点
        activeTitleIndex, // 当前命中的分类下标
        scrollToIndex, // 点击滚动事件
        scrollContainerRef, // 大屏时的滚动区域
        titleRef, // 分类标题节点
        updateTitles, // 更新分类标题节点
        navContainerRef, // 小屏导航栏节点
        navItemRefs, // 小屏导航栏内节点
        refreshNavRefs, // 更新导航栏节点
    };
}

// 滚动执行时禁用滚动监听 执行完成后验证小屏导航栏显示逻辑
function waitForScrollEnd(element: HTMLElement | Window, callback: () => void) {
    let isScrolling: number | null = null;
    const onScroll = () => {
        clearTimeout(isScrolling!);
        isScrolling = window.setTimeout(() => {
            callback();
            if (targetElement) {
                const rect = targetElement.getBoundingClientRect();
                const newValue = rect.top < 0 && rect.bottom > 0;
                if (newValue !== globalShowNav) {
                    globalShowNav = newValue;
                    listeners.forEach(fn => fn());
                }
            }
        }, 50);
    };
    element.addEventListener('scroll', onScroll);
}