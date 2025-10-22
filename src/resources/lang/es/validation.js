/**
 * * Disallow template literal placeholder syntax in regular strings
 */
/* eslint-disable no-template-curly-in-string */
// import printValue from "yup/lib/util/printValue";

export let mixed = {
  default: "${path} es invalido",
  required: "${path} es un campo obligatorio",
  oneOf: "${path} debe ser uno de los siguientes valores: ${values}",
  notOneOf: "${path} no debe ser uno de los siguientes valores: ${values}",
  // notType: ({ path, type, value, originalValue }) => {
  //   let isCast = originalValue != null && originalValue !== value;
  //   let msg =
  //     `${path} debe ser de tipo \`${type}\` , ` +
  //     `pero el valor final fue: \`${printValue(value, true)}\`` +
  //     (isCast
  //       ? ` (emitido desde el valor \`${printValue(originalValue, true)}\`).`
  //       : ".");

  //   if (value === null) {
  //     msg += `\n Si "nulo" pretende ser un valor vacío, asegúrese de marcar el esquema como \`.nullable()\``;
  //   }

  //   return msg;
  // },
  notType: "${path} tiene un valor no valido",
  defined: "${path} debe ser definido",
};

export let string = {
  length: "${path} debe tener exactamente ${length} caracteres",
  min: "${path} debe tener al menos ${min} caracteres",
  max: "${path} debe tener como máximo  ${max} caracteres",
  matches: '${path} debe coincidir con lo siguiente: "${regex}"',
  email: "${path} debe ser un correo electrónico válido",
  url: "${path} debe ser una URL válida",
  trim: "${path} debe ser una cadena recortada",
  lowercase: "${path} debe ser una cadena en minúscula",
  uppercase: "${path} debe ser una cadena en mayúscula",
};

export let number = {
  min: "${path} debe ser mayor o igual que ${min}",
  max: "${path} debe ser menor o igual que ${max}",
  lessThan: "${path} debe ser menor que ${less}",
  moreThan: "${path} debe ser mayor que ${more}",
  notEqual: "${path} no debe ser igual a ${notEqual}",
  positive: "${path} debe ser un número positivo",
  negative: "${path} debe ser un número negativo",
  integer: "${path} debe ser un entero",
};

export let date = {
  min: "${path} debe ser posterior a${min}",
  max: "${path} debe ser anterior a ${max}",
};

export let boolean = {};

export let object = {
  noUnknown: "${path} tiene claves no especificadas: ${unknown}",
};

export let array = {
  min: "${path} debe tener al menos ${min} elementos",
  max: "${path} debe tener menos o igual que ${max} elementos",
};

let result = {
  mixed,
  string,
  number,
  date,
  object,
  array,
  boolean,
};

export default result;
