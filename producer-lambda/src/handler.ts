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

    console.log("Body recebido:", body);

    // Validação do corpo
    await campaignSchema.validate(body, { abortEarly: false });

    const queueUrl = process.env.QUEUE_URL!;
    console.log("QUEUE_URL carregada:", queueUrl);

    const message = {
      MessageBody: JSON.stringify(body),
      QueueUrl: queueUrl,
    };

    console.log("Mensagem a ser enviada ao SQS:", message);

    await sqs.sendMessage(message).promise();

    console.log("Mensagem enviada com sucesso ao SQS");

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Campanha enviada com sucesso!" }),
    };
  } catch (err: any) {
    console.error("Erro capturado:", err);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: err.errors || err.message || "Erro ao processar requisição.",
      }),
    };
  }
};
