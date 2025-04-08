import { APIGatewayProxyEventV2, APIGatewayProxyResult } from "aws-lambda";
import { StatusCodes } from "http-status-codes";
import { campaignSchema } from "../schemas/campaignSchema";
import { sendToSQS } from "../services/sqsService";
import { Messages } from "../utils/Messages";

export const CampaignController = {
  send: async (
    event: APIGatewayProxyEventV2
  ): Promise<APIGatewayProxyResult> => {
    try {
      const body = JSON.parse(event.body || "{}");
      console.log("Body recebido:", body);

      await campaignSchema.validate(body, { abortEarly: false });

      const queueUrl = process.env.QUEUE_URL!;
      await sendToSQS(body, queueUrl);

      return {
        statusCode: StatusCodes.OK,
        body: JSON.stringify({ message: Messages.SUCCESS }),
      };
    } catch (err: any) {
      console.error(err);
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: JSON.stringify({
          error: err.errors || err.message || Messages.REQUEST_PROCESSING_ERROR,
        }),
      };
    }
  },
};
