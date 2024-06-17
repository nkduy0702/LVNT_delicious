import React, { useState, useEffect } from "react";
import Swal from "sweetalert";
import {
  IconButton,
  Typography,
  Divider,
  Grid,
  Box,
  Paper,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Comment = (props) => {
  const [comment, setComment] = useState("");
  const [commentData, setCommentData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [render, setRender] = useState(true);
  const [editingComment, setEditingComment] = useState("");
  const [isEditCmt, setIsEditCmt] = useState(false);
  const [idCmtEditing, setIdCmtEditing] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://192.168.27.1:1407/home`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const params = { ingredientid: props.id };
        const queryString = new URLSearchParams(params).toString();
        const apiUrl = `http://192.168.27.1:1407/comment/data?${queryString}`;
        const response = await fetch(apiUrl);
        if (response.status === 200) {
          const comments = await response.json();
          setCommentData(comments);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchComments();
  }, [userData, props.id, render]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const submitComment = async () => {
    if (!userData) {
      Swal({
        title: "Vui lòng đăng nhập trước!",
        icon: "warning",
      });
      return;
    }
    if (comment === "") {
      Swal({
        title: "Vui lòng nhập nội dung bình luận!",
        icon: "warning",
      });
      return;
    }

    try {
      const response = await axios.post(`http://192.168.27.1:1407/comment`, {
        userid: userData.id,
        ingredientid: props.id,
        commenttext: comment,
      });
      if (response.status === 200) {
        setComment("");
        setRender(!render);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowMore = () => {
    setIsExpanded(!isExpanded);
  };

  if (!commentData) {
    return <CircularProgress />;
  }

  const timeAgo = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return `${interval} năm trước`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return `${interval} tháng trước`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return `${interval} ngày trước`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return `${interval} giờ trước`;
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return `${interval} phút trước`;
    }
    return `${Math.floor(seconds)} giây trước`;
  };

  //Edit comment
  const handleEditCommentChange = (e) => {
    const EditingComment = e.target.value;
    setEditingComment(EditingComment);
  };

  const handleEditCmtId = ({ id, currentCmt }) => {
    setEditingComment(currentCmt);
    setIsEditCmt(true);
    setIdCmtEditing(id);
    // console.log(id);
  };

  const submitCommentEdited = async () => {
    if (editingComment === "") {
      alert("Vui lòng nhập bình luận chỉnh sửa!");
      return false;
    } else {
      const response = await axios.put(`http://192.168.27.1:1407/comment`, {
        id: idCmtEditing,
        comment: editingComment,
      });
      if (response.status === 200) {
        // const data = await response.data;
        // console.log(data);
        setIsEditCmt(false);
        setRender(!render);
      } else {
        console.log("lỗi Server");
      }
    }
  };

  const handleDeleteCmt = async ({ id }) => {
    const res = window.confirm("Bạn có muốn xóa bình luận này?");
    if (!res) return;
    try {
      const response = await axios.delete(
        `http://192.168.27.1:1407/comment/${id}`
      );
      if (response.status === 200) {
        const data = await response.data;
        console.log(data);
        setRender(!render);
      } else {
        throw new Error("Error!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
      <Grid
        item
        sx={{
          width: "70vw",
        }}
      >
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: "bolder",
            }}
          >
            Bình Luận
          </Typography>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <TextField
              label="Thêm Bình Luận"
              value={comment}
              onChange={handleCommentChange}
              style={{ marginBottom: "10px", width: "85%" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={submitComment}
              style={{
                marginBottom: "24px",
                height: 53,
                width: "14%",
              }}
            >
              Bình Luận
            </Button>
          </div>

          {commentData.map((comment, index) => (
            <Box
              key={comment.id}
              style={{
                display: isExpanded || index < 5 ? "block" : "none",
              }}
            >
              <Divider style={{ margin: "10px 0" }} />
              <Typography
                variant="subtitle1"
                gutterBottom
                style={{
                  fontSize: "18px",
                  fontWeight: "800",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {comment.username}

                {comment.userid === userData?.id ? (
                  <div
                    style={{
                      width: 50,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                    }}
                  >
                    <IconButton
                      onClick={() =>
                        handleEditCmtId({
                          id: comment.id,
                          currentCmt: comment.content,
                        })
                      }
                    >
                      <EditIcon
                        style={{
                          fontSize: "18px",
                        }}
                      />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteCmt({ id: comment.id })}
                    >
                      <DeleteIcon
                        style={{
                          fontSize: "18px",
                        }}
                      />
                    </IconButton>
                  </div>
                ) : (
                  ""
                )}
              </Typography>
              {isEditCmt && idCmtEditing === comment.id ? (
                <Typography variant="subtitle2">
                  <TextField
                    label="Chỉnh sửa bình luận"
                    defaultValue={comment.content}
                    onChange={handleEditCommentChange}
                    style={{
                      marginBottom: "10px",
                      width: "50%",
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={submitCommentEdited}
                    style={{
                      marginLeft: 20,
                      marginBottom: "24px",
                      height: 53,
                      width: "14%",
                    }}
                  >
                    Chỉnh sửa
                  </Button>
                </Typography>
              ) : (
                <Typography variant="subtitle2">{comment.content}</Typography>
              )}

              <Typography
                variant="caption"
                color="textSecondary"
                style={{ fontStyle: "italic" }}
              >
                {timeAgo(comment.created_at)}
              </Typography>
            </Box>
          ))}

          {commentData.length > 5 && (
            <Button
              variant="outlined"
              color="primary"
              onClick={handleShowMore}
              style={{ marginTop: "10px" }}
            >
              {isExpanded ? "Thu gọn bình luận" : "Xem thêm bình luận"}
            </Button>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Comment;
