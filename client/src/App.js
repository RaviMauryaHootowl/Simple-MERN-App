import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { MdClear } from 'react-icons/md';

function App() {
  const [postsData, setPostsData] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editModePostID, setEditModePostID] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const fetchPosts = async () => {
    try {
      const res = await axios.get('/api/v1/posts');

      console.log(res.data);
      setPostsData(res.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  useEffect(async () => {
    setIsLoading(true);
    fetchPosts();
  }, []);

  const openAddNoteDialog = () => {
    document.querySelector('.addPopupContainer').style.display = "flex";
  }

  const addNoteBtnClick = async (postID) => {
    setIsLoading(true);
    try {
      if (!editMode) {
        const res = await axios.post('/api/v1/posts', {
          postTitle: newPostTitle,
          postContent: newPostContent
        });
      } else {
        const res = await axios.patch(`/api/v1/posts/${editModePostID}`, {
          postTitle: newPostTitle,
          postContent: newPostContent
        });
        //console.log(res);
      }
      //console.log(res);
      document.querySelector('.addPopupContainer').style.display = "none";
      fetchPosts();
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  const deletePost = async (postID) => {
    try {
      await axios.delete(`/api/v1/posts/${postID}`);
      fetchPosts();
    } catch (error) {

    }
  }

  const updatePost = (epostTitle, epostContent, postID) => {
    setEditModePostID(postID);
    setEditMode(true);
    openAddNoteDialog();
    setNewPostTitle(epostTitle);
    setNewPostContent(epostContent);
    //addNoteBtnClick('PATCH', epostTitle, epostContent, postID);
  }



  return (
    <div className="App">
      <span className="appHeader">Simple Post App</span>
      <div className="postsContainer">
        {
          (isLoading) ? <div className="loadingContainer"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>
            : postsData.map((post) => {
              const postDate = new Date(post.date);
              const postDateString = `- ${months[postDate.getMonth()]} ${postDate.getDate()}, ${postDate.getFullYear()}`;
              return <div className="postContainer" key={post._id}>
                <div className="postDetails">
                  <span className="postTitle" onClick={() => { updatePost(post.postTitle, post.postContent, post._id); }}>{post.postTitle}</span>
                  <span className="postDate">{postDateString}</span>
                  <span className="postContent">{post.postContent}</span>
                </div>
                <div><button className="deletePostBtn" onClick={() => { deletePost(post._id) }}><MdClear color="white" /></button></div>
              </div>
            })
        }
      </div>
      <div className="addPopupContainer">
        <div className="addNewPostContainer">
          <div className="cancelDialogContainer"><MdClear color="black" size="25" onClick={() => {document.querySelector('.addPopupContainer').style.display = "none";}}/></div>
          <input value={newPostTitle} type="text" name="" id="" onChange={(e) => { setNewPostTitle(e.target.value) }} placeholder="Note Title" />
          <input value={newPostContent} type="text" name="" id="" onChange={(e) => { setNewPostContent(e.target.value) }} placeholder="Note Content" />
          {(isLoading) ? <div className="smallLoadingContainer"><div className="lds-ring small-loading"><div></div><div></div><div></div><div></div></div></div> : <button onClick={addNoteBtnClick}>Save</button>}
        </div>
      </div>
      <button className="addPostDialogOpenBtn" onClick={openAddNoteDialog}>Create Post</button>
    </div>
  );
}

export default App;
