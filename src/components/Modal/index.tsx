import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React, {useState, useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { atualizarState, buscarRecadosId, deleteRecado, getRecadosArquivados, getRecadosUser, updateRecado } from '../../store/modules/recados/recadosSlice';
import { RecadoData } from '../../store/modules/typeStore';



type ModalMode = 'editarRecado' | 'deletarRecado' | 'arquivarRecado' | 'desarquivarRecado'

interface ModalProps {
    open: boolean;
    handleClose: () => void;
    id: string;
    mode: ModalMode;
}

export function ModalAttDel({ open, handleClose, id, mode}: ModalProps) {
    const [description, setDescription] = useState('');
    const [detail, setDetail] = useState('');
            
    const respostaRecados = useAppSelector((state) => state.recados)
    const recado = useAppSelector((state) => buscarRecadosId(state, id));
    const dispatch = useAppDispatch();

    const userLoggeID = () => {
        return JSON.parse(localStorage.getItem('userLoggedId') || "")
      }

    const userID = userLoggeID()

    useEffect(() => {
        if(recado){
            setDescription(recado.description);
            setDetail(recado.detail);
        }
    }, [recado])

    const handleConfirm = () => {

        if(mode === 'deletarRecado'){
            const infoRecado: RecadoData = {
                idUser: userID,
                idRecado: recado!.id,
                description: recado!.description,
                detail: recado!.detail,
                check: recado!.check
            }
            dispatch(deleteRecado(infoRecado));
        }

        if(mode === 'editarRecado'){
            
            if(description === '' || detail === ''){
                alert('Campos vazios não são permitidos')
                return 
            }

            const infoRecado: RecadoData = {
                idUser: userID,
                idRecado: recado!.id,
                description: description,
                detail: detail,
                check: recado!.check
            }
            dispatch(updateRecado(infoRecado))
        }

        if(mode === 'arquivarRecado'){
            const infoRecado: RecadoData = {
                idUser: userID,
                idRecado: recado!.id,
                description: recado!.description,
                detail: recado!.detail,
                check: true,
            }
            dispatch(updateRecado(infoRecado)) 
            .then(()=> {                
                dispatch(getRecadosUser(userID))
            })
        }        

        if(mode === 'desarquivarRecado'){
            const infoRecado: RecadoData = {
                idUser: userID,
                idRecado: recado!.id,
                description: recado!.description,
                detail: recado!.detail,
                check: false,
            } 
                dispatch(updateRecado(infoRecado))
                .then(()=> {                
                    dispatch(getRecadosArquivados(userID))
                })
            
        }
        
        handleClose();
    }


    return (
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            {mode === 'deletarRecado' && (
                <React.Fragment>
                    <DialogTitle id="alert-dialog-title">
                        {`Tem certeza que deseja excluir o recado?`}
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        Ao confirmar esta ação não poderá ser desfeita.
                        </DialogContentText>
            </DialogContent>
                </React.Fragment>
            )}

            {mode === 'arquivarRecado' && (
                <React.Fragment>
                    <DialogTitle id="alert-dialog-title">
                        {`Tem certeza que deseja arquivar o recado?`}
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        
                        </DialogContentText>
            </DialogContent>
                </React.Fragment>
            )}

            {mode === 'desarquivarRecado' && (
                <React.Fragment>
                    <DialogTitle id="alert-dialog-title">
                        {`Tem certeza que deseja desarquivar o recado?`}
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        
                        </DialogContentText>
            </DialogContent>
                </React.Fragment>
            )}


            {mode === 'editarRecado' && (
                <React.Fragment>
                <DialogTitle id="alert-dialog-title">
                    {`EDITAR RECADO`}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    </DialogContentText>
                    <>
                        <TextField value={description} name='description' fullWidth sx={{marginTop:"10px"}}label='Descrição' onChange={(ev) => setDescription(ev.target.value)}/>
                        <TextField value={detail} name='detail' label='Detalhamento' fullWidth sx={{marginTop:"10px"}} onChange={(ev) => setDetail(ev.target.value)} />
                    
                    </>
                </DialogContent>
            </React.Fragment>
            )}

            <DialogActions>
                <Button onClick={handleClose} autoFocus color='error' variant='outlined'>
                    Cancelar
                </Button>
                <Button onClick={handleConfirm} color='info' variant='contained'>Confirmo</Button>
            </DialogActions>
        </Dialog>
    )
}
