import Moment from "moment";

var DNI_REGEX = /^(\d{8})([A-Z])$/;
var CIF_REGEX = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;
var NIE_REGEX = /^[XYZ]\d{7,8}[A-Z]$/;

function CustomException(message, field) {
  this.message = message;
  this.field = field;
}

// Validación de un dato específico
export function check(type, value, field) {
  var error = [];
  error["status"] = true;
  var field = "";

  try {
    validate(type, value, field);
    return error;
  } catch (e) {
    error["message"] = e.message;
    error["field"] = e.field;
    error["status"] = false;
    return error;
  }
}

// Validación de las keys de un objeto, la variable `validacion` es una replica del objeto solo con las
//keys a validar y valor igual al tipo de validación
export function checkObject(validacion, data) {
  // (validacion, data)
  var error = [];
  error["status"] = true;
  var field = "";

  try {
    for (var key of Object.keys(validacion)) {
      validate(validacion[key].type, data[key], validacion[key].field);
    }
    return error;
  } catch (e) {
    error["message"] = e.message;
    error["field"] = e.field;
    error["status"] = false;
    // (error)
    return error;
  }
}

export function validate(type, value, field) {
  var res = null;

  switch (type) {
    case "NULL":
      validadorNull(value, field);
      break;
    case "ZERO":
      validadorZero(value, field);
      break;
    case "SELECTOR":
      validadorSelector(value, field);
      break;
    case "DATE":
      validadorDate(value, field);
      break;
    case "CIF":
      res = validCIF(value);
      if (!res) {
        throw new CustomException(
          `El campo ${field} no es un CIF válido`,
          field
        );
      }
      break;
    case "NIF":
      res = validDNI(value);
      if (!res) {
        res = validNIE(value);
        if (!res) {
          throw new CustomException(
            `El campo ${field} no es un NIF válido`,
            field
          );
        }
      }
      break;
    case "EMAIL":
      validadorEmail(value, field);
      break;
    case "INTEGER":
      validadorInteger(value, field);
      break;
    case "FLOAT":
      validadorFloat(value, field);
      break;
    case "PHONE":
      validadorPhone(value,field);
    default:
  }
}

function validadorNull(value, key) {
  if (value === "" || value === null || value === []) {
    throw new CustomException(`El campo ${key} no puede estar vacio`, key);
  }
}

function validadorZero(value, key) {
  if (value === "" || value === null || value === 0 || value === "0") {
    throw new CustomException(`El campo ${key} no puede ser 0`, key);
  }
}

function validadorSelector(value, key) {
  if (value === "" || value === null || value === []) {
    throw new CustomException(`El selector ${key} no puede estar vacio`, key);
  }
}

function validadorInteger(value, key) {
  if (value !== parseInt(value, 10)) {
    throw new CustomException(`El campo ${key} debe ser un número`, key);
  }
}

function validadorFloat(value, key) {
  if (!/^-?\d*(\.\d+)?$/.test(value)) {
    throw new CustomException(`El campo ${key} debe ser un número`, key);
  }
}

function validadorDate(value, key) {
  if (value === "" || value === null) {
    throw new CustomException(`El campo ${key} no puede estar vacio`, key);
  }
  var date = Moment(value);
  if (date.isValid()) {
    return true;
  }
  throw new CustomException(`El campo ${key} no es una fecha válida`, key);
}

function validadorEmail(value, key) {
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
    throw new CustomException(`El campo ${key} no es un email válido`, key);
  }
}

function validadorPhone(value, key) {
  if (!/([0-9]){9}/.test(value)) {
    throw new CustomException(`El campo ${key} no es un teléfono válido`, key);
  }
}

var validDNI = function (dni) {
  var dni_letters = "TRWAGMYFPDXBNJZSQVHLCKE";
  var letter = dni_letters.charAt(parseInt(dni, 10) % 23);

  return letter == dni.charAt(8);
};

var validNIE = function (nie) {
  // Change the initial letter for the corresponding number and validate as DNI
  var nie_prefix = nie.charAt(0);

  switch (nie_prefix) {
    case "X":
      nie_prefix = 0;
      break;
    case "Y":
      nie_prefix = 1;
      break;
    case "Z":
      nie_prefix = 2;
      break;
  }

  return validDNI(nie_prefix + nie.substr(1));
};

var validCIF = function (cif) {
  var match = cif.match(CIF_REGEX);
  if (match) {
    var letter = match[1],
      number = match[2],
      control = match[3];

    var even_sum = 0;
    var odd_sum = 0;
    var n;

    for (var i = 0; i < number.length; i++) {
      n = parseInt(number[i], 10);

      // Odd positions (Even index equals to odd position. i=0 equals first position)
      if (i % 2 === 0) {
        // Odd positions are multiplied first.
        n *= 2;

        // If the multiplication is bigger than 10 we need to adjust
        odd_sum += n < 10 ? n : n - 9;

        // Even positions
        // Just sum them
      } else {
        even_sum += n;
      }
    }

    var control_digit = 10 - (even_sum + odd_sum).toString().substr(-1);
    var control_letter = "JABCDEFGHI".substr(control_digit, 1);

    // Control must be a digit
    if (letter.match(/[ABEH]/)) {
      return control == control_digit;

      // Control must be a letter
    } else if (letter.match(/[KPQS]/)) {
      return control == control_letter;

      // Can be either
    } else {
      return control == control_digit || control == control_letter;
    }
  } else {
    return false;
  }
};
