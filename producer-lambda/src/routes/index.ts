import { APIGatewayProxyHandlerV2 } from "aws-lambda";

import { StatusCodes } from "http-status-codes";
import { CampaignController } from "../controllers/CampaignController";

export const mainRouter: APIGatewayProxyHandlerV2 = async (event, context) => {
  console.log("event:", JSON.stringify(event, null, 2));

  const method = event.requestContext.http.method;
  const path = event.rawPath;

  if (method === "POST" && path === "/campaigns") {
    console.log("Rota /campaigns chamada com método POST |o/");
    return await CampaignController.send(event);
  }

  return {
    statusCode: StatusCodes.NOT_FOUND,
    body: JSON.stringify({ error: "Rota não encontrada" }),
  };
};
