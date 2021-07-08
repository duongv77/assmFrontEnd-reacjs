import { useState, useEffect } from 'react';
import axios from 'axios';

function SanPham({page, setSanpham,hangsxID}){
  const urlhangsx = 'https://600e393f3bb1d100179de8df.mockapi.io/hangsx';

  const [hangsx, setHangsx] = useState([]);
  const limit = 5;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(()=>{
    const url1 = urlhangsx+ '/'+ hangsxID+"/producst?limit="+limit+"&page="+page;
    setLoading(true)
    axios({
      method: "GET",
      url: url1,
    }).then((response)=>{
      const {data} = response;
      setSanpham(data)
    })
    .catch((error)=>{
      setLoading(false)
      setError(error.message)
    })
  },[page,hangsxID])
}
export default SanPham;