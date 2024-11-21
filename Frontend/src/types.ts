interface Activity {
    map(arg0: ({ name }: Activity, index: number) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
    activity_id: number;
    name: string;
    type: string;
    first_price: number;
    second_price?: number;
    third_price?: number;
    is_social_seal: boolean;
    min_player: number;
    max_player: number;
}

export type { Activity };