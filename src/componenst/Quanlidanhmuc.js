import { useState, useEffect } from 'react';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import edit from './img/edit.png'
import lammoi from './img/lammoi.png'
import axios from 'axios';
import xoa from "./img/xoa.png"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function Quanlidanhmuc({hangsx,setHangsx,urlhangsx}){
    const [clickedRow, setClickedRow] = useState(-1);
    const [fromdata, setFromdata]  = useState({
        id: '',
        tenhang: '',
    })
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFromdata({
          ...fromdata,
          [name]: value,
        });
      }
      const onClickHandler = (event, value, index) => {
        setClickedRow(index);
        setFromdata(value);
        console.log(value)
      }
      const btnResetOnClick = function (event) {
        event.preventDefault();
        setFromdata({
            id: '',
            tenhang: '',
        });
        setClickedRow(-1);
      }
      const createHangSxApi = (data) => {
        axios({
          method: 'POST',
          url: urlhangsx,
          data: data,
        }).then(
          (response) => {
            const { data } = response;
            setHangsx([
              ...hangsx,
              data
            ]);
            setFromdata({
              id: '',
              tenhang: '',
            });
          }
        )
        .catch((error) => {
          console.log(error.response);
        });
      }

      const onSubmitHandler = (event) => {
        event.preventDefault();
        if (clickedRow === -1) {
          createHangSxApi(fromdata);
        } else {
          // Update: updateProductApi()
          updateHangSxApi(fromdata, clickedRow, hangsx[clickedRow].id);
        }
      }

      const updateHangSxApi = (data, updateRow, id) => {
        const urlUp = urlhangsx+ '/' + id;
        axios({
          method: "PUT",
          data: data,
          url: urlUp,
        }).then((response) => {
          const { data } = response;
          setHangsx((oldState) => {
            let newState = oldState.map((value, index) => {
              return index === updateRow ? data : value;
            });
            return newState;
          });
        }).catch((error) => {
          console.log('error', error.response)
        });
      }

      const btnDeleteOnClick = (event, index, deleteId) => {
        event.stopPropagation();
        const urlDe = urlhangsx+ '/'+ deleteId;
        axios({
          method: 'DELETE',
          url: urlDe
        }).then((response) => {
          if (response.status == 200) {
            
            setHangsx((oldState) => {
              let newState = oldState.filter((val, idx) => {
                return idx != index;
              });
    
              return newState;
            });
          }
          handleClose();
          setFromdata({
            id: '',
            tenhang: '',
          });
        }).catch((error) => {
          console.log(error, error.response)
        });
      }
      const [open, setOpen] = React.useState(false);
    
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    return(
        <div>
            <div className="form-group shadow">
                <TextField helperText=""
                        label="Id hãng sản xuất"
                        name="id"
                        id="margin-none"
                        value={fromdata.id}
                        onChange={onChangeHandler}
                        style={{ margin: 15 }}
                    />
                <TextField
                        helperText=""
                        label="Tên hãng sản xuất"
                        name="tenhang"
                        id="margin-none"
                        value={fromdata.tenhang}
                        onChange={onChangeHandler}
                        style={{ margin: 15 }}
                    />
            </div>
            <div className="d-flex flex-wrap m-4">
                <Button  className="m-3" variant="contained" color="primary"
                    onClick={onSubmitHandler}
                >
                    <img src={edit} width="30"/>
                </Button>
                <Button className="m-3" variant="contained" color="secondary" onClick={btnResetOnClick}>
                     <img src={lammoi} width="30"/>
                </Button>
            </div>
            <div className="mx-auto w-50 shadow">
                <TableContainer >
                    <Table  aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Id Hãng</TableCell>
                            <TableCell >Tên hãng</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {hangsx.map((value, index) => (
                            <TableRow 
                                onClick={
                                    (event) => {
                                    return onClickHandler(event, value, index);
                                    }
                                }
                            >
                            <TableCell >{value.id} </TableCell>
                            <TableCell >{value.tenhang}</TableCell>
                            <TableCell >
                              <Button onClick={handleClickOpen}>
                                  <img src={xoa} height="30"/>
                              </Button>
                              <Dialog
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                      >
                                        <DialogTitle id="alert-dialog-title">{"Bạn xác nhận muốn xóa?"}</DialogTitle>
                                        <DialogContent>
                                          <DialogContentText id="alert-dialog-description">
                                            Sau khi xóa sẽ không thể khôi phục lại dữ liệu! Bạn vẫn muốn xóa
                                          </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                          <Button 
                                          onClick={ (event) => {
                                            btnDeleteOnClick(event, index, value.id)
                                            } }
                                          color="primary">
                                            Đồng ý
                                          </Button>
                                          <Button onClick={handleClose} color="primary" autoFocus>
                                            Thoát
                                          </Button>
                                        </DialogActions>
                                      </Dialog>
                            </TableCell>
                            </TableRow>
                            
                        ))}
                        </TableBody>
                                    
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}
export default Quanlidanhmuc;