import React, { useState } from "react";
import { Button, Input, Table } from "semantic-ui-react";
import "./HawkListing.css";

interface Hawk {
  [key: string]: any;
  id: number;
  name: string;
  size: string;
  gender: string;
}

export interface HawkListingProps {
  hawks: Hawk[];
}

const HawkListing: React.FC<HawkListingProps> = ({ hawks }) => {
  const [filterInput, setFilterInput] = useState<string>("");
  const [filterQuery, setFilterQuery] = useState<string>("");
  const [sortedColumn, setSortedColumn] = useState<string>("");
  const [direction, setDirection] = useState<"ascending" | "descending">(
    "ascending"
  );

  const onSort = (columnToSort: string) => {
    if (sortedColumn !== columnToSort) {
      setSortedColumn(columnToSort);
      setDirection("ascending");

      return;
    }

    setDirection(direction === "ascending" ? "descending" : "ascending");
  };

  const onChangeFilterInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilterInput(e.target.value);

  const onEnterFilterInput = (e: React.KeyboardEvent<HTMLInputElement>) =>
    e.key === "Enter" && setFilterQuery(filterInput);

  const sortHawks = (a: Hawk, b: Hawk) => {
    const aColumn = a[sortedColumn || "name"].toUpperCase();
    const bColumn = b[sortedColumn || "name"].toUpperCase();

    return direction === "ascending"
      ? aColumn.localeCompare(bColumn)
      : bColumn.localeCompare(aColumn);
  };

  const filterHawks = (hawk: Hawk) => {
    if (!filterQuery) {
      return hawk;
    }

    return hawk.name.toLowerCase().includes(filterQuery.toLowerCase());
  };

  const sortedHawks = [...hawks].filter(filterHawks).sort(sortHawks);

  return (
    <div>
      <Input
        action={{
          icon: "filter",
          content: "Filter",
          onClick: () => setFilterQuery(filterInput)
        }}
        className="HawkListing__filterNameInput"
        placeholder="Filter by name"
        onChange={onChangeFilterInput}
        onKeyDown={onEnterFilterInput}
        value={filterInput}
      />
      <Table sortable celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={"name" === sortedColumn ? direction : undefined}
              onClick={() => onSort("name")}
            >
              Name
            </Table.HeaderCell>
            <Table.HeaderCell
              className="HawkListing__tableCol"
              sorted={"size" === sortedColumn ? direction : undefined}
              onClick={() => onSort("size")}
            >
              Size
            </Table.HeaderCell>
            <Table.HeaderCell
              className="HawkListing__tableCol"
              sorted={"gender" === sortedColumn ? direction : undefined}
              onClick={() => onSort("gender")}
            >
              Gender
            </Table.HeaderCell>
            <Table.HeaderCell className="HawkListing__viewCol" />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedHawks.map(hawk => (
            <Table.Row key={hawk.id}>
              <Table.Cell data-testid="HawkListing__nameCol">
                {hawk.name}
              </Table.Cell>
              <Table.Cell>{hawk.size}</Table.Cell>
              <Table.Cell>{hawk.gender}</Table.Cell>
              <Table.Cell className="HawkListing__viewCol">
                <Button>
                  View <i className="angle double right icon" />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default HawkListing;
