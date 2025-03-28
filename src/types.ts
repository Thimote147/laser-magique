interface Activity {
    map(arg0: ({ name }: Activity, index: number) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
    activity_id: number;
    name: string;
    type: string;
    first_price?: number;
    second_price?: number;
    third_price: number;
    is_social_deal: boolean;
    min_player?: number;
    max_player?: number;
}

interface Booking {
    booking_id: number;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    date: Date;
    activity: Activity | string;
    nbr_parties: number;
    nbr_pers: number;
    type: string;
    deposit: number;
    amount: number;
    total: number;
    comment: string;
    is_cancelled: boolean;
    cash_payment: number;
    card_payment: number;
}

interface Conso {
    conso_id: number;
    name: string;
    price: number;
    quantity: number;
    food_id?: number;
}

export type { Activity, Booking, Conso };