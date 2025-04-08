import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { StatusCodes } from "http-status-codes";
import { CampaignController } from "../controllers/CampaignController";
import { Messages } from "../utils/Messages";

export const mainRouter: APIGatewayProxyHandlerV2 = async (event, context) => {
  const method = event.requestContext.http.method;
  const path = event.rawPath;

  if (method === "POST" && path === "/campaigns") {
    console.log("Rota /campaigns chamada com método POST");
    return await CampaignController.send(event);
  }

  return {
    statusCode: StatusCodes.NOT_FOUND,
    body: JSON.stringify({ error: Messages.ROUTE_NOT_FOUND }),
  };
};
