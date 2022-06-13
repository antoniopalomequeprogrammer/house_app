import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'
import PARAMS from "utils/PARAMS";
import Loader from "react-spinners/RingLoader";
import GridContainer from "components/Grid/GridContainer";
import Modal from "components/Modal/Modal";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ImageIcon from '@material-ui/icons/Image';
import GridItem from "components/Grid/GridItem";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export default function DropZone(props) {
  const { inputContent, multiple, inputWithFilesContent, show, preview, width } = props
  const [load, setLoad] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [maxFiles, setMaxFiles] = useState(0);
  const [files, setFiles] = useState(multiple ? [] : null);
  const [filePreview, setFilePreview] = useState(multiple ? [] : null);

  const [fileDelete, setFileDelete] = useState(null);
  const [indexDelete, setIndexDelete] = useState(null);

  /**
  *  Notas componente
  *
  *   No multiple -> filePreview (String) "base64"
  *               -> files (Array) 1 item
  *
  *   Multiple  -> filePreview (Array) [id] [path] [base64]
  *             -> files (Array)
  **/

  useEffect(() => {
    setLoad(true)
    let limit = props.maxFiles;
    if (props.initialFiles) {
      setFilePreview(props.initialFiles);
      limit -= props.initialFiles.length;
    }
    
    if (multiple) {
      setMaxFiles(limit)
    }
  }, []);

  useEffect(() => {
    props.onLoadImage(files);
  }, [files]);

  const Preview = ({ meta }) => {
    const { name, percent, status } = meta;
    return (
      <span style={{ alignSelf: 'flex-start', margin: '10px 3%', fontFamily: 'Helvetica' }}>
        {name}
      </span>
    )
  }

  const handleChangeStatus = async({ meta, file }, status) => {
    if (status == 'removed') {
      if (multiple) {
        var auxFiles = [...files];
        var auxPreview = [...filePreview];
        const index = auxPreview.indexOf(meta.previewUrl);
        if (index > -1) {
          auxPreview.splice(index, 1);
          auxFiles.splice(index, 1);
        }
        setFiles(auxFiles);
        setFilePreview(auxPreview);
      }else{
        setFiles(null);
        setFilePreview(null);
      }
    }
    if (status == 'done') {
      if (multiple) {
        setFiles([...files, file]);
        setFilePreview([...filePreview, meta.previewUrl]);
      }else{
        setFiles(file);
        setFilePreview(meta.previewUrl);
      }
    }
  }

  const borrarImagen = () => {
    props.onDelete(fileDelete['id'], fileDelete['path']);
    var auxPreview = [...filePreview];
    auxPreview.splice(indexDelete, 1);
    setFilePreview(auxPreview);
    setOpenConfirm(false);
  }

  const showImg = () => {

    return(<GridContainer style={{marginTop: 15, marginBottom: 15}}>
      {!multiple ? <>
        <GridItem xs={12} sm={12} md={12} style={{ marginTop: "20px", display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
          <img src={filePreview} width="400px"  style={{borderRadius: 10}}/>
        </GridItem>
      </> : <>
        {filePreview.map((element, index) => {
          return (<>
            {element['path'] ? <GridItem xs={2} sm={2} md={2} lg={2} style={{ marginTop: "20px", display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
              <HighlightOffIcon style={{position: 'absolute', top: 5, right: 18, color: 'red', cursor: 'pointer'}} onClick={() =>{
                setFileDelete(element);
                setIndexDelete(index);
                setOpenConfirm(true);
              }}/>
              <img src={element['base64']} width="100%" style={{borderRadius: 10}}/>
            </GridItem> : <></>}
          </>)
        })}
      </>}

    </GridContainer>)
  }

  return (
    <>
      {load ?
        <>{(filePreview && preview) && showImg()}</>
      :
        <Loader type={PARAMS.loaderType} color={PARAMS.firstColor} height={80} width={80} />
      }
      {!show ? <>
        <Dropzone
          // accept=".pdf"
          onChangeStatus={handleChangeStatus}
          PreviewComponent={Preview}
          styles={{ dropzone: { minHeight: 150 } }}
          submitButtonDisabled={true}
          inputWithFilesContent={inputWithFilesContent ? inputWithFilesContent : "Añadir archivos"}
          maxFiles={maxFiles ? maxFiles : 5}
          multiple={multiple ? multiple : false}
          inputContent={inputContent ? inputContent : <><ImageIcon/> Arrastre o haga click para agregar</>}
        />
      </> : <></>}
      <Modal
        open={openConfirm}
        onCancel={() => setOpenConfirm(false)}
        onConfirm={borrarImagen}
        confirmText="Confirmar"
        confirmIcon={<CheckCircleOutlineIcon style={{marginRight: '10px', color: '#fff'}} />}
        title="¿Seguro que deseas borrar esta imagen?"
        maxWidth="xs"
      />
    </>
  )
}
