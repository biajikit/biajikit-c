interface titleProps {
    title?: string;
    className?: string;
}

export default function Index({
                                  title,
                                  className
                              }: titleProps) {
    return (
        <>
            {title?.trim() &&
                <div className={`font-medium text-[16px] leading-[22px] text-justify m-[20px_0_20px_16px] ${className}`}>
                    {title}
                </div>
            }
        </>
    );
}