import PublicHeader from '@/components/PublicHeader/index'
import ShopRecommendCard from '@/components/GoodsRecommendCard/index'
import ShopCard from '@/components/GoodsCard/index'
import CategoryNav from '@/components/CategoryNav/index'
import ShopDetail from '@/components/PublicFooter/index'
import {useScrollTrigger} from "@/hooks/useTriggerVisibility.tsx";


export default function Home() {
    let {scrollContainerRef} = useScrollTrigger()
    return (
        <div>
            <PublicHeader></PublicHeader>
            <div className="sm:flex">
                <CategoryNav></CategoryNav>
                <div className="sm:flex-1 sm:overflow-y-auto sm:h-screen" ref={scrollContainerRef}>
                    <ShopRecommendCard/>
                    <ShopCard></ShopCard>
                </div>
            </div>
            <ShopDetail></ShopDetail>
        </div>
    );
}
