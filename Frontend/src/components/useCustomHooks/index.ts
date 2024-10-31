import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

const useShowInfo = () => {
    const [showInfo, setShowInfo] = useState(false);
    const ref = useRef(null);
    useOnClickOutside(ref, () => setShowInfo(false));

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setShowInfo(false);
            }
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    return { showInfo, setShowInfo, ref };
};

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

export { useShowInfo, useActiveIndex };