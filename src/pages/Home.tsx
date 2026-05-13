import PublicHeader from '@/components/PublicHeader/index'
import ModelTitle from '@/components/ModelTitle/index'
import ShopRecommendCard from '@/components/GoodsRecommendCard/index'
import ShopCard from '@/components/GoodsCard/index'
import CategoryNav from '@/components/CategoryNav/index'
import ShopDetail from '@/components/PublicFooter/index'


export default function Home() {
    return (
        <div>
            <PublicHeader></PublicHeader>
            <div className="sm:flex">
                <CategoryNav></CategoryNav>
                <div className="sm:flex-1 sm:overflow-y-auto sm:h-screen">
                    <ModelTitle title={`啊大大啊是的`}></ModelTitle>
                    <ShopRecommendCard title={`阿萨大大撒旦撒`}/>
                    <ShopCard></ShopCard>
                </div>
            </div>
            <ShopDetail></ShopDetail>
        </div>
    );
}
