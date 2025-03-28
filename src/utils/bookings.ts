import { supabase } from "../supabase/client";

export const getAvailabilities = async (date: string): Promise<Record<string, { available: boolean }>> => {
    const selectedDate = new Date(date);
    const startOfDay = selectedDate.toISOString().split('T')[0] + 'T00:00:00';
    const endOfDay = selectedDate.toISOString().split('T')[0] + 'T23:59:59';

    const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .gte('date', startOfDay)
        .lte('date', endOfDay);

    let availabilitiesArray = Array.from({ length: 22 }, (_, i) => {
        const hour = Math.floor(i / 2) + 10;
        const minutes = i % 2 === 0 ? '00' : '30';
        const timeSlot = `${hour}:${minutes}`;
        const available = !data?.some((booking: { date: string }) => {
            const bookingDate = new Date(booking.date);
            const bookingTime = `${bookingDate.getHours()}:${bookingDate.getMinutes() === 0 ? '00' : '30'}`;
            return bookingTime === timeSlot;
        });
        return { [`${hour}:${minutes}`]: { available } };
    });

    let availabilities = availabilitiesArray.reduce((acc, curr) => {
        return { ...acc, ...curr };
    }, {});

    if (error) {
        throw error;
    }
    return availabilities;
};