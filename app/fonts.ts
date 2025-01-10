import {
    Sen, DM_Serif_Text, Libre_Baskerville, DM_Serif_Display
} from 'next/font/google'

export const sen = Sen({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-sen',
})

// export const baskervville = Baskervville({
//     weight: '400',
//     subsets: ['latin'],
//     display: 'swap',
//     variable: '--font-baskervville'
// })

export const libreBaskerville = Libre_Baskerville({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-libreBaskerville'
})

export const dmSerifText = DM_Serif_Text({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-dmSerifText'
})
