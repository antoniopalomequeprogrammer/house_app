import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { guardarVariable } from "utils/GlobalFunctions";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import UserParams from 'utils/UserParams';
import Select2 from 'react-select';
import CustomInput from "components/CustomInput/CustomInput.js";
import PARAMS from "utils/PARAMS";
import { withStyles } from '@material-ui/core/styles';

export default function Field(props) {
  const {
    type = "text",
    label = "",
    variable,
    respuesta = null,
    disabled = UserParams.getReadOnly(),
    setRespuesta,
    index = null,
    guardar = true,
    valorForce = '',
    options = null,
    error = false
  } = props

  const [trigger, setTrigger] = useState(false);

  //Si no llega valor correctamente lo ponemos vacio ("");
  let valor = "";
  if(respuesta){
    if(index != null){
      if(respuesta[variable][index-1]){
        if(respuesta[variable][index-1]['valor']){
          valor = respuesta[variable][index-1]['valor'];
        }else{
          valor = "";
        }
      }else{
        valor = "";
      }
    }else{
      valor = respuesta[variable] ? respuesta[variable] : '';
    }
  }else{
    valor = valorForce;
  }

  function fieldText(tipo){
    return(
      <CustomInput
        labelText={label}
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          value: valor,
          onChange: (event) => {
            event.persist();
            const { value } = event.target;
            if(guardar){
             guardarVariable(event,variable,value,index,props.id);
            }

            setRespuesta(value,variable);
          },
          readOnly: disabled,
        }}
        error={error && valor == ''}
        success={!error && valor != ''}
      />
    )
  }

  function fieldCheckBox(){
      const checkBoxStyles = theme => ({
        root: {
          '&$checked': {
            color: PARAMS.firstColor,
          },
        },
        checked: {},
      })

      const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);

      return (<FormGroup>
        <FormControlLabel
          control={<CustomCheckbox checked={(valor && valor.toString() =='1') ? true : false} />}
          label={label}
          disabled={disabled}
          onChange={ event => {
            event.persist();
            setTrigger(!trigger);
            setRespuesta(+event.target.checked,variable);

            if(guardar){
              guardarVariable(event,variable,event.target.checked,index,props.id);
            }
          }}
        />
      </FormGroup>
    )
  }

  function fieldSelect(){
    return (
      <Select2
        style={{marginTop: 15}}
        isDisabled={disabled}
        value={{'label': valor, 'value': valor}}
        onChange={(selectedOption) => {
          setTrigger(!trigger);
          setRespuesta(selectedOption.value,variable);

          if(guardar){
            guardarVariable(null, variable, selectedOption.value, index, props.id);
          }
        }}
        defaultValue=""
        options={options}
      />
    )
  }

  switch (type) {
    case "checkbox":
      return fieldCheckBox();
    case "select":
      return fieldSelect();
    default:
      return fieldText(type);
      break;
  }
}
