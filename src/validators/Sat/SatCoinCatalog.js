import Yup from "../YupLocale";

export const ValidateSatCoinCatalog = Yup.object({
  CodeSatCoinCatalog: Yup.string().label("código").max(20).required(),
  Description: Yup.string().label("descripción").max(200).required(),
  Decimals: Yup.number().label("decimales").integer().moreThan(0).required(),
});