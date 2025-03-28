
import { supabase } from "../../supabase/client";
import { User } from "../../types/user";
import { toCurrency, toHours, toMinutes } from "../../utils/functions";

const addHour = async (user: User, hour: string, newValue: boolean) => {
    if (newValue) {
        try {
            const { data, error } = await supabase
                .from('hours')
                .insert([
                    { user_id: user.user_id, date: hour.split("T")[0], beginning: hour.split("T")[1] }
                ])
            if (error) throw error
            return data
        } catch (error) {
            console.error('error', error)
        }
    } else {
        try {
            const { data, error } = await supabase
                .from('hours')
                .update({ ending: hour.split("T")[1].replace("h", ":"), nbr_hours: toHours(toMinutes(hour.split("T")[1]) - toMinutes(user.hours[0].beginning)).replace("h", ":"), amount: toCurrency(toHours(toMinutes(hour.split("T")[1]) - toMinutes(user.hours[0].beginning)), user.hourly_rate ?? 0) })
                .eq('hour_id', user.hours[0].hour_id)
                .eq('date', hour.split("T")[0])
            if (error) throw error
            return data
        } catch (error) {
            console.error('error', error)
        }
    }
}

const deleteHour = async (hourId: number) => {
    try {
        const { data, error } = await supabase
            .from('hours')
            .delete()
            .eq('hour_id', hourId)
        if (error) throw error
        return data
    } catch (error) {
        console.error('error', error)
    }
}

export { addHour, deleteHour };