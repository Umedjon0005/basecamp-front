import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import axios from '../axios';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../components/Post';
import { fetchPosts } from '../redux/slices/posts';
import { Header } from '../components';

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data);
  const { posts } = useSelector(state => state.posts);

  const isPostsLoading = posts.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <>
      <Header/>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Projects" />
      </Tabs>
      <Grid container rowSpacing={1} spacing={4}>
        <Grid xs={6} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => isPostsLoading ? (<Post key={index} isLoading={true}/>) : (
            (
              <Post
                id={obj._id}
                title={obj.title}
                viewsCount={obj.viewsCount}
                isEditable={userData ?._id === obj.user._id}
              />
            )
          ))}
        </Grid>
      </Grid>
    </>
  );
};
