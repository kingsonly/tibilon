import React, { Fragment } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CircularProgress, TablePagination } from "@mui/material";
import {
  AiFillDelete,
  AiFillEdit,
  AiFillEye,
  AiOutlineSearch,
} from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
import DialogModal from "./DialogModal";

/**
 * Represents the Table component.
 * @Usage Properties Page
 * @function
 * @param {ArrayOfObject} columns - stores the columns of the table.
 * @param {ArrayOfObject} data - stores the data to be rendered on the table.
 * @param {function} searchFunction - It is a function that takes in the searched term, make a search api request and updates the data params.
 * @param {string} actionText - stores the action text on the table button.
 * @param {function} paginationChange - function to make api call to update data page
 * @param {function} action - it executes the action to be carried out on table button click.
 * @param {function} dataKeyAccessors - This holds the object keys of the data to be rendered on the table.
 * @Description - this component displays the paginated table component with search functionality
 */

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#FAFAFA",
    color: "#000000",
    fontSize: "16px",
    fontWeight: "700",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&.MuiTableCell-root": {
    border: "blue",
    marginBottom: 10,
  },
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
    // marginBottom: theme.spacing(10),
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
    // marginBottom: theme.spacing(10),
  },
}));

export default function TableComponent({
  columns,
  data,
  actionText,
  action,
  searchFunction,
  paginationChange,
  dataKeyAccessors,
  deleteAction,
  loading,
  fetchMoreDataProps,
  hasMore,
  hasCustom,
  hasCustomIcon,
  hasCustomAction,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [dialogMessage, setDialogMessage] = React.useState("");
  const [DialogTitle, setDialogTitle] = React.useState("");

  const openDialogModal = (title, message) => {
    setDialogMessage(message);
    setDialogTitle(title);
    setOpen(true);
    // deleteAction();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    //API call for Pagination
    paginationChange(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    //API call for Pagination
    paginationChange(+event.target.value);
  };

  const onActionClick = () => {
    action();
  };
  const fetchMoreData = () => {
    fetchMoreDataProps();
  };

  // const hasCustomRender = () => {
  //   if(hasCustom){
  //     if(hasCustomIcon !== undefined){
  //       return (

  //         {hasCustomIcon}
  //       )
  //     }else{
  //       return (

  //         <div>Icon required</div>
  //       )
  //     }
  //   }

  // }
  const renderRow = (row) => {
    return (
      <StyledTableRow
        role="table-row"
        sx={{
          borderBottom: "2px solid black",
          marginBottom: "2000px",

          height: "10px",
          "& th": {
            fontSize: "1.25rem",
            color: "rgba(96, 96, 96)",
          },
        }}
        key={uuidv4()}
        style={{ border: "1px solid #CCCCCC", marginBottom: "10px" }}
      >
        {dataKeyAccessors?.map((col, index) => (
          <StyledTableCell key={uuidv4()} align="left" role="table-row-cell">
            {dataKeyAccessors[index] == "image" ? (
              <>
                <img className="w-[50px] h-[50px]" alt="icon" src={row.image} />
              </>
            ) : null}
            {dataKeyAccessors[index] == "CTA" ? (
              <div className="flex gap-4">
                <AiFillEdit
                  className="cursor-pointer"
                  onClick={() => editAction && editAction()}
                />
                <AiFillEye
                  className="cursor-pointer"
                  onClick={() => viewAction && viewAction()}
                />
                <AiFillDelete
                  className="cursor-pointer"
                  // onClick={() => deleteAction && deleteAction(row)}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openDialogModal(
                      "Delete Client Details",
                      "Are you sure you want to delete Client Details?"
                    )
                      ? deleteAction && deleteAction(row)
                      : null;
                  }}
                />
                {hasCustom && hasCustomIcon ? (
                  <div onClick={() => {
                    hasCustomAction(row.id)
                  }}>{hasCustomIcon}</div>
                ) : null}
              </div>
            ) : null}

            {(
              // moment(e).format("YYYY-MM-DD")
              //TO DO;>> ADD A BETTER WAY TO CHECK IS STRING DATE IS VALID
              <>
                {
                  // moment(e).format("YYYY-MM-DD")
                  //TO DO;>> ADD A BETTER WAY TO CHECK IS STRING DATE IS VALID
                  <>
                    {moment(row[dataKeyAccessors[index]]).isValid() ? (
                      <>{row[dataKeyAccessors[index]]}</>
                    ) : (
                      <> {row[dataKeyAccessors[index]]}</>
                    )}
                  </>
                }
              </>
            )}
          </StyledTableCell>
        ))}
      </StyledTableRow>
    );
  };

  return (
    <>
      <DialogModal
        open={open}
        setOpen={setOpen}
        message={dialogMessage}
        title={DialogTitle}
        action={deleteAction}
        buttonText={"Delete"}
      />
      <div className="flex items-center justify-between mb-[19px]">
        {searchFunction && (
          <div className="border-2 rounded w-[292px] h-[45px] flex items-center">
            <div className="flex items-center justify-center border-r-2 h-[100%] w-[47px]">
              <AiOutlineSearch role="search-icon" />
            </div>
            <input
              className="w-[100%] ml-[20px] border-none focus:outline-0 placeholder-red-300::placeholder"
              placeholder="Quick Search"
              onChange={(e) => {
                searchFunction(e.target.value);
              }}
              role="search-input"
            />
          </div>
        )}

        {action && (
          <div
            className="border-2 rounded w-[200px] h-[48px] bg-[#40A74E] text-white flex items-center text-[15px] font-bold justify-center cursor-pointer"
            onClick={onActionClick}
            role="action-button"
          >
            {actionText}
          </div>
        )}
      </div>

      {loading == true && (
        <div className="flex items-center justify-center w-[100%] mb-[20px]">
          <CircularProgress />
        </div>
      )}
      <TableContainer component={Paper} >
        <InfiniteScroll
          dataLength={data.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          initialScrollY={1}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }

        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table" >
            <TableHead style={{ border: "1px solid #CCCCCC" }}>
              <TableRow role="table-header">
                {columns?.map((column) => (
                  <StyledTableCell key={uuidv4()} role="table-header-cell">
                    {column}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {data?.map((row) => (
                // Render Dynamic Data Objects
                <Fragment key={uuidv4()}>{renderRow(row)}</Fragment>
              ))}

            </TableBody>

          </Table>
        </InfiniteScroll>
      </TableContainer>

      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </>
  );
}
