import { SQSEvent } from "aws-lambda";
import { EmailService } from "./services/EmailService";

export const handler = async (event: SQSEvent): Promise<void> => {
  for (const record of event.Records) {
    const body = JSON.parse(record.body);

    await EmailService.sendCampaign(body);
  }
};
