import { APIGatewayProxyEvent } from "aws-lambda";
import { AnySchema } from "yup";

export const validate = async (
  schema: AnySchema,
  event: APIGatewayProxyEvent
) => {
  const body = JSON.parse(event.body || "{}");
  await schema.validate(body, { abortEarly: false });
  return body;
};
