// SevenScale MVP - Configuração Supabase Isolada
const { createClient } = require('@supabase/supabase-js');

// Configuração MVP específica
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('MVP: Supabase credentials not found in environment variables');
}

// Cliente Supabase MVP
const supabase = createClient(supabaseUrl, supabaseKey);

// Funções específicas MVP
const mvpDatabase = {
  // Clientes MVP
  async getClients() {
    const { data, error } = await supabase
      .from('mvp_clients')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getClient(id) {
    const { data, error } = await supabase
      .from('mvp_clients')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async createClient(clientData) {
    const { data, error } = await supabase
      .from('mvp_clients')
      .insert([clientData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Insights MVP
  async getInsights(clientId) {
    const { data, error } = await supabase
      .from('mvp_agent_insights')
      .select('*')
      .eq('client_id', clientId)
      .order('processed_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async saveInsight(insightData) {
    const { data, error } = await supabase
      .from('mvp_agent_insights')
      .insert([insightData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Integrações MVP
  async getIntegrations(clientId) {
    const { data, error } = await supabase
      .from('mvp_client_integrations')
      .select('*')
      .eq('client_id', clientId);
    
    if (error) throw error;
    return data;
  },

  async updateIntegrationStatus(clientId, integrationType, status) {
    const { data, error } = await supabase
      .from('mvp_client_integrations')
      .upsert({
        client_id: clientId,
        integration_type: integrationType,
        status: status,
        last_sync: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Dashboard consolidado MVP
  async getDashboardData() {
    const { data, error } = await supabase
      .from('mvp_client_dashboard_view')
      .select('*');
    
    if (error) throw error;
    return data;
  }
};

module.exports = {
  supabase,
  mvpDatabase
};