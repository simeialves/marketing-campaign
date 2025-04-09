interface CampaignData {
  title: string;
  emails: string[];
  message: string;
}

const retry = async (
  fn: () => Promise<void>,
  retries: number = 3,
  delay: number = 1000
): Promise<void> => {
  for (let i = 0; i < retries; i++) {
    try {
      await fn();
      return;
    } catch (error) {
      console.warn(`Tentativa ${i + 1} falhou.`, error);
      if (i < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  throw new Error(`Falha após ${retries} tentativas.`);
};

export const EmailService = {
  sendCampaign: async ({
    title,
    emails,
    message,
  }: CampaignData): Promise<void> => {
    console.log(`Iniciando campanha: ${title}`);

    await Promise.all(
      emails.map(async (email) => {
        await retry(
          async () => {
            console.log(`Enviando mensagem para: ${email}`);
            console.log(`Mensagem: ${message}`);
          },
          3,
          1000
        );
      })
    );

    console.log(`Campanha "${title}" processada com sucesso.`);
  },
};
