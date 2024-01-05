import React, { useState, useEffect } from "react";

// function that checks if the device width matches the query parameter
export const useMediaQuery = (query) => {
    const [matches, setMatches] = useState();

    useEffect(() => {
        const handler = (e) => setMatches(e.matches);

        const mediaMatch = window.matchMedia(query);
        setMatches(mediaMatch.matches);
        mediaMatch.addEventListener("change", handler);
        return () => mediaMatch.removeEventListener("change", handler);
    }, [query]);

    return matches;
};