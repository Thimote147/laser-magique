import { supabase } from "../supabase/client";

export const getActivities = async () => {
  const { data, error } = await supabase.from("activities").select("*");
  if (error) {
    throw error;
  }
  return data;
};