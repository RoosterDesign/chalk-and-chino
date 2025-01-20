import {
    DM_Serif_Display, DM_Serif_Text, Libre_Baskerville, Sen
} from 'next/font/google'

export const sen = Sen({
    display: 'swap',
    subsets: ['latin'],
    variable: '--font-sen',
})

// export const baskervville = Baskervville({
//     weight: '400',
//     subsets: ['latin'],
//     display: 'swap',
//     variable: '--font-baskervville'
// })

export const libreBaskerville = Libre_Baskerville({
    display: 'swap',
    subsets: ['latin'],
    variable: '--font-libreBaskerville',
    weight: '400'
})

export const dmSerifText = DM_Serif_Text({
    display: 'swap',
    subsets: ['latin'],
    variable: '--font-dmSerifText',
    weight: '400'
})
