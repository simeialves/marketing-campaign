import { SQS, config as awsConfig } from "aws-sdk";
import * as dotenv from "dotenv";

dotenv.config();

awsConfig.update({ region: process.env.AWS_REGION });

const sqs = new SQS();
const queueUrl = process.env.QUEUE_URL!;

export const sendToQueue = async (body: any) => {
  const message = {
    MessageBody: JSON.stringify(body),
    QueueUrl: queueUrl,
  };

  console.log("Mensagem a ser enviada ao SQS:", message);
  await sqs.sendMessage(message).promise();
};
