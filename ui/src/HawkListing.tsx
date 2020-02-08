import React, { useEffect, useState } from "react";
import { Button, Header, Input, Table, Transition } from "semantic-ui-react";
import "./HawkListing.css";
import { getAllHawks, Hawk, saveHawk } from "./api";
import HawkEditor from "./HawkEditor";
import { HawkGender, HawkSize } from "./util";

const HawkListing: React.FC = () => {
  const [hawks, setHawks] = useState<Hawk[]>([]);
  const [filterInput, setFilterInput] = useState<string>("");
  const [filterQuery, setFilterQuery] = useState<string>("");
  const [sortedColumn, setSortedColumn] = useState<string>("");
  const [direction, setDirection] = useState<"ascending" | "descending">(
    "ascending"
  );
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [selectedHawk, setSelectedHawk] = useState<Hawk | null>(null);

  const fetchHawks = async () =>
    await getAllHawks().then(allHawks => setHawks(allHawks));

  useEffect(() => {
    fetchHawks();
  }, []);

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

  const onCancel = () => {
    setShowEditor(false);
    setSelectedHawk(null);
  };

  const onSave = async (hawk: Hawk) => {
    await saveHawk(hawk);
    await fetchHawks();

    setShowEditor(false);
  };

  const onSelectHawk = (hawk: Hawk) => {
    setSelectedHawk(hawk);
    setShowEditor(true);
  };

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
    <div className="HawkListing__mainContainer">
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
            {!sortedHawks.length && (
              <Table.Row>
                <Table.Cell colSpan="4" className="HawkListing__emptyState">
                  <div>
                    <Header as="h2">
                      There aren't currently any hawks to display
                    </Header>
                  </div>
                  <Button
                    primary
                    onClick={() => setShowEditor(true)}
                    disabled={showEditor}
                  >
                    Add a hawk
                  </Button>
                </Table.Cell>
              </Table.Row>
            )}
            {sortedHawks.map(hawk => (
              <Table.Row key={hawk.id}>
                <Table.Cell data-testid="HawkListing__nameCol">
                  {hawk.name}
                </Table.Cell>
                <Table.Cell>{HawkSize[hawk.size]}</Table.Cell>
                <Table.Cell>{HawkGender[hawk.gender]}</Table.Cell>
                <Table.Cell className="HawkListing__viewCol">
                  <Button onClick={() => onSelectHawk(hawk)}>
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
