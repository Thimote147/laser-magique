import { useEffect, useRef, useState } from "react";

const useActiveIndex = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (menuRef.current && activeIndex !== null) {
            menuRef.current.style.width = ["800px", "800px", "800px", "800px", "800px"][activeIndex];
        }
    }, [activeIndex]);

    return { activeIndex, setActiveIndex, menuRef };
};

export { useActiveIndex };