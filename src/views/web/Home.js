import React from 'react'
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({

    contenedor:{
        width:"90%",
        maxWidth:"1280px",
        height:"500px",
        background:"#fff",
        padding:"10px",
        border:"10px solid #2C3E50",
        margin:"20px",
        display:"flex",
        flexDirection:"row",
        flexWrap: "wrap",
    },

    item:{
        width:"400px",
        height:"100px",
        background:"darkcyan",
        color:"#fff",
        textAlign:"center",
        fontFamily:"sans-serif",
        lineHeight:"100px",
        border:"2px solid"

    },

    item2:{
        width:"400px",
        height:"100px",
        background:"red",
        color:"#fff",
        textAlign:"center",
        fontFamily:"sans-serif",
        lineHeight:"100px",
        border:"2px solid"
    }

  }));


const Home = () => {
    const classes = useStyles();



    
    return (
        <div className={classes.contenedor}>
        <TextField
        onChange={ (e) => setSearch(e.target.value)}
        className={classes.item}
        id="standard-basic"
        label="Buscar por palabra clave"
        placeholder="Ejemplo: Piso en Córdoba"
        xs={10}
        sm={10}
        md={10}
        lg={10}
        xl={10}
      />
            <div class={classes.item}>#1</div>
            <div class={classes.item2}>#2</div>
            <div class={classes.item}>#3</div>
            <div class={classes.item}>#4</div>
            <div class={classes.item}>#1</div>
            <div class={classes.item2}>#2</div>
            <div class={classes.item}>#3</div>
            <div class={classes.item}>#4</div>
        </div>
    )
}

export default Home