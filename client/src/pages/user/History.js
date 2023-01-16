import React  from 'react';
import UserNav from '../../components/nav/UserNav';


const History = () => (
  <div className='container-fluid'>
    <div className='row'>
      <div className='col-md-2' id='sideNav'>
        <UserNav/>
      </div>
      <div className='col' id='hero'>
          user history page
      </div>
    </div>

  </div>
);

export default History;