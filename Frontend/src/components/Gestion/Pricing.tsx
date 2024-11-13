import AnimatedNumbers from 'react-animated-numbers'
import React from 'react'

const Pricing = () => {
    const [active, setActive] = React.useState(0)
    const [period, setPeriod] = React.useState(0)
    const handleChangePlan = (index: number) => {
        setActive(index)
    }
    const handleChangePeriod = (index: number) => {
        setPeriod(index)
        if (index === 0) {
            setStarter(9.99)
            setPro(19.99)
        } else {
            setStarter(7.49)
            setPro(17.49)
        }
    }
    const [starter, setStarter] = React.useState(9.99)
    const [pro, setPro] = React.useState(19.99)
    return (
        <div className="absolute min-w-96 right-3 bottom-3 bg-white">
            <div className="flex w-full max-w-sm flex-col items-center gap-3 rounded-[32px] border-2 p-3 shadow-md">
                <div className="relative flex w-full items-center rounded-full bg-slate-100 p-1.5">
                    <button
                        className="z-20 w-full rounded-full p-1.5 font-semibold text-slate-800"
                        onClick={() => handleChangePeriod(0)}
                    >
                        Classique
                    </button>
                    <button
                        className="z-20 w-full rounded-full p-1.5 font-semibold text-slate-800"
                        onClick={() => handleChangePeriod(1)}
                    >
                        Social Deal
                    </button>
                    <div
                        className="items-cnter absolute inset-0 z-10 flex w-1/2 justify-center p-1.5"
                        style={{
                            transform: `translateX(${period * 100}%)`,
                            transition: 'transform 0.3s',
                        }}
                    >
                        <div className="h-full w-full rounded-full bg-white shadow-sm"></div>
                    </div>
                </div>
                <div className="relative flex w-full flex-col items-center justify-center gap-3">
                    <div
                        className="flex w-full cursor-pointer justify-between rounded-2xl border-2 p-4"
                        onClick={() => handleChangePlan(0)}
                    >
                        <div className="flex flex-col items-start">
                            <p className="text-xl font-semibold">1 partie</p>
                            <p className="text-md text-slate-500">
                                <span className="font-medium text-white">0.00€</span>/personnes
                            </p>
                        </div>
                        <div
                            className="mt-0.5 flex size-6 items-center justify-center rounded-full border-2 border-slate-500 p-1"
                            style={{
                                borderColor: `${active === 0 ? '#000' : '#64748b'}`,
                                transition: 'border-color 0.3s',
                            }}
                        >
                            <div
                                className="size-3 rounded-full bg-black"
                                style={{
                                    opacity: `${active === 0 ? 1 : 0}`,
                                    transition: 'opacity 0.3s',
                                }}
                            ></div>
                        </div>
                    </div>
                    <div
                        className="flex w-full cursor-pointer justify-between rounded-2xl border-2 p-4"
                        onClick={() => handleChangePlan(1)}
                    >
                        <div className="flex flex-col items-start">
                            <p className="flex items-center gap-2 text-xl font-semibold">
                                2 parties
                            </p>
                            <p className="text-md flex text-slate-500">
                                <span className="flex items-center font-medium text-black">
                                    <AnimatedNumbers
                                        includeComma
                                        className="font-medium text-black"
                                        transitions={() => ({
                                            type: 'spring',
                                            duration: 0.3,
                                        })}
                                        animateToNumber={starter}
                                        />
                                        €
                                </span>
                                /personnes
                            </p>
                        </div>
                        <div
                            className="mt-0.5 flex size-6 items-center justify-center rounded-full border-2 border-slate-500 p-1"
                            style={{
                                borderColor: `${active === 1 ? '#000' : '#64748b'}`,
                                transition: 'border-color 0.3s',
                            }}
                        >
                            <div
                                className="size-3 rounded-full bg-black"
                                style={{
                                    opacity: `${active === 1 ? 1 : 0}`,
                                    transition: 'opacity 0.3s',
                                }}
                            ></div>
                        </div>
                    </div>
                    <div
                        className="flex w-full cursor-pointer justify-between rounded-2xl border-2 p-4"
                        onClick={() => handleChangePlan(2)}
                    >
                        <div className="flex flex-col items-start">
                            <p className="text-xl font-semibold">3 parties</p>
                            <p className="text-md flex text-slate-500">
                                <span className="flex items-center font-medium text-white">
                                    <AnimatedNumbers
                                        includeComma
                                        className="font-medium text-white"
                                        transitions={() => ({
                                            type: 'spring',
                                            duration: 0.3,
                                        })}
                                        animateToNumber={pro}
                                    />
                                    €
                                </span>
                                /personnes
                            </p>
                        </div>
                        <div
                            className="mt-0.5 flex size-6 items-center justify-center rounded-full border-2 border-slate-500 p-1"
                            style={{
                                borderColor: `${active === 2 ? '#000' : '#64748b'}`,
                                transition: 'border-color 0.3s',
                            }}
                        >
                            <div
                                className="size-3 rounded-full bg-black"
                                style={{
                                    opacity: `${active === 2 ? 1 : 0}`,
                                    transition: 'opacity 0.3s',
                                }}
                            ></div>
                        </div>
                    </div>
                    <div
                        className={`absolute top-0 h-[88px] w-full rounded-2xl border-[3px] border-black`}
                        style={{
                            transform: `translateY(${active * 88 + 12 * active}px)`,
                            transition: 'transform 0.3s',
                        }}
                    ></div>
                </div>
                <button className="w-full rounded-full bg-black p-3 text-lg text-white transition-transform duration-300 active:scale-95">
                    Réserver
                </button>
            </div>
        </div>
    )
}

export default Pricing;