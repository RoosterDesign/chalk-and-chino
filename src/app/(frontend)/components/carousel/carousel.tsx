"use client";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import Image from "next/image";
import React, { useState } from "react";
import "@splidejs/react-splide/css/core";

import "./carousel.scss";

const arrowIcon = (
    <svg fill="none" height="13" width="16" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M10.059 1.5 15 6.5m0 0-4.941 5M15 6.5H1"
            stroke="#FDF8EC"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
        />
    </svg>
);

type CarouselProps = {
    arrows?: boolean;
    autoPlay?: boolean;
    children: React.ReactNode;
    desktopGap?: string;
    desktopPerPage?: number;
    hasPadding?: boolean;
    infinite?: boolean;
    mobileGap?: string;
    mobileOnly?: boolean;
    mobilePerPage?: number;
    pagination?: boolean;
    tabletGap?: string;
    tabletPerPage?: number;
};

const Carousel: React.FC<CarouselProps> = ({
    autoPlay = false,
    infinite = false,
    arrows = false,
    children,
    desktopGap = "30px",
    desktopPerPage = 3,
    hasPadding = false,
    mobileGap = "20px",
    mobileOnly = true,
    mobilePerPage = 1,
    pagination = true,
    tabletGap = "30px",
    tabletPerPage = 2,
}) => {
    const padding = hasPadding ? "150px " : "0";

    const slidesCount = React.Children.count(children);
    const isSingleSlide = slidesCount === 1;

    return (
        <Splide
            hasTrack={false}
            options={{
                type: infinite ? "loop" : "slide",
                autoplay: autoPlay,
                arrows,
                drag: !isSingleSlide,
                gap: mobileGap,
                mediaQuery: "min",
                pagination,
                perMove: 1,
                perPage: mobilePerPage,
                breakpoints: {
                    1280: {
                        destroy: mobileOnly,
                    },
                    768: {
                        gap: tabletGap,
                        perPage: tabletPerPage,
                    },
                    992: {
                        gap: desktopGap,
                        padding,
                        perPage: desktopPerPage,
                    },
                },
            }}
        >
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
    );
};

export default Carousel;
