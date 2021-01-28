import {HomepageBlock, HomepageBlockItem} from "../components/homepage-block";
import beer from '../assets/img/homepage/beer.png'
import pub from '../assets/img/homepage/inside-bar.png'
import wisent from '../assets/img/homepage/outside.png'
import xd from '../assets/img/homepage/inside-tables.png'
import food from '../assets/img/homepage/food.png'
import Contact from "../components/contact";

const LandingScreen = ({ ...props }) => {
    return (
        <section>
            <HomepageBlock>
                <HomepageBlockItem>
                    <p className={'homepage-block-title'}>Jeden browar i to ŻUBR! </p>
                    <p className={'homepage-block-content'}>Tylko Winsent Bar ma najlepsze piwo które smakuje jak soczek ale klepie jak Mike Tyson. Żubr to najlepszy wybór. ZAPRASZAMY SPRÓBOWAĆ.</p>
                </HomepageBlockItem>
                <HomepageBlockItem>
                    <img className={'homepage-block-image'} alt={'image'} src={beer}/>
                </HomepageBlockItem>
            </HomepageBlock>
            <HomepageBlock>
                <HomepageBlockItem>
                    <img className={'homepage-block-image'} alt={'image'} src={pub}/>
                </HomepageBlockItem>
                <HomepageBlockItem>
                    <p className={'homepage-block-title'}>LUX BAR</p>
                    <p className={'homepage-block-content'}>W naszym barze, można się napić zimnego, pysznego, WYŻSZEJ JAKOŚCI piwa i na to wskazuje nasz ekskluzywny wystrój.   </p>
                </HomepageBlockItem>
            </HomepageBlock>
            <HomepageBlock>
                <HomepageBlockItem>
                    <p className={'homepage-block-title'}>JESTEŚ GŁODNY?!</p>
                    <p className={'homepage-block-content'}>W naszym barze spróbujecie jedzenie, które smakuje jak dotyk anioła. Kucharze zawsze wkładają pełne serce żeby nasze dania przypomniały najlepsze godziny życia!</p>
                </HomepageBlockItem>
                <HomepageBlockItem>
                    <img className={'homepage-block-image'} alt={'image'} src={food}/>
                </HomepageBlockItem>
            </HomepageBlock>
            <HomepageBlock>
                <HomepageBlockItem>
                    <img className={'homepage-block-image'} alt={'image'} src={xd}/>
                </HomepageBlockItem>
                <HomepageBlockItem>
                    <p className={'homepage-block-title'}>ChCeSz CiSzY?</p>
                    <p className={'homepage-block-content'}>W naszym Wisent Barze nie tylko można sie napić, ale spędzić czas w ciszy lub znajomymi. Mamy sale dla spotkań biznesowych lub przyjacielskich.</p>
                </HomepageBlockItem>
            </HomepageBlock>
            <HomepageBlock>
                <HomepageBlockItem>
                    <p className={'homepage-block-title'}>PODWÓREK???</p>
                    <p className={'homepage-block-content'}>Chcecie słoneczko i kwiatki?! To zapraszamy na podwórek. Na podwórku mamy piękny widok na rzekę i park.</p>
                </HomepageBlockItem>
                <HomepageBlockItem>
                    <img className={'homepage-block-image'} alt={'image'} src={wisent}/>
                </HomepageBlockItem>
            </HomepageBlock>
            <HomepageBlock>
                <section style={{ flex: 1 }}>
                    <p className={'homepage-block-title'} style={{ color: '#f1f2f3' }}>Kontakt</p>
                    <Contact light />
                </section>
            </HomepageBlock>
        </section>
    )
}

export default LandingScreen