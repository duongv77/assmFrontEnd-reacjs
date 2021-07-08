import React from 'react';
import './App.css';
import ListSanPham from './componenst/ListSanPham';
import Quanlidanhmuc from './componenst/Quanlidanhmuc';
import Menucp from './componenst/Menu';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useState, useEffect } from 'react';
import Dangnhap from './componenst/Dangnhap'
import Button from '@material-ui/core/Button';
import iconAcout from './componenst/img/iconAcout.png'
import gioHang from './componenst/img/giohang.png'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';

function App() {
    const urlhangsx = 'https://600e393f3bb1d100179de8df.mockapi.io/hangsx';

    const [sanpham1, setSanpham1] = useState([]);

    const [trangThai, setTrangthai] = useState(1);
    const [trangThaiDN, setTrangthaiDN] = useState(1);
    const [giohang, setGiohang] = useState([]);
    let tong=0;

    const [hangsx, setHangsx] = useState([]);
    useEffect(() => {
        axios.get(urlhangsx)
          .then(function(response){
            const {data} = response;
            setHangsx(data);
          })
          .catch((error) => {
            console.log("lỗi" +error);
          });
      }, [setHangsx]);


    const [page, setPage] = useState(1);
    const limit = 10;
    useEffect(()=>{ //call api list sản phẩm
        hangsx.map(function(value){
            //const url1 = urlhangsx+ '/'+ index+"/producst?limit="+limit+"&page="+page;
            const url1 = urlhangsx+ '/'+ value.id+"/producst";
            axios({
                method: "GET",
                url: url1,
            }).then((response)=>{
                const {data} = response;
                setSanpham1([
                    ...sanpham1,
                    data
                ])
            })
            .catch((error)=>{
                console.log(error)
            })
        })
        
      
    },[])

    console.log(sanpham1)
    const  hienthiDN= function(){
        if(trangThaiDN==1){
            return(
                <Route path="/dangnhap" >
                    <Dangnhap 
                     setTrangthai={setTrangthai}
                     setTrangthaiDN={setTrangthaiDN}
                    />
                </Route>
            )
        }
    }
    const thanhToan = () =>{
        setGiohang([])
        window.alert("Mua hàng thành công")
      }
      
    const btnThanhToan = () => {
        if(giohang.length!=0){
            return(
                <Button variant="contained" color="primary" onClick={thanhToan}>
                            Thanh toán
                        </Button>
            )
        }else{
            return(
                <div>
                    Trống
                </div>
            )
        }
    }
    const  onclickSetDN = function(){
        setTrangthaiDN(1);
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const  hienthi = function(){
        if(trangThai==2){
            return(
                <div>
                    <Button variant="" color="primary" onClick={handleClick}>
                        Quản lý 
                    </Button>
                    <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    >
                    <MenuItem onClick={handleClose}><Link class="nav-link text-success" to="/quanlidanhmuc">Quản lí Danh Mục</Link></MenuItem>
                    <MenuItem onClick={handleClose}><Link class="nav-link text-success" to="/listsanpham">Quản lí Sản Phẩm</Link></MenuItem>
                    </Menu>
                </div>
            )
        }
    }
  return(
    <div>
        
        <BrowserRouter>
            <div id="wrapper">
        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column ">
            
            {/* Main Content */}
            <div id="content">
            {/* Topbar */}
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow ">
                {/* Sidebar Toggle (Topbar) */}
                {/* Topbar Search */}
                <Button variant="" color="primary">
                    <Link className="nav-link text-success" to="/menu">Trang chủ</Link>
                  </Button>
                  {hienthi()}
                {/* Topbar Navbar */}
                <ul className="navbar-nav ml-auto">
                {/* Nav Item - Search Dropdown (Visible Only XS) */}
                <li className="nav-item dropdown no-arrow d-sm-none">
                    <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-search fa-fw" />
                    </a>
                    {/* Dropdown - Messages */}
                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                    <form className="form-inline mr-auto w-100 navbar-search">
                        <div className="input-group">
                        <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                            <i className="fas fa-search fa-sm" />
                            </button>
                        </div>
                        </div>
                    </form>
                    </div>
                </li>
                {/* Nav Item - Alerts */}
                <li className="nav-item dropdown no-arrow mx-1">
                    
                    <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        
                    <i className="fas fa-bell fa-fw" />
                    
                    {/* Counter - Alerts */}
                    <span className="badge badge-danger badge-counter">3+</span>
                    </a>
                    {/* Dropdown - Alerts */}
                    <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                    <h6 className="dropdown-header">
                        Alerts Center
                    </h6>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="mr-3">
                        <div className="icon-circle bg-primary">
                            <i className="fas fa-file-alt text-white" />
                        </div>
                        </div>
                        <div>
                        <div className="small text-gray-500">December 12, 2019</div>
                        <span className="font-weight-bold">A new monthly report is ready to download!</span>
                        </div>
                    </a>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="mr-3">
                        <div className="icon-circle bg-success">
                            <i className="fas fa-donate text-white" />
                        </div>
                        </div>
                        <div>
                        <div className="small text-gray-500">December 7, 2019</div>
                        $290.29 has been deposited into your account!
                        </div>
                    </a>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="mr-3">
                        <div className="icon-circle bg-warning">
                            <i className="fas fa-exclamation-triangle text-white" />
                        </div>
                        </div>
                        <div>
                        <div className="small text-gray-500">December 2, 2019</div>
                        Spending Alert: We've noticed unusually high spending for your account.
                        </div>
                    </a>
                    <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                    </div>
                </li>
                {/* Nav Item - Messages */}
                <li className="nav-item dropdown no-arrow mx-1">
                    <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img className="fa-envelope fa-fw" src={gioHang}/>
                    {/* Counter - Messages */}
                    <span className="badge badge-danger badge-counter">{giohang.length}</span>
                    </a>
                    {/* Dropdown - Messages */}
                    <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                    <h6 className="dropdown-header">
                        Giỏ hàng
                    </h6>

                    {
                          giohang.map(function(value, index){
                            tong = tong + Number(value.gia)
                            return(
                              <div className="dropdown-item d-flex align-items-center">
                                  <div className=" mr-3">
                                      {index+1} : <img src={value.hinhanh} width="20" />{value.ten} ,Giá: {value.gia}        
                                  </div>
                                 
                              </div>  
                            )
                          })
                        }
                    Tổng : {tong} VNĐ
                    <a className="dropdown-item text-center small text-gray-500" href="#">
                         {btnThanhToan()} 
                        </a>
                    </div>
                </li>
                <div className="topbar-divider d-none d-sm-block" />
                {/* Nav Item - User Information */}
                <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    
                    <img className="img-profile rounded-circle" src={iconAcout} />
                    </a>
                    {/* Dropdown - User Information */}
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                    <a className="dropdown-item" href="#">
                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                        Profile
                    </a>
                    <a className="dropdown-item" href="#">
                        <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                        Settings
                    </a>
                    <a className="dropdown-item" href="#">
                        <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
                        Activity Log
                    </a>
                    <div className="dropdown-divider" />
                    <Link className="dropdown-item" to="/dangnhap" data-toggle="modal" data-target="#logoutModal" onClick={onclickSetDN}>
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                        Đăng nhập
                    </Link>
                    </div>
                </li>
                </ul>
            </nav>
            {/* End of Topbar */}
            {/* Begin Page Content */}
            <div className="container-fluid">
                <Switch>
                {hienthiDN()}
                <Route path="/listsanpham">
                    <ListSanPham />
                </Route>
                <Route path="/quanlidanhmuc">
                    <Quanlidanhmuc 
                        hangsx={hangsx}
                        setHangsx={setHangsx}
                        urlhangsx={urlhangsx}
                    />
                </Route>
                <Route path="/menu">
                    <Menucp
                    setGiohang={setGiohang}
                    giohang={giohang}
                    sanpham1={sanpham1}
                    />
                </Route>
                </Switch>
            </div>
            {/* /.container-fluid */}
            </div>
            {/* End of Main Content */}
            {/* Footer */}
            <footer className="sticky-footer bg-white  ">
            <div className="container my-auto" >
                <div className="copyright text-center my-auto" >
                <span> © Dưỡng Đào</span>
                </div>
            </div>
            </footer>
            {/* End of Footer */}
        </div>
        </div>
        </BrowserRouter>
    </div>
)
}

export default App;
