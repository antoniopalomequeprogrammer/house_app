import React  from 'react';
import GridContainer from "components/Grid/GridContainer";
import Loader from "react-spinners/RingLoader";
import PARAMS from "utils/PARAMS";

export default function CustomLoading(props) {

    const {size = 80, heightGrid = 300, widthGrid = "100%"} = props;

    return (
      <GridContainer style={{width: widthGrid, height: heightGrid}} direction="row"  alignItems="center" justify="center">
        <Loader color={PARAMS.firstColor} size={size} />
      </GridContainer>
    )
}
