import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class SupabaseService {

  private supabaseUrl = 'https://tddosrjtjolyqulwqqie.supabase.co';
  private supabaseKey = 'sb_publishable_ctDnIcNaZQvC644TYTZC7w_9g6XxE-X';

  supabase: SupabaseClient = createClient(this.supabaseUrl, this.supabaseKey);
}