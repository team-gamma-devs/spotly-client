
import { supabase } from "$lib/services/supabaseClient";

export async function load() {
  const { data } = await supabase.from("countries").select();
  return {
    countries: data ?? [],
  };
}
