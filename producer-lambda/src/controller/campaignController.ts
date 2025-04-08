import { APIGatewayProxyEvent } from "aws-lambda";
import { validate } from "../middleware/validate";
import { campaignSchema } from "../schemas/campaignSchema";
import { sendToQueue } from "../services/sqsService";
import { errorResponse, successResponse } from "../utils/response";

export const createCampaign = async (event: APIGatewayProxyEvent) => {
  try {
    const body = await validate(campaignSchema, event);
    console.log("📦 Enviando campanha:", body);

    await sendToQueue(body);

    return successResponse({ message: "Campanha enviada com sucesso!" });
  } catch (err: any) {
    console.error("Erro ao criar campanha:", err);
    return errorResponse(err);
  }
};
