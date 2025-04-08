import * as yup from "yup";

export const campaignSchema = yup.object({
  title: yup.string().required(),
  message: yup.string().required(),
  emails: yup.array().of(yup.string().email()).required(),
});
