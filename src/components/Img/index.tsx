import React, {useState, forwardRef, useEffect, ReactNode} from 'react';

// 不继承 ImgHTMLAttributes，自己定义所有属性
interface ImgProps {
    src?: string;
    alt?: string | ReactNode;
    'aria-label'?: string | ReactNode;
    defaultSrc?: string;
    lazy?: boolean;
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLImageElement>;
    onError?: React.ReactEventHandler<HTMLImageElement>;
    loading?: 'lazy' | 'eager';
}

const Img = forwardRef<HTMLImageElement, ImgProps>(
    ({
         src = '',
         alt = '',
         'aria-label': ariaLabel,
         defaultSrc = '/img/default.png',
         lazy = true,
         ...rest
     }, ref) => {

        // 把 ReactNode 安全转成字符串
        const toSafeString = (node: ReactNode | string): string => {
            if (typeof node === 'string') return node;
            if (typeof node === 'number') return String(node);
            return '';
        };

        const processSrc = (source: string) => {
            if (!source) return defaultSrc;
            if (source.includes('http')) return source;
            return `${import.meta.env.VITE_PUBLIC_IMG_PATH}${source}`;
        };

        const [imgSrc, setImgSrc] = useState<string>(() => processSrc(src));

        useEffect(() => {
            setImgSrc(processSrc(src));
        }, [src]);

        const handleError = () => {
            setImgSrc(defaultSrc);
        };

        return (
            <img
                ref={ref}
                src={imgSrc}
                alt={toSafeString(alt)}
                aria-label={toSafeString(ariaLabel)}
                loading={lazy ? 'lazy' : 'eager'}
                onError={handleError}
                {...rest}
            />
        );
    }
);

Img.displayName = 'Img';
export default Img;