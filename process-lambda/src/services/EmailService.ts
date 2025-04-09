interface CampaignData {
  title: string;
  emails: string[];
  message: string;
}

export const EmailService = {
  sendCampaign: async ({
    title,
    emails,
    message,
  }: CampaignData): Promise<void> => {
    console.log(`Iniciando campanha: ${title}`);

    await Promise.all(
      emails.map(async (email) => {
        try {
          console.log(`Enviando mensagem para: ${email}`);
          console.log(`Mensagem: ${message}`);
        } catch (err) {
          console.error(`Erro ao enviar para ${email}:`, err);
        }
      })
    );

    console.log(`Campanha "${title}" processada com sucesso.`);
  },
};
