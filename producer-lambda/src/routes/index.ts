import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { createCampaign } from "../controller/campaignController";

export const router = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const normalizedPath = event.path
    ?.replace(/^\/(dev|prod|v1)/, "")
    .toLowerCase();

  console.log("HTTP METHOD:", event.httpMethod);
  console.log("PATH:", normalizedPath);
  console.log("EVENT COMPLETO:", JSON.stringify(event, null, 2));

  if (event.httpMethod === "POST" && normalizedPath === "/campaigns") {
    return await createCampaign(event);
  }

  return {
    statusCode: 404,
    body: JSON.stringify({ message: "Rota não encontrada." }),
  };
};
