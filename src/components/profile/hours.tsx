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
            throw error
        }
    } else {
        if (!user.hours || user.hours.length === 0) {
            console.error("Aucune heure trouvée pour cet utilisateur")
            return null
        }
        
        try {
            const currentDate = hour.split("T")[0]
            
            const hourEntry = user.hours.find(h => 
                h.date === currentDate && !h.ending
            )
            
            if (!hourEntry) {
                console.error("Aucune entrée d'heure sans fin trouvée pour cette date")
                return null
            }
                        
            const endTime = hour.split("T")[1].replace("h", ":")
            const beginTime = hourEntry.beginning
            const minutesWorked = toMinutes(endTime) - toMinutes(beginTime)
            const hoursWorked = toHours(minutesWorked).replace("h", ":")
            const amount = toCurrency(toHours(minutesWorked), user.hourly_rate ?? 0)
            
            const { data, error } = await supabase
                .from('hours')
                .update({ 
                    ending: endTime, 
                    nbr_hours: hoursWorked, 
                    amount: amount 
                })
                .eq('hour_id', hourEntry.hour_id)
                .eq('date', currentDate)
            
            if (error) throw error
            console.log("Mise à jour réussie:", data)
            return data
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error)
            throw error
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