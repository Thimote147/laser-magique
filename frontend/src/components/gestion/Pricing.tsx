import AnimatedNumbers from 'react-animated-numbers'
import React from 'react'
import { Activity } from '../../types'

interface PricingProps {
    count: number
    gameChosen: Activity
    setNbr_parties: React.Dispatch<React.SetStateAction<number>>
}

const nbr_parties = (first:number, second:number, third:number) => [
    {
        id: 1,
        name: "1 partie",
        price: first
    },
    {
        id: 2,
        name: "2 parties",
        price: second
    },
    {
        id: 3,
        name: "3 parties",
        price: third
    }
]

const Pricing = ({ count, gameChosen, setNbr_parties }: PricingProps) => {
    const [selected, setSelected] = React.useState(0)
    const [first] = React.useState(gameChosen.first_price)
    const [second] = React.useState(gameChosen.second_price ? gameChosen.first_price + gameChosen.second_price : gameChosen.first_price * 2)
    const [third] = React.useState(gameChosen.second_price && gameChosen.third_price ? gameChosen.first_price + gameChosen.second_price + gameChosen.third_price : gameChosen.first_price * 3)

    return (
        <div className="flex w-full max-w-md flex-col items-center gap-3 rounded-[32px] pt-5">
            <div className="relative flex w-full flex-col items-center justify-center gap-3">
                {nbr_parties(first, second, third).map((partie) => (
                <div className={`flex w-full cursor-pointer justify-between rounded-2xl p-4 ${selected === partie.id ? 'bg-purple-500 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
                    onClick={() => {setSelected(partie.id); setNbr_parties(partie.id)}}>
                    <div className="flex flex-col items-start">
                        <p className="text-xl font-semibold">{partie.name}</p>
                        <p className="text-md flex ">
                            <span className="flex font-medium">
                                <AnimatedNumbers
                                    includeComma
                                    className="font-medium"
                                    transitions={() => ({
                                        type: 'spring',
                                        duration: 0.3,
                                    })}
                                    animateToNumber={partie.price}
                                />
                                €
                            </span>
                            /personnes - Total :
                            <span className="flex font-medium ps-1">
                                <AnimatedNumbers
                                    includeComma
                                    className="font-medium"
                                    transitions={() => ({
                                        type: 'spring',
                                        duration: 0.3,
                                    })}
                                    animateToNumber={partie.price * count}
                                />
                                €
                            </span>
                        </p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default Pricing;