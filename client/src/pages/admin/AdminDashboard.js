import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getOrders, changeStatus } from "../../functions/admin";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../components/order/Orders";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () =>
    getOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status updated");
      loadOrders();
    });
  };
  return (
    <div className="container-fluid">
      <div className="row" style={{backgroundColor:"white"}}>
        <div id="sideNav" className='col-sm-1 col-md-4 col-lg-2'>
          <AdminNav />
        </div>

          <div className="col-sm-11 col-md-8 col-lg-10  mt-5 pt-5 text-center">
            <h4 style={{color:"black",fontWeight:"600"}}>
              ADMIN DASHBOARD
            </h4>
            
            {/* {JSON.stringify(orders)} */}
            <div id="cart" class="section-p1">
            <Orders orders={orders} handleStatusChange={handleStatusChange} />
            
            </div>
          
          </div>
        
      </div>
    </div>
  );
};

export default AdminDashboard;
