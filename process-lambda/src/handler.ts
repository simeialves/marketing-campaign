import { SQSEvent } from "aws-lambda";

export const handler = async (event: SQSEvent): Promise<void> => {
  for (const record of event.Records) {
    const body = JSON.parse(record.body);

    const { title, emails, message } = body;

    console.log(`📣 Iniciando campanha: ${title}`);

    for (const email of emails) {
      console.log(`Enviando mensagem para: ${email}`);
      console.log(`Mensagem: ${message}`);
    }

    console.log(`Campanha "${title}" processada com sucesso.`);
  }
};
