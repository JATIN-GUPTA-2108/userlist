import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import { createPost, updatePost } from '../../actions/posts';


const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const refreshPage = ()=>{
    window.location.reload();
 }
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (

      <div>
        {refreshPage}
        <h4>
          Please Sign In to create your own course and like other's course.
        </h4>
      </div>
    );
  }

  return (
    <div>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h3>{currentId ? `Editing "${post.title}"` : 'Creating Contact'}</h3>
        <input className='m-2' name="title" variant="outlined" placeholder="Title"  value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <input className='m-2'name="message" variant="outlined" placeholder="Message"  multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <input className='m-2' name="tags" variant="outlined" placeholder="Tags (coma separated)" value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div ><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <button className='m-2' variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</button>
        <button className='m-2' variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</button>
      </form>
    </div>
  );
};

export default Form;
