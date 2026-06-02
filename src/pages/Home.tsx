import PublicHeader from '@/components/PublicHeader/index'
// import ModelTitle from '@/components/ModelTitle/index'
// import ShopRecommendCard from '@/components/GoodsRecommendCard/index'
import ShopCard from '@/components/GoodsCard/index'
import CategoryNav from '@/components/CategoryNav/index'
import ShopDetail from '@/components/PublicFooter/index'
import {useScrollTrigger} from "@/hooks/useTriggerVisibility.tsx";
import {getStorage} from "@/core/publicFn.ts";
import {languageKeyList} from "@/assets/dict/pageLanguage.ts";
import {useLanguage} from "@/assets/dict/language.tsx";


export default function Home() {
    let {scrollContainerRef} = useScrollTrigger()
    // 根据用户浏览器修改页面默认语言
    if (!getStorage('lang')) {
        let locale = 'EN'
        languageKeyList.forEach((language) => {
            if (language.key.toLowerCase() === navigator.language.toLowerCase()) locale = language.key
        })
        const {setLang} = useLanguage() // 语言设置
        setLang(locale)
    }
    return (
        <div>
            <PublicHeader></PublicHeader>
            <div className="sm:flex">
                <CategoryNav></CategoryNav>
                <div className="sm:flex-1 sm:overflow-y-auto sm:h-screen" ref={scrollContainerRef}>
                    {/*<ModelTitle title={`啊大大啊是的`}></ModelTitle>*/}
                    {/*<ShopRecommendCard title={`阿萨大大撒旦撒`}/>*/}
                    <ShopCard></ShopCard>
                </div>
            </div>
            <ShopDetail></ShopDetail>
        </div>
    );
}
