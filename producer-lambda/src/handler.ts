// handler.ts
import { APIGatewayProxyHandler } from "aws-lambda";
import { SQS } from "aws-sdk";
import * as yup from "yup";

// Setup SQS
const sqs = new SQS();

// Validação com Yup
const campaignSchema = yup.object({
  title: yup.string().required(),
  message: yup.string().required(),
  emails: yup.array().of(yup.string().email()).required(),
});

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");

    // Validação do corpo
    await campaignSchema.validate(body, { abortEarly: false });

    // Enviar para SQS
    const queueUrl = process.env.QUEUE_URL!;
    const message = {
      MessageBody: JSON.stringify(body),
      QueueUrl: queueUrl,
    };

    await sqs.sendMessage(message).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Campanha enviada com sucesso!" }),
    };
  } catch (err: any) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: err.errors || "Erro ao processar requisição.",
      }),
    };
  }
};
