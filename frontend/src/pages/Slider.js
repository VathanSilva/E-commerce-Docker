import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Slider = () => {
    const SliderData = [
        {
            title: 'Jackets & Coats',
            subtitle: 'Quality Matters.'
        },
        {
            title: 'Find The Best Outfit',
            subtitle: 'With 30% Off'
        },
        {
            title: 'The Best Shoes',
            subtitle: 'Comfort For your long day'
        },
        {
            title: 'Next Season Is here',
            subtitle: 'Enjoy your summer with us.'
        }
    ];

    const [current, setCurrent] = useState(0);
    const length = SliderData.length;
    const [auto, setAuto] = useState(true);
    const intervalTime = 6000;
    const slideInterval = useRef(null); // Using useRef for the interval

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    useEffect(() => {
        if (auto) {
            slideInterval.current = setInterval(nextSlide, intervalTime);
        }
        return () => {
            clearInterval(slideInterval.current); // Clear interval on cleanup
        };
    }, [current, auto]); // Use 'current' and 'auto' as dependencies

    return (
        <div className='slider'>
            {SliderData.map((slide, index) => {
                return (
                    <div key={index} className={index === current ? 'slide current' : 'slide'}>
                    </div>
                );
            })}
            <IoIosArrowForward className='next' size='32' onClick={nextSlide} />
            <IoIosArrowBack className='prev' size='32' onClick={prevSlide} />
        </div>
    );
};

export default Slider;
