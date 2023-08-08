import React from 'react';
import MainCarousel from '../../components/HomeCarousel/MainCarousel';
import HomeSectionCarousel from '../../components/HomeSectionCarousel/HomeSectionCarousel';
import { women_aodai } from '../../../data/women_aodai';

const HomePage = () => {
    return (
        <div>
            <MainCarousel />

            <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
                <HomeSectionCarousel
                    data={women_aodai}
                    sectionName={'Ao Dai'}
                />
                <HomeSectionCarousel
                    data={women_aodai}
                    sectionName={'Ao Thun'}
                />
                <HomeSectionCarousel data={women_aodai} sectionName={'Quan'} />
                <HomeSectionCarousel data={women_aodai} sectionName={'Giay'} />
            </div>
        </div>
    );
};

export default HomePage;
