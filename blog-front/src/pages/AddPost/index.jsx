import React from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import axios from "../../axios";

export const AddPost = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setIsLoading] = React.useState(false);
  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const inputFileRef = React.useRef(null);
  const isEditing = Boolean(id);
  

  

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try{
      setIsLoading(true);
      const fields = {
        title,
        text
      }
      const {data} = isEditing ? await axios.patch(`/posts/${id}`, fields) : await axios.post('/posts', fields);

      const _id = isEditing ? id : data._id;
      navigate(`/posts/${_id}`);
    } catch(err) {
      console.warn(err);
      alert('Error !');
    }
  }

  React.useEffect(() => {
    if(id) {
      axios.get(`/posts/${id}`).then(({data})=> {
        setTitle(data.title);
        setText(data.text);
      }).catch(err => {
        console.warn(err);
        alert('Error')
      })
    }
  }, [])

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Comment...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  if(!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to='/' />
  }

  console.log({title, text});

  return (
    <Paper style={{ padding: 30, marginTop: 50 }}>
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Project name..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        text={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? 'Save': 'Create'}
        </Button>
        <Button size="large">Cancel</Button>
      </div>
    </Paper>
  );
};
