// SevenScale MVP - Configuração GPT-4 Isolada
const OpenAI = require('openai');

// Configuração GPT-4 MVP
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Verificar se API key existe
if (!process.env.OPENAI_API_KEY) {
  throw new Error('MVP: OpenAI API key not found in environment variables');
}

// Prompt especializado MVP para setor médico
const MVP_SYSTEM_PROMPT = `
Você é o Agente Consolidador da SevenScale, especialista em growth marketing médico.

Análise dados de clínicas médicas e gere insights ACIONÁVEIS focando em:

🎯 ESPECIALIDADES MÉDICAS:
- Cardiologia: foco em prevenção, exames, emergências
- Dermatologia: procedimentos estéticos, tratamentos, skincare
- Clínica Geral: check-ups, consultas preventivas, família
- Pediatria: vacinação, acompanhamento, pais ansiosos
- Oftalmologia: exames, cirurgias, lentes de contato
- Ortopedia: lesões esportivas, dores crônicas, cirurgias

📊 MÉTRICAS CRÍTICAS:
- Taxa de conversão (meta: >15%)
- CPA (Custo por Agendamento)
- ROI campanhas (meta: >200%)
- Taxa de cancelamento (<10%)
- Ocupação agenda (meta: >80%)
- NPS pacientes (meta: >8.0)

🚀 GERE SEMPRE:
1. 3-5 insights específicos da especialidade
2. Action items implementáveis imediatamente
3. Análise ROI com números exatos
4. Alertas críticos se houver problemas
5. Recomendações de otimização

Responda sempre em JSON estruturado. Seja direto, específico e acionável.
`;

// Função principal MVP para gerar insights
async function generateMVPInsights(consolidatedData) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: MVP_SYSTEM_PROMPT
        },
        {
          role: "user",
          content: JSON.stringify(consolidatedData)
        }
      ],
      max_tokens: 2000,
      temperature: 0.7
    });

    const insightsText = response.choices[0].message.content;
    return JSON.parse(insightsText);
  } catch (error) {
    console.error('MVP GPT-4 Error:', error);
    throw new Error('Falha ao gerar insights MVP: ' + error.message);
  }
}

// Função para testar conexão GPT-4
async function testGPT4Connection() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "user",
        content: "Responda apenas: MVP SevenScale funcionando"
      }],
      max_tokens: 10
    });
    
    return response.choices[0].message.content;
  } catch (error) {
    throw new Error('Conexão GPT-4 MVP falhou: ' + error.message);
  }
}

module.exports = {
  openai,
  generateMVPInsights,
  testGPT4Connection,
  MVP_SYSTEM_PROMPT
};