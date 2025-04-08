import { SQS } from "aws-sdk";

const sqs = new SQS();

export const sendToSQS = async (body: any, queueUrl: string) => {
  const message = {
    MessageBody: JSON.stringify(body),
    QueueUrl: queueUrl,
  };

  console.log("Mensagem a ser enviada ao SQS:", message);

  await sqs.sendMessage(message).promise();

  console.log("Mensagem enviada com sucesso ao SQS");
};
