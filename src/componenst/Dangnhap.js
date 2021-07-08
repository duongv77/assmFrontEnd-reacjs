import { useState, useEffect } from 'react';
import duong from './img/duong.png'
import {
    BrowserRouter,
    Switch,
    Route,
    Link
  } from "react-router-dom";

  import Menu from './Menu'
function Dangnhap({setTrangthai,setTrangthaiDN}){
    const [acount,setAcount] = useState();
    const [password,setPassword] = useState();

    const onChangeTaiKhoan = (event) => {
        setAcount(event.target.value)
    }

    const onChangeMatKhau = (event) => {
        setPassword(event.target.value)
    }
    

    const onclickDangNhap = () =>{
        if(acount==="admin"){
            if(password==="123"){
                setTrangthai(2);
                
            }else{
                window.alert("Sai mật khẩu")
            }
        }else if(acount==="user"){
            if(password==="123"){
                setTrangthai(1);
                
            }else{
                window.alert("Sai mật khẩu")
            }
        }else(
            window.alert("Tài khoản không chính xác")
        )
        setTrangthaiDN(2);
    }

    return(
        <div>
            <BrowserRouter>
             <div className="container" >
                    {/* Outer Row */}
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                            {/* Nested Row within Card Body */}
                            <div className="row">
                                <img src={duong} className="col-lg-6 d-none d-lg-block " />
                                <div className="col-lg-6">
                                <div className="p-5">
                                    <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Đăng nhập</h1>
                                    </div>
                                    <form className="user">
                                    <div className="form-group" onChange={onChangeTaiKhoan}>
                                        <input name="acount" type="text"  className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Nhập tài khoản..." />
                                    </div>
                                    <div className="form-group" onChange={onChangeMatKhau}>
                                        <input name="password" type="password"  className="form-control form-control-user" id="exampleInputPassword" placeholder="Mật khẩu" />
                                    </div>
                                    <div className="form-group">
                                        <div className="custom-control custom-checkbox small">
                                        <input type="checkbox" className="custom-control-input" id="customCheck" />
                                        <label className="custom-control-label" htmlFor="customCheck">Remember
                                            Me</label>
                                        </div>
                                    </div>
                                    <Link to="/menu" className="btn btn-primary btn-user btn-block" onClick={onclickDangNhap}>
                                        Login
                                    </Link>
                                    <hr />
                                    <a href="https://www.facebook.com/duongdao22042001/" className="btn btn-google btn-user btn-block">
                                        <i className="fab fa-google fa-fw" /> Login with Google
                                    </a>
                                    <a href="https://www.facebook.com/duongdao22042001/" className="btn btn-facebook btn-user btn-block">
                                        <i className="fab fa-facebook-f fa-fw" /> Login with Facebook
                                    </a>
                                    </form>
                                    <hr />
                                    <div className="text-center">
                                    <a className="small" href="https://www.facebook.com/duongdao22042001/">Forgot Password?</a>
                                    </div>
                                    <div className="text-center">
                                    <a className="small" href="https://www.facebook.com/duongdao22042001/">Create an Account!</a>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

            <Switch>
                <Route path="/menu">
                    <Menu />
                </Route>
                </Switch>
            </BrowserRouter>
               

        </div>

                
         
         );
}

export default Dangnhap;