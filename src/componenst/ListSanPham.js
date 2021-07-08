import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useState, useEffect } from 'react';
import xoa from "./img/xoa.png"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import edit from './img/edit.png'
import lammoi from './img/lammoi.png'

function ListSanPham(){
    const urlhangsx = 'https://600e393f3bb1d100179de8df.mockapi.io/hangsx';

    const [sanpham, setSanpham] = useState([]);

    const [hangsx, setHangsx] = useState([]);
    const [hangsxid, setHangsxId] = useState(1);
    
    const [clickedRow, setClickedRow] = useState(-1);
    const [formData, setFormData] = useState({
      id: '',
      hangsxId: '',
      ten: '',
      gia: '',
      loaisp: '',
      hangsx:'',
      hinhanh:'',
    });

    const createProductApi = (data) => {
      const urlCR = urlhangsx+ '/'+ hangsxid+"/producst";

      axios({
        method: 'POST',
        url: urlCR,
        data: data,
      }).then(
        (response) => {
          const { data } = response;
          setSanpham([
            ...sanpham,
            data
          ]);
          setFormData({
            id: '',
            hangsxId: '',
            ten: '',
            gia: '',
            loaisp: '',
            hangsx:'',
            hinhanh:'',
          });
        }
      )
      .catch((error) => {
        console.log(error.response);
      });
    }

    const updateProductApi = (data, updateRow, id) => {
      const urlUp = urlhangsx+ '/'+ hangsxid+"/producst/" + id;
      axios({
        method: "PUT",
        data: data,
        url: urlUp,
      }).then((response) => {
        const { data } = response;
        setSanpham((oldState) => {
          let newState = oldState.map((value, index) => {
            return index === updateRow ? data : value;
          });
          return newState;
        });
      }).catch((error) => {
        console.log('error', error.response)
      });
    }

    const onSubmitHandler = (event) => {
      event.preventDefault();
      if (clickedRow === -1) {
        createProductApi(formData);
      } else {
        // Update: updateProductApi()
        updateProductApi(formData, clickedRow, sanpham[clickedRow].id);
      }
    }

    const btnDeleteOnClick = (event, index, deleteId) => {
      event.stopPropagation();
      const urlDe = urlhangsx+ '/'+ hangsxid+"/producst/" + deleteId;
      axios({
        method: 'DELETE',
        url: urlDe
      }).then((response) => {
        if (response.status == 200) {
          
          setSanpham((oldState) => {
            let newState = oldState.filter((val, idx) => {
              return idx != index;
            });
  
            return newState;
          });
        }
        handleClose();
      }).catch((error) => {
        console.log(error, error.response)
      });
    }

    useEffect(() => {
      
      axios.get(urlhangsx)
        .then(function(response){
          const {data} = response;
          setHangsx(data);
        })
        .catch((error) => {
          console.log("lỗi" +error);
        });
    }, []);

    
    


    const [page, setPage] = useState(1);
    const limit = 10;
    useEffect(()=>{
      if(setHangsxId==-1){
        return;
      }
      const url1 = urlhangsx+ '/'+ hangsxid+"/producst?limit="+limit+"&page="+page;
      axios({
        method: "GET",
        url: url1,
      }).then((response)=>{
        const {data} = response;
        setSanpham(data)
      })
      .catch((error)=>{
        console.log(error)
      })
    },[page,hangsxid])

    const listHangsx = function(event,value) {
      setHangsxId(value.id)
    }

    const btnResetOnClick = function (event) {
      event.preventDefault();
      setFormData({
            id: '',
            ten: '',
            gia: '',
            loaisp: '',
            hangsx:'',
            hinhanh:'',
      });
  
      setClickedRow(-1);
    }

    const onClickHandler = (event, value, index) => {
      setClickedRow(index);
      setFormData(value);
    }

    
    

    const onChangeHandler = (event) => {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value,
        
      });
    }

  
    const trangTruoc = function () {
      if (page === 1) {
        return ;
      }
  
      setPage(page -1);
    }
  
    const trangSau = function () {
      setPage(page + 1);
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
            <form >
                <div className="form-group ">
                  <h2>Danh sách sản phẩm</h2>
                  <TextField
                      label="ID"
                      name="id"
                      id="margin-none"
                      defaultValue=""
                      onChange={onChangeHandler}
                      value={formData.id}
                      style={{ margin: 15, width: 50}}
                  />
                  <TextField
                      label="Tên sản phẩm"
                      name="ten"
                      id="margin-none"
                      onChange={onChangeHandler}
                      value={formData.ten}
                      style={{ margin: 15 }}
                  />
                  <TextField
                      label="Giá sản phẩm"
                      name="gia"
                      id="margin-none"
                      onChange={onChangeHandler}
                      value={formData.gia}
                      style={{ margin: 15 }}
                  />
                  <TextField
                      label="hãng sản xuất"
                      name="hangsx"
                      id="margin-none"
                      onChange={onChangeHandler}
                      value={formData.hangsx}
                      style={{ margin: 15 }}
                  />
                  
                  <TextField
                      label="Loại sản phẩm"
                      name="loaisp"
                      id="margin-none"
                      onChange={onChangeHandler}
                      value={formData.loaisp}
                      style={{ margin: 15 }}
                  />
                  {/* <TextField
                      label="ID hãng sản xuất"
                      name="hangsxId"
                      id="margin-none"
                      onChange={onChangeHandler}
                      value={formData.hangsxId}
                      variant="filled"
                      style={{ margin: 15 }}
                  /> */}
                  <TextField
                      label="Link hình ảnh"
                      name="hinhanh"
                      id="margin-none"
                      onChange={onChangeHandler}
                      value={formData.hinhanh}
                      style={{ margin: 15 }}
                  />
                  <div>
                    <Button className="shadow"
                      style={{ marginTop: '20px' }}
                      type="submit"
                      color="primary"
                      onClick={onSubmitHandler} >
                        <img src={edit} width="30"/>
                    </Button>
                    
                    <Button className="shadow"
                      onClick={btnResetOnClick}
                      style={{ marginTop: '20px' }}
                      type="submit"
                      color="primary" >
                        <img src={lammoi} width="30"/>
                    </Button>
                  </div>
              </div>
            </form>
            
            <div className="form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search" >
                  
                  {
                        hangsx.map(function(value, index){
                          return(
                            <Button
                              type="submit"
                              color="primary"
                              value={value.hangsxId}
                              onClick={(event)=>{return listHangsx(event, value)}}
                              >
                                {value.tenhang} id:{value.id}
                            </Button>
                          )
                        })
                      }
            </div>
            <div className = "w-75 mx-auto shadow">
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Tên sản phẩm</TableCell>
                        <TableCell>Giá sản phẩm</TableCell>
                        <TableCell>Loại sản phẩm</TableCell>
                        <TableCell>Hãng sản xuất</TableCell>
                        <TableCell>Hình ảnh</TableCell>
                    </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                          sanpham.map(function(value,index){
                            return(
                              <TableRow
                                onClick={
                                  (event) => {
                                    return onClickHandler(event, value, index);
                                  }
                                }
                                key={index}>
                                  <TableCell>{value.id}</TableCell>
                                  <TableCell>{value.ten}</TableCell>
                                  <TableCell>{value.gia}</TableCell>
                                  <TableCell>{value.loaisp}</TableCell>
                                  <TableCell><img src={value.hinhanh} height="30"  /></TableCell>
                                  <TableCell>
                                    <Button
                                      onClick={ (event) => {
                                        handleClickOpen(event, index, value.id)
                                        } }
                                        style={{ marginTop: '20px' }}
                                        color="primary" >
                                          <img src={xoa} width="20"/>
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
                            );
                          })
                        }
                    </TableBody>
                 </Table>
                 <ul className="pagination">
                  <li
                    onClick={ trangTruoc }
                    className="page-item">
                    <a href className="page-link">Trang trước</a>
                  </li>

                  <li className="page-item">
                    <a href className="page-link">{ page }</a>
                  </li>

                  <li
                    onClick={ trangSau }
                    className="page-item">
                    <a href className="page-link">Trang sau</a>
                  </li>
                </ul>
            </div>
            
          
        </div>
    )
}

export default ListSanPham;