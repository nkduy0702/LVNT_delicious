import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

import { fetchDataUsers } from "../../../service/userAPI/getUsers";
import { deleteUser } from "../../../service/userAPI/deleteUser";

import { format } from "date-fns"; // Import format từ date-fns

const ExTable = () => {
  const [users, setUsers] = useState(null);
  const [reRender, setReRender] = useState(true);

  const DeleteUser = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa không?")) {
      deleteUser(id).then((res) => {
        console.log(res);
        alert("Xóa thành công!");
        setReRender(!reRender);
      });
    }
  };
  useEffect(() => {
    fetchDataUsers()
      .then((response) => {
        const users = response.data;
        setUsers(users);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [reRender]); // Chỉ chạy một lần khi component được tạo ra

  return (
    <Table
      aria-label="simple table"
      sx={{
        mt: 3,
        whiteSpace: "nowrap",
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Id
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Name
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Email
            </Typography>
          </TableCell>

          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Create At
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Delete
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users?.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                {user.id}
              </Typography>
            </TableCell>
            <TableCell>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "600",
                    }}
                  >
                    {user.username}
                  </Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "600",
                    }}
                  >
                    {user.email}
                  </Typography>
                </Box>
              </Box>
            </TableCell>

            <TableCell>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  {format(new Date(user.created_at), "dd-MM-yyyy")}{" "}
                  {/* Chuyển đổi created_at thành ngày giờ Việt Nam */}
                </Typography>
              </Box>
            </TableCell>
            <TableCell>
              <button
                style={{
                  border: "none",
                  background: "none",
                }}
                onClick={() => DeleteUser(user.id)}
              >
                <PersonRemoveIcon
                  sx={{
                    opacity: "0.6",
                    ":hover": { cursor: "pointer", opacity: "1" },
                  }}
                />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ExTable;
