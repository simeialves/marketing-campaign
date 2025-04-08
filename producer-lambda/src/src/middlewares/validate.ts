import { APIGatewayProxyEvent } from "aws-lambda";
import { AnyObjectSchema } from "yup";

export const validate = async (
  event: APIGatewayProxyEvent,
  schema: AnyObjectSchema
) => {
  const body = JSON.parse(event.body || "{}");
  await schema.validate(body, { abortEarly: false });
  return body;
};
