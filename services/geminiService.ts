import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const askConcierge = async (question: string): Promise<string> => {
  const client = getClient();
  if (!client) {
    return "Desculpe, o sistema de Inteligência Artificial não está configurado (API Key ausente). Por favor, entre em contato via telefone.";
  }

  try {
    const model = client.models;
    const response = await model.generateContent({
      model: 'gemini-2.5-flash',
      contents: question,
      config: {
        systemInstruction: `Você é a "Assistente Virtual Cora", a concierge digital da Pousada Villa dos Corais, localizada em Subaúma, Bahia (Linha Verde).
        
        Contexto da Pousada:
        - 100m da praia, 150m do mar.
        - Ambiente paradisíaco, seguro, com câmeras.
        - 4 Suítes (3 padrão, 1 família com cozinha).
        - Café da manhã é opcional.
        - Não servimos almoço/jantar, mas indicamos restaurantes locais.
        
        Sua personalidade:
        - Calorosa, educada, solícita e com "sotaque" baiano leve (use termos como "meu rei", "axé", mas com moderação profissional).
        - Respostas curtas e diretas (máximo 3 parágrafos).
        
        Objetivo:
        - Tirar dúvidas sobre a pousada e a região (cachoeiras, praias).
        - Se perguntarem sobre disponibilidade exata, peça para verificarem o calendário no site.`,
      }
    });

    return response.text || "Desculpe, não consegui processar sua pergunta agora.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Tivemos um problema técnico. Por favor, tente novamente mais tarde.";
  }
};