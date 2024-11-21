import React from "react";

const handleMouseEnter = (index: number, setActiveIndex: (index: number | null) => void) => {
    setActiveIndex(index);
};

const handleMouseLeave = (
    event: React.MouseEvent<HTMLElement>,
    menuRef: React.RefObject<HTMLDivElement>,
    setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>
) => {
    if (menuRef.current && !menuRef.current.contains(event.relatedTarget as Node)) {
        setActiveIndex(null);
    }
};

export { handleMouseEnter, handleMouseLeave };