import { APIGatewayProxyEventV2, APIGatewayProxyResult } from "aws-lambda";
import { StatusCodes } from "http-status-codes";
import { sendToSQS } from "../services/sqsService";
import { campaignSchema } from "../validations/campaignValidation";

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
        body: JSON.stringify({ message: "Campanha enviada com sucesso!" }),
      };
    } catch (err: any) {
      console.error("Erro capturado:", err);
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: JSON.stringify({
          error: err.errors || err.message || "Erro ao processar requisição.",
        }),
      };
    }
  },
};
