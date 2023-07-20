import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import TableComponent from "../components/TableComponent";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const data = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const columns = [
  "Dessert (100g serving)",
  "Calories",
  "Fat&nbsp;(g)",
  "Carbs&nbsp;(g)",
  "Protein&nbsp;(g)",
];

const dataKeyAccessors = ["name", "calories", "fat", "carbs", "protein"];

const action = () => {
  console.log("Clicked Me!!");
};

const searchFunction = () => {
  //Api call to search and update table data
  alert("Fetching search....");
};

const paginationChange = (page) => {
  //Api call to paginate and update table data
  alert(`Paginating....page ${page}`);
};

describe("Tab", () => {
  it("Table Headers, columns, and button to be in component", () => {
    render(
      <TableComponent
        actionText="Add Location"
        columns={columns}
        data={data}
        action={action}
        searchFunction={searchFunction}
        paginationChange={paginationChange}
        dataKeyAccessors={dataKeyAccessors}
      />
    );

    expect(screen.getByRole("action-button")).toHaveTextContent("Add Location");
    expect(screen.getByRole("table-header")).toBeInTheDocument();
    expect(screen.getAllByRole("table-row").length).toBeGreaterThanOrEqual(1);
  });

  it("Ensure search icon, data, accessors and columns props are passed", async () => {
    render(
      <TableComponent
        actionText="Add Location"
        columns={columns}
        data={data}
        action={action}
        searchFunction={searchFunction}
        paginationChange={paginationChange}
        dataKeyAccessors={dataKeyAccessors}
      />
    );  
    expect(screen.getByRole("search-icon")).toBeInTheDocument();
    expect(screen.getAllByRole("table-header-cell").length).toBeGreaterThanOrEqual(3);
    expect(screen.getAllByRole("table-row-cell").length).toBeGreaterThanOrEqual(3);
  });

  it("Ensure the action functions responds", async () => {
    const handleButtonAction = jest.fn();
    render(
      <TableComponent
        actionText="Add Location" 
        columns={columns}
        data={data}
        action={handleButtonAction}
        searchFunction={searchFunction}
        paginationChange={paginationChange}
        dataKeyAccessors={dataKeyAccessors}
      /> 
    );  
    fireEvent.click(screen.getByRole("action-button"));
    expect(handleButtonAction).toHaveBeenCalledTimes(1);
  });

  it("Ensure the search functions works.", async () => {
    const searchAFunction = jest.fn();
    render(
      <TableComponent
        actionText="Add Location" 
        columns={columns}
        data={data}
        action={action}
        searchFunction={searchAFunction}
        paginationChange={paginationChange}
        dataKeyAccessors={dataKeyAccessors}
      /> 
    );  

    const input = screen.getByRole("search-input")
   //Test input search value
    fireEvent.change(input, {target: {value: "duplex"}});
    expect(input.value).toBe('duplex')
    //Ensure search functions is called on text change
    expect(searchAFunction).toHaveBeenCalledTimes(1); 
  });
}); 
