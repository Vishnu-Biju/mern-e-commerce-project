import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
 import { PDFDownloadLink } from "@react-pdf/renderer";
 import Invoice from "../../components/order/Invoice";

const History = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () =>
    getUserOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

    const showOrderInTable = (order) => (
      <table style={{width:"100%" , backgroundColor:"white"}}>
        <thead className="thead-light">
          <tr>
            <td scope="col">Title</td>
            <td scope="col">Price</td>
            <td scope="col">Brand</td>
            <td scope="col">Color</td>
            <td scope="col">Count</td>
            <td scope="col">Shipping</td>
          </tr>
        </thead>
  
        <tbody>
          {order.products.map((p, i) => (
            <tr key={i}>
              <td>
                <b>{p.product.title}</b>
              </td>
              <td>{p.product.price}</td>
              <td>{p.product.brand}</td>
              <td>{p.color}</td>
              <td>{p.count}</td>
              <td>
                {p.product.shipping === "Yes" ? (
                  <CheckCircleOutlined style={{ color: "green" }} />
                ) : (
                  <CloseCircleOutlined style={{ color: "red" }} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
 
    const showDownloadLink = (order) => (
      <PDFDownloadLink
        document={<Invoice order={order} />}
        fileName="invoice.pdf"
        className="btn btn-sm btn-block btn-outline-primary"
      >
        Download INVOICE
      </PDFDownloadLink>
    );
    
  const showEachOrders = () =>
    orders.map((order, i) => (
      <div key={i} className=" p-3 mb-5  " >
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}
        <div className="row">
          <div className="col p-4">{showDownloadLink(order)}</div>
        </div>
      </div>
    ));

  return (
    <div className="container-fluid">
      <div className="row">
        <div  className='col-sm-1 col-md-4 col-lg-2'  id='sideNav'>
          <UserNav />
        </div>
        <div className="col-sm-11 col-md-8 col-lg-10  mt-5 text-center">
          <h4 className="mt-5 mb-5" style={{textAlign:"center" ,fontWeight:"600",color:"#030c3e"}}>
            {orders.length > 0 ? "User purchase orders" : "No purchase orders"}
          </h4>
          <div id="cart" class="section-p1" style={{backgroundColor:"white",borderRadius:"15px" }}>
             {showEachOrders()}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default History;





// import React, { useState, useEffect } from "react";
// import UserNav from '../../components/nav/UserNav';
// import { getUserOrders } from "../../functions/user";
// import { useSelector, useDispatch } from "react-redux";
// import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
// import { toast } from "react-toastify";
// import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import Invoice from "../../components/order/Invoice";


// const History = () => {
//   const [orders, setOrders] = useState([]);
//   const { user } = useSelector((state) => ({ ...state }));

//   useEffect(() => {
//     loadUserOrders();
//   }, []);

//   const loadUserOrders = () =>
//     getUserOrders(user.token).then((res) => {
//       console.log(JSON.stringify(res.data, null, 4));
//       setOrders(res.data);
//     });

//     const showOrderInTable = (order) => (
//       <table className="table table-bordered">
//         <thead className="thead-light">
//           <tr>
//             <th scope="col">Title</th>
//             <th scope="col">Price</th>
//             <th scope="col">Brand</th>
//             <th scope="col">Color</th>
//             <th scope="col">Count</th>
//             <th scope="col">Shipping</th>
//           </tr>
//         </thead>
  
//         <tbody>
//           {order.products.map((p, i) => (
//             <tr key={i}>
//               <td>
//                 <b>{p.product.title}</b>
//               </td>
//               <td>{p.product.price}</td>
//               <td>{p.product.brand}</td>
//               <td>{p.color}</td>
//               <td>{p.count}</td>
//               <td>
//                 {p.product.shipping === "Yes" ? (
//                   <CheckCircleOutlined style={{ color: "green" }} />
//                 ) : (
//                   <CloseCircleOutlined style={{ color: "red" }} />
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     );
  
//     const showDownloadLink = (order) => (
//       <PDFDownloadLink
//         document={<Invoice order={order} />}
//         fileName="invoice.pdf"
//         className="btn btn-sm btn-block btn-outline-primary"
//       >
//         Download PDF
//       </PDFDownloadLink>
//     );
  
//     const showEachOrders = () =>
//       orders.map((order, i) => (
//         <div key={i} className="m-5 p-3 card">
//           <ShowPaymentInfo order={order} />
//           {showOrderInTable(order)}
//           <div className="row">
//             <div className="col">{showDownloadLink(order)}</div>
//           </div>
//         </div>
//       ));
  
//   return (
//   <div className='container-fluid'>
//     <div className='row'>
//       <div className='col-sm-1 col-md-4 col-lg-2'  id='sideNav'>
//         <UserNav/>
//       </div>
//       <div className="col text-center">
//           <h4>
//             {orders.length > 0 ? "User purchase orders" : "No purchase orders"}
//           </h4>
//           {showEachOrders()}
//         </div>
//     </div>

//   </div>
// );
// }
// export default History;