import 'bootstrap/dist/css/bootstrap.min.css';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


function Menu({setGiohang,giohang,sanpham1}){
  const urlhangsx = 'https://600e393f3bb1d100179de8df.mockapi.io/hangsx';
  const [hangsx, setHangsx] = useState([]);
  const [hangsxID, setHangsxID] =  useState(1);
  const [sanpham, setSanpham] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 5;
  
  const onClickSanPham = (event, value ) => {
        setGiohang([
          ...giohang,
          value
        ])
  }
  
  
  useEffect(()=>{
    const url1 = urlhangsx+ '/'+ hangsxID+"/producst?limit="+limit+"&page="+page;
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
  },[page,hangsxID])

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

  const onClickSelect = function (event)  {
    setHangsxID(event.target.value);
    setPage(1);
  }
  
  const [search, setSearch] = useState();
    useEffect(() => {
      axios({
        method: 'GET',
        url: urlhangsx+ '/'+ hangsxID+"/producst?search="+ search,
      })
        .then((response) => {
          const { data } = response;
          setSanpham(data);
        })
        .catch((error) => {
          console.log("lỗi" +error);
        });
    }, [search]);
    const onSearch = (event) => {
      setSearch(event.target.value) ;
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

    return(
        <div id="wrapper " >
                 <FormControl>
                 
                    <InputLabel id="demo-simple-select-filled-label">Hãng sản xuất</InputLabel>
                    <Select
                      id="margin-none"
                      onChange={onClickSelect}
                      style={{ margin: 15, width: 200}}
                    >
                      {
                        hangsx.map(function(value, index){
                          return(
                            <option value={value.id} key={index}>{value.tenhang}</option>
                          )
                        })
                      }
                    </Select>
                  </FormControl>
                  <div className="form-group m-3">
                    <TextField id="standard-basic" name="timkiem"  onChange={(event)=>{return onSearch(event)}} label="Tìm kiếm" />
                  </div>
                <div class="row m-4 ">

                  {
                    sanpham.map(function(value){
                      return(
                        <div class = "card border-left-secondary w-auto mr-auto p-2 m-2 shadow-lg" >
                          <div class="thumbnail" >
                            <h4>{value.ten}</h4>
                            <img src={value.hinhanh} height="200"/>
                            <div class="caption">
                              {value.gia}
                              <button  onClick={(event )=>{return onClickSanPham(event, value)}}>
                              <img className="" src="https://banner2.cleanpng.com/20190419/iwz/kisspng-shopping-cart-software-computer-icons-go-shopping-png-icons-and-graphics-png-repo-free-5cba1c3dca2440.854946711555700797828.jpg" width="30"/>
                               </button>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                    
                </div>
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
     
    )
}

export default Menu;