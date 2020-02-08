import React, { useEffect, useState } from "react";
import { Button, Header, Input, Table, Transition } from "semantic-ui-react";
import "./HawkListing.css";
import { getAllHawks, Hawk, saveHawk, updateHawk } from "./api";
import HawkEditor from "./HawkEditor";
import { HawkGender, HawkSize } from "./util";

const HawkListing: React.FC = () => {
  const [hawks, setHawks] = useState<Hawk[]>([]);
  const [filterInput, setFilterInput] = useState<string>("");
  const [sortedColumn, setSortedColumn] = useState<string>("");
  const [sortedDirection, setSortedDirection] = useState<"asc" | "desc">("asc");
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [selectedHawk, setSelectedHawk] = useState<Hawk | null>(null);

  const fetchHawks = async (
    filter: string,
    sortField: string,
    sortDir: string
  ) =>
    await getAllHawks({
      filter,
      sortField,
      sortDir
    }).then((allHawks: Hawk[]) => setHawks(allHawks));

  useEffect(() => {
    fetchHawks(filterInput, sortedColumn, sortedDirection);
  }, []);

  const onSort = (columnToSort: string) => {
    setSortedColumn(columnToSort);

    const newDirection = sortedDirection === "asc" ? "desc" : "asc";
    setSortedDirection(newDirection);

    fetchHawks(filterInput, columnToSort, newDirection);
  };

  const onChangeFilterInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilterInput(e.target.value);

  const onEnterFilterInput = (e: React.KeyboardEvent<HTMLInputElement>) =>
    e.key === "Enter" && fetchHawks(filterInput, sortedColumn, sortedDirection);

  const onCancel = () => {
    setShowEditor(false);
    setSelectedHawk(null);
  };

  const onSave = async (hawk: Hawk) => {
    if (!selectedHawk) {
      await saveHawk(hawk);
    } else {
      await updateHawk(hawk);
    }

    await fetchHawks(filterInput, sortedColumn, sortedDirection);

    setShowEditor(false);
  };

  const onSelectHawk = (hawk: Hawk) => {
    setSelectedHawk(hawk);
    setShowEditor(true);
  };

  const tableFormattedDirection =
    sortedDirection === "asc" ? "ascending" : "descending";

  return (
    <div className="HawkListing">
      <div className="HawkListing__leftPanel">
        <div className="HawkListing__addButtonContainer">
          <Button
            primary
            onClick={() => setShowEditor(true)}
            disabled={showEditor}
          >
            <i className="plus icon" /> Add hawk
          </Button>
        </div>
        <Input
          action={{
            icon: "filter",
            content: "Filter",
            onClick: () =>
              fetchHawks(filterInput, sortedColumn, sortedDirection)
          }}
          className="HawkListing__filterInput"
          placeholder="Filter by name, color, etc"
          onChange={onChangeFilterInput}
          onKeyDown={onEnterFilterInput}
          value={filterInput}
        />
        <Table sortable celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={
                  sortedColumn === "name" ? tableFormattedDirection : undefined
                }
                onClick={() => onSort("name")}
              >
                Name
              </Table.HeaderCell>
              <Table.HeaderCell
                className="HawkListing__tableCol"
                sorted={
                  sortedColumn === "size" ? tableFormattedDirection : undefined
                }
                onClick={() => onSort("size")}
              >
                Size
              </Table.HeaderCell>
              <Table.HeaderCell
                className="HawkListing__tableCol"
                sorted={
                  sortedColumn === "gender"
                    ? tableFormattedDirection
                    : undefined
                }
                onClick={() => onSort("gender")}
              >
                Gender
              </Table.HeaderCell>
              <Table.HeaderCell className="HawkListing__viewCol" />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {!hawks.length && (
              <Table.Row>
                <Table.Cell colSpan="4" className="HawkListing__emptyState">
                  <div>
                    <Header as="h2">
                      {!filterInput &&
                        "There aren't currently any hawks to display"}
                      {filterInput &&
                        "We couldn't find any hawks that match the filter input"}
                    </Header>
                  </div>
                  {!filterInput && (
                    <Button
                      primary
                      className="HawkListing__emptyStateAddButton"
                      onClick={() => setShowEditor(true)}
                      disabled={showEditor}
                    >
                      Add a hawk
                    </Button>
                  )}
                </Table.Cell>
              </Table.Row>
            )}
            {hawks.map(hawk => (
              <Table.Row key={hawk.id}>
                <Table.Cell data-testid="HawkListing__nameCol">
                  {hawk.name}
                </Table.Cell>
                <Table.Cell>{HawkSize[hawk.size]}</Table.Cell>
                <Table.Cell>{HawkGender[hawk.gender]}</Table.Cell>
                <Table.Cell className="HawkListing__viewCol">
                  <Button
                    onClick={() => onSelectHawk(hawk)}
                    disabled={!!selectedHawk && selectedHawk.id === hawk.id}
                  >
                    View <i className="angle double right icon" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <div>
        <Transition visible={showEditor} animation="scale" duration={500}>
          <div>
            <HawkEditor
              selectedHawk={selectedHawk}
              onCancel={onCancel}
              onSave={onSave}
            />
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default HawkListing;
