interface Activity {
    map(arg0: ({ name }: Activity, index: number) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
    activity_id: number;
    name: string;
    type: string;
    first_price: number;
    second_price?: number;
    third_price?: number;
    is_social_deal: boolean;
    min_player: number;
    max_player: number;
}

interface Booking {
    id: number;
    activity: string;
    date: Date;
    nbr_pers: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
}

export type { Activity, Booking };