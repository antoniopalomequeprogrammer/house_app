import React from "react";

// components
import Grid from "@material-ui/core/Grid";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import PARAMS from "utils/PARAMS";

// Icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import CodeIcon from "@material-ui/icons/Code";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import AddBoxIcon from "@material-ui/icons/AddBox";
export default function Actions(props) {
  const {
    show,
    onShow,
    edit,
    onEdit,
    del,
    discount,
    changePassword,
    onChangePassword,
    onDiscount,
    discountCode,
    onDiscountCode,
    onDelete,
    otros,
    add,
    onAdd,
    editPromocion,
    onEditPromocion,
  } = props;

  return (
    <Grid item>
      <ButtonGroup
        style={{ backgroundColor: PARAMS.firstColor, color: "#fff" }}
        aria-label="outlined primary button group"
      >
        {show && (
          <Button onClick={onShow} title="Mostrar">
            <VisibilityIcon style={{ color: "#fff" }} />
          </Button>
        )}
        {add && (
          <Button onClick={onAdd} title="Añadir">
            <AddBoxIcon style={{ color: "#fff" }} />
          </Button>
        )}
        {edit && (
          <Button onClick={onEdit} title="Editar">
            <EditIcon style={{ color: "#fff" }} />
          </Button>
        )}
        {discount && (
          <Button onClick={onDiscount} title="Descuento">
            <LocalAtmIcon style={{ color: "#fff" }} />
          </Button>
        )}
        {discountCode && (
          <Button onClick={onDiscountCode} title="Codigo Promocional">
            <CodeIcon style={{ color: "#fff" }} />
          </Button>
        )}
        {del && (
          <Button onClick={onDelete} title="Eliminar">
            <DeleteForeverIcon style={{ color: "#fff" }} />
          </Button>
        )}
        {changePassword && (
          <Button onClick={onChangePassword} title="Cambiar Contraseña">
            <LockOpenIcon style={{ color: "#fff" }} />
          </Button>
        )}

        {otros &&
          otros.map(function (elem) {
            return elem;
          })}
      </ButtonGroup>
    </Grid>
  );
}
