import * as Yup from "yup";

import localeES from "../resources/lang/es/validation";
import moment from "moment";

Yup.setLocale(localeES);

Yup.addMethod(Yup.array, "unique", function (message, mapper = (a) => a) {
  return this.test("unique", message, (list) => {
    return list.length === new Set(list.map(mapper)).size;
  });
});

Yup.addMethod(Yup.mixed, "validDateFormat", function (errorMessage) {
  return this.test("DateInvalidDate", errorMessage, function (value) {
    if (value === null) {
      return true;
    }

    if (!(value instanceof moment)) {
      return true;
    }

    return value.isValid();
  });
});

Yup.addMethod(Yup.mixed, "minDateMessage", function (errorMessage) {
  return this.test("DateInvalidDate", errorMessage, function (value) {
    if (value === null) {
      return true;
    }
    if (!(value instanceof moment)) {
      return true;
    }
    if (value.isValid()) {
      return value.isSameOrAfter(moment("01-01-1900", "DD-MM-YYYY"), "date");
    }

    return true;
  });
});

export default Yup;
