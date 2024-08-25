import React, { useEffect, useState } from 'react';
import axios from "axios";
import './List.css';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const List = ({url}) => {

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching the list: " + response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while fetching the list: " + error.message);
    } finally {
      setLoading(false);
    }
  }
  const removeFood = async(foodId) =>{
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error("Error")
    }
  }
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.map((item) => (
            <div key={item.id} className='list-table-format'>
              <img src={`${url}/images/${item.image}`} alt={`Image of ${item.name}`} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default List;
