export interface User {
	user_id: string;
	firstname: string;
	lastname: string;
	email: string;
	phone: string;
	password: string;
	role: string;
	hourly_rate?: number;
	hours: {
		hour_id: number,
		date: string,
		beginning: string,
		ending?: string,
		nbr_hours?: string,
		amount?: number
	}[];
}
