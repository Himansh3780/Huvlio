import { createClient } from '@supabase/supabase-js';

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Client-side Supabase instance (for browser)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase instance (for API routes)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Helper functions for database operations
export const getUserById = async (userId) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) console.error('Error fetching user:', error);
  return data;
};

export const getUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();
  
  if (error) console.error('Error fetching user:', error);
  return data;
};

export const getUserSubscription = async (userId) => {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error) console.error('Error fetching subscription:', error);
  return data;
};

export const getUserDownloadCount = async (userId) => {
  const { data, error } = await supabase
    .from('downloads')
    .select('downloads_this_month')
    .eq('user_id', userId)
    .single();
  
  if (error) console.error('Error fetching download count:', error);
  return data?.downloads_this_month || 0;
};

export const addPayment = async (paymentData) => {
  const { data, error } = await supabase
    .from('payments')
    .insert([paymentData]);
  
  if (error) console.error('Error adding payment:', error);
  return data;
};

export const addDownload = async (userId, documentType) => {
  const { data, error } = await supabase
    .from('downloads')
    .insert([
      {
        user_id: userId,
        document_type: documentType,
        downloads_this_month: 1
      }
    ]);
  
  if (error) console.error('Error adding download:', error);
  return data;
};
