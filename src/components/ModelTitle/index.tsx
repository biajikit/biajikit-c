interface titleProps {
    title?: string;
}

export default function Index({
                                  title
                              }: titleProps) {
    return (
        <>
            {title?.trim() &&
                <div className="font-medium text-[16px] leading-[22px] text-justify m-[20px_0_20px_16px]">
                    {title}
                </div>
            }
        </>
    );
}