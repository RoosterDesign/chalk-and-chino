'use client';

import React from 'react';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import Image from 'next/image';
import '@splidejs/react-splide/css/core';
import './carousel.scss';

const arrowIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" fill="none"><path stroke="#FDF8EC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.059 1.5 15 6.5m0 0-4.941 5M15 6.5H1" /></svg>

type CarouselProps = {
    children: React.ReactNode;
    mobileGap?: string;
    tabletGap?: string;
    desktopGap?: string;
    hasPadding?: boolean;
    mobileOnly?: boolean;
    mobilePerPage?: number;
    tabletPerPage?: number;
    desktopPerPage?: number;
    pagination?: boolean;
    arrows?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({ children,
    mobilePerPage = 1,
    tabletPerPage = 2,
    desktopPerPage = 3,
    arrows = false,
    pagination = true,
    hasPadding = false,
    mobileGap = "20px",
    tabletGap = "30px",
    desktopGap = "30px",
    mobileOnly = true }) => {

    const padding = hasPadding ? "150px " : "0";

    return (
        <Splide hasTrack={false} aria-label="My Favorite Images" options={{
            perPage: mobilePerPage,
            arrows,
            pagination,
            gap: mobileGap,
            perMove: 1,
            mediaQuery: 'min',
            breakpoints: {
                768: {
                    perPage: tabletPerPage,
                    gap: tabletGap,
                },
                992: {
                    perPage: desktopPerPage,
                    gap: desktopGap,
                    padding
                },
                1280: {
                    destroy: mobileOnly,
                },
            },
        }}>

            <SplideTrack>
                {React.Children.map(children, (child, index) => (
                    <SplideSlide key={index}>{child}</SplideSlide>
                ))}
            </SplideTrack>

            <div className="splide__arrows">
                <button className="splide__arrow splide__arrow--prev">
                    {arrowIcon}
                </button>
                <button className="splide__arrow splide__arrow--next">
                    {arrowIcon}
                </button>
            </div>

        </Splide>
    )
};

export default Carousel
