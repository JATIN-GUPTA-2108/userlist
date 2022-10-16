import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { getPosts } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
const user = JSON.parse(localStorage.getItem('profile'));

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  if (!user?.result?.name) {
    return (
      <div>
        <h4>
          Please Sign In to create your own course and like other's course.
        </h4>
      </div>
    );
  }
  return (<>

    <div className=" ml-lg-5 mt-4 p-3" >
        <div className="row justify-content-start">
          <div className="col-md-7 col-md-push-7 mr-lg-4 pb-4"style={{"backgroundColor":"white"}}>
<div className="mt-4 mb-4">

<Posts setCurrentId={setCurrentId} />

</div>
           </div>
          <div className="col-md-4 col-md-pull-4 mb-3 h-50 mt-4 pb-5 pt-4"style={{"backgroundColor":"white" , "paddingBottom":"0px"}}>
<div className="mt-2">
<Form currentId={currentId} setCurrentId={setCurrentId} />

          
</div>
</div>
          
        </div>
      </div>
  </>
  );
};

export default Home;
