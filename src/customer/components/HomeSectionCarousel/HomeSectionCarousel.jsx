import React from 'react';
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import AliceCarousel from 'react-alice-carousel';
import { Button } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useState } from 'react';
import { women_aodai } from '../../../data/women_aodai';

const HomeSectionCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const responsive = {
        0: { items: 1 },
        720: { items: 3 },
        1024: { items: 5 },
    };

    const slidePrev = () => setActiveIndex(activeIndex - 1);
    const slideNext = () => setActiveIndex(activeIndex + 1);

    const syncActiveIndex = ({ item }) => setActiveIndex(item);

    const items = women_aodai
        .slice(0, 10)
        .map((item) => <HomeSectionCard product={item} />);

    return (
        <div className="border">
            <div className="relative p-5">
                <AliceCarousel
                    items={items}
                    disableButtonsControls
                    responsive={responsive}
                    disableDotsControls
                    infinite
                    onSlideChanged={syncActiveIndex}
                    activeIndex={activeIndex}
                />
                {activeIndex !== items.length - 5 && (
                    <Button
                        variant="contained"
                        className="z-50 bg-white"
                        onClick={slideNext}
                        sx={{
                            position: 'absolute',
                            top: '8rem',
                            right: '0rem',
                            transform: 'translateX(50%) rotate(90deg)',
                            bgcolor: 'white',
                        }}
                        aria-label="next"
                    >
                        <KeyboardArrowLeftIcon
                            sx={{ transform: 'rotate(90deg)', color: 'black' }}
                        />
                    </Button>
                )}

                <Button
                    onClick={slidePrev}
                    variant="contained"
                    className="z-50 bg-white"
                    sx={{
                        position: 'absolute',
                        top: '8rem',
                        left: '0rem',
                        transform: 'translateX(50%) rotate(-90deg)',
                        bgcolor: 'white',
                    }}
                    aria-label="next"
                >
                    <KeyboardArrowLeftIcon
                        sx={{ transform: 'rotate(90deg)', color: 'black' }}
                    />
                </Button>
            </div>
        </div>
    );
};

export default HomeSectionCarousel;
