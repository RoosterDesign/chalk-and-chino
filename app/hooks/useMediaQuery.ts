import { useState, useEffect } from 'react';

const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        const updateMatch = () => setMatches(mediaQuery.matches);

        updateMatch();
        mediaQuery.addEventListener('change', updateMatch);
        return () => mediaQuery.removeEventListener('change', updateMatch);
    }, [query]);

    return matches;
};

export default useMediaQuery;
