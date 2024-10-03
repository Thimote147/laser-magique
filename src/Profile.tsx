import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Maximize2, RotateCcw, X } from 'lucide-react'
import { useOnClickOutside } from 'usehooks-ts'
import './profile.scss'

interface DayProps {
    classNames: string
    tooltipText?: string
    delay: number
    day: DayType
}

const Day: React.FC<DayProps> = ({ classNames, tooltipText, delay, day }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [activeDay, setActiveDay] = useState<DayType | null>(null)
    const [animationDelay, setAnimationDelay] = useState(delay)
    const [activePhoto, setActivePhoto] = useState<string | null>(null)

    useEffect(() => {
        if (activeDay) {
            setAnimationDelay(0)
        }
    }, [activeDay])

    const ref = useRef(null)
    useOnClickOutside(ref, () => setActivePhoto(null))
    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setActivePhoto(null)
            }
        }

        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [])

    return (
        <>
            <AnimatePresence>
                {activePhoto && (
                    <div
                        className="bg-back/50 fixed inset-0 z-20 h-full w-full backdrop-blur-md"
                        ref={ref}
                    ></div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {activePhoto && (
                    <div className="fixed inset-0 z-30 flex items-center justify-center overflow-hidden p-4">
                        <motion.div
                            className="bg-slte-100 relative left-0 h-[400px] w-full max-w-[600px] cursor-pointer after:absolute after:inset-0 after:z-10 after:rounded-2xl after:border-4 after:border-black/10"
                            layoutId={`photo-${activePhoto}`}
                        >
                            <img
                                alt='activePhoto'
                                key={activePhoto}
                                className="bg-slte-100 h-full w-full rounded-2xl object-cover"
                                src={activePhoto}
                            />
                        </motion.div>
                        <motion.button
                            className="absolute right-4 top-4 z-40 rounded-full bg-zinc-900 p-3 text-white shadow-md transition-transform duration-300 active:scale-90"
                            onClick={() => setActivePhoto(null)}
                            initial={{ opacity: 0, scale: 0.9, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{
                                opacity: 0,
                                scale: 0.9,
                                y: -20,
                                transition: { duration: 0.05 },
                            }}
                            layout
                        >
                            <X />
                        </motion.button>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {activeDay && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center overflow-hidden">
                        <motion.div
                            className={`flex flex-col items-center justify-start gap-2 overflow-scroll p-2 ${classNames}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 8,
                            }}
                            layoutId={`day-${activeDay.day}`}
                            id={`day-${activeDay.day}`}
                        >
                            {activeDay.image && (
                                <motion.li
                                    className="group relative mt-10 flex h-52 w-full shrink-0 flex-col overflow-hidden rounded-2xl bg-white after:absolute after:inset-0 after:z-10 after:rounded-2xl after:border-4 after:border-white/70"
                                    initial={{ opacity: 0, scale: 0.9, y: -20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                    transition={{
                                        duration: 0.5,
                                        type: 'spring',
                                        stiffness: 200,
                                        damping: 30,
                                    }}
                                    layoutId={`photo-${activeDay.image}`}
                                    whileHover={{ filter: 'brightness(1.2)' }}
                                    onClick={() => setActivePhoto(activeDay.image as string)}
                                >
                                    <img
                                        src={activeDay.image}
                                        alt={activeDay.title}
                                        className="h-full w-full object-cover grayscale"
                                    />
                                    <button className="absolute right-2 top-2 rounded-full bg-white/70 p-3 text-zinc-900 opacity-0 shadow-md transition-all duration-300 group-hover:opacity-100">
                                        <Maximize2 />
                                    </button>
                                </motion.li>
                            )}
                            {activeDay.title && (
                                <motion.li
                                    className="flex w-full flex-col rounded-2xl bg-white p-6 pb-7 font-medium"
                                    initial={{ opacity: 0, scale: 0.9, y: -20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                    transition={{
                                        duration: 0.5,
                                        type: 'spring',
                                        stiffness: 200,
                                        damping: 30,
                                    }}
                                    layout
                                >
                                    <h2 className="mb-2 text-xl font-extrabold text-zinc-800">
                                        {activeDay.title}
                                    </h2>
                                    <p className="text-pretty text-zinc-600">
                                        {activeDay.description}
                                    </p>
                                </motion.li>
                            )}
                        </motion.div>
                        <motion.button
                            className="absolute left-2 top-2 z-20 block w-max rounded-full bg-white px-3 py-1.5 font-bold tracking-wide text-zinc-600 shadow-md transition-transform active:scale-90 sm:hover:scale-90 sm:active:scale-75"
                            onClick={() => setActiveDay(null)}
                            initial={{ opacity: 0, scale: 0.9, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{
                                opacity: 0,
                                scale: 0.9,
                                y: -20,
                                transition: { duration: 0.05 },
                            }}
                            layout
                        >
                            back
                        </motion.button>
                    </div>
                )}
            </AnimatePresence>

            <motion.div
                className={`relative flex items-center justify-center ${classNames}`}
                style={{ height: '2.5rem', borderRadius: 8 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                initial={{ opacity: 0, y: 20, scale: 0.9, rotate: 5 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                transition={{
                    duration: activeDay ? 0 : 0.3,
                    delay: animationDelay,
                }}
                layoutId={`day-${day.day}`}
                id={`day-${day.day}`}
                onClick={() => {
                    tooltipText && setActiveDay(day)
                }}
            >
                {tooltipText && isHovered && (
                    <motion.div
                        className="absolute bottom-full mb-1 rounded-lg bg-zinc-900 px-2 py-1.5 text-xs font-medium text-white"
                        initial={{ scale: 0, y: 10 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0, y: 10 }}
                    >
                        {tooltipText}
                    </motion.div>
                )}
            </motion.div>
        </>
    )
}

interface CalendarGridProps { }

const CalendarGrid: React.FC<CalendarGridProps> = () => {
    return (
        <div className="grid grid-cols-7 gap-2">
            {DAYS.map((day, index) => (
                <Day
                    key={`${day.day}-${index}`}
                    classNames={day.classNames}
                    tooltipText={day.tooltipText}
                    delay={index * 0.05}
                    day={day}
                />
            ))}
        </div>
    )
}

const App: React.FC = () => {
    const [resetKey, setResetKey] = useState<string>(Date.now().toString())

    const handleResetAnimations = () => {
        setResetKey(Date.now().toString())
    }

    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-start bg-[#f4f4f5] px-4 py-10 md:justify-center">
            <motion.div
                className="relative mx-auto my-10 flex w-full max-w-sm flex-col gap-4 overflow-hidden rounded-3xl border-0 border-white bg-zinc-800 p-7 shadow-xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                key={resetKey}
            >
                <motion.h2
                    className="mb-2 text-sm font-bold tracking-wider text-zinc-300"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    November
                </motion.h2>
                <CalendarGrid />
            </motion.div>
            <button
                onClick={handleResetAnimations}
                className="mt-4 rounded-full bg-zinc-900 p-3 text-white shadow-md transition-transform duration-300 active:scale-95"
            >
                <RotateCcw />
            </button>
        </main>
    )
}

export default App

type DayType = {
    day: string
    classNames: string
    tooltipText?: string
    image?: string
    title?: string
    description?: string
}

const DAYS: DayType[] = (() => {
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();
    const days: DayType[] = [];

    // Add days from the previous month if the first day is not Monday
    if (firstDayOfMonth !== 1) {
        const prevMonthDaysToShow = (firstDayOfMonth + 6) % 7; // Calculate how many days to show from the previous month
        for (let i = prevMonthDaysToShow; i > 0; i--) {
            days.push({
                day: `-${i}`,
                classNames: "bg-zinc-700/20",
            });
        }
    }

    // Add days of the current month
    for (let i = 0; i < daysInMonth; i++) {
        const day = (i + 1).toString().padStart(2, "0");
        days.push({
            day,
            classNames: "bg-zinc-700/50",});
    }

    // Add days from the next month to complete the last week
    const lastDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), daysInMonth).getDay();
    if (lastDayOfMonth !== 0) {
        const nextMonthDaysToShow = 7 - lastDayOfMonth;
        for (let i = 1; i <= nextMonthDaysToShow; i++) {
            days.push({
                day: `+${i}`,
                classNames: "bg-zinc-700/15",
            });
        }
    }

    return days;
})();
