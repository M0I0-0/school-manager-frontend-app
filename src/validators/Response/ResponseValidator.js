import Yup from "../YupLocale";

export const ValidateResponse = Yup.object({
  data: Yup.object({
    Records: Yup.array(),
    Code: Yup.string().oneOf(["999"]),
  }).required(),
});

export const ValidateUpdateResponse = Yup.object({
  Code: Yup.string().oneOf(["999"]).required(),
});

export const ValidateCreateResponse = Yup.object({
  Code: Yup.string().oneOf(["999"]).required(),
});
