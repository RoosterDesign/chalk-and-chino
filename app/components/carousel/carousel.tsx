'use client';

import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/core';
import './carousel.scss';

type Props = {
    children: React.ReactNode;
    mobileGap?: string;
    tabletGap?: string;
    desktopGap?: string;
    mobilePerPage?: number;
    tabletPerPage?: number;
    desktopPerPage?: number;
    pagination?: boolean;
    arrows?: boolean;
}

const Carousel: React.FC<Props> = ({ children,
    mobilePerPage = 1,
    tabletPerPage = 2,
    desktopPerPage = 3,
    arrows = false,
    pagination = true,
    mobileGap = "20px",
    tabletGap = "30px",
    desktopGap = "30px" }) => {

    return (
        <Splide aria-label="My Favorite Images" options={{
            perPage: mobilePerPage,
            arrows,
            pagination,
            gap: mobileGap,
            mediaQuery: 'min',
            breakpoints: {
                768: {
                    perPage: tabletPerPage,
                    gap: tabletGap,
                },
                992: {
                    perPage: desktopPerPage,
                    gap: desktopGap,
                },
                1280: {
                    destroy: true,
                },
            }
        }}>
            {React.Children.map(children, (child, index) => (
                <SplideSlide key={index}>{child}</SplideSlide>
            ))}
        </Splide>
    )
};

export default Carousel
