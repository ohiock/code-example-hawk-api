import HawkListing from "./HawkListing";
import * as React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  wait
} from "@testing-library/react";
import { deleteHawk, getAllHawks, Hawk, saveHawk, updateHawk } from "./api";
import { HawkSize } from "./util";

jest.mock("./api");

describe("HawkListing", () => {
  let hawks: Hawk[];

  beforeEach(() => {
    (getAllHawks as jest.Mock).mockClear();

    hawks = [
      {
        id: 1,
        name: "Cooper's Hawk",
        size: "SMALL",
        gender: "MALE",
        wingspanBegin: "",
        wingspanEnd: "",
        weightBegin: "",
        weightEnd: "",
        lengthBegin: "",
        lengthEnd: "",
        colorDescription: "",
        behaviorDescription: "",
        habitatDescription: "",
        pictureUrl: ""
      },
      {
        id: 2,
        name: "Ferruginous Hawk",
        size: "MEDIUM",
        gender: "FEMALE",
        wingspanBegin: "",
        wingspanEnd: "",
        weightBegin: "",
        weightEnd: "",
        lengthBegin: "",
        lengthEnd: "",
        colorDescription: "",
        behaviorDescription: "",
        habitatDescription: "",
        pictureUrl: ""
      },
      {
        id: 3,
        name: "Swainson's Hawk",
        size: "LARGE",
        gender: "MALE",
        wingspanBegin: "",
        wingspanEnd: "",
        weightBegin: "",
        weightEnd: "",
        lengthBegin: "",
        lengthEnd: "",
        colorDescription: "",
        behaviorDescription: "",
        habitatDescription: "",
        pictureUrl: ""
      }
    ];

    (getAllHawks as jest.Mock).mockResolvedValue(hawks);
  });

  test("displays a table of hawks", async () => {
    const { getAllByText, getByText } = subject();

    await waitForElement(() => getByText("Cooper's Hawk"));

    hawks.forEach(hawk => {
      getByText(hawk.name);
      getByText(HawkSize[hawk.size]);
    });

    expect(getAllByText("Male")).toHaveLength(2);
    expect(getAllByText("Female")).toHaveLength(1);
  });

  test("the table has column headings", async () => {
    const { getByText } = subject();

    await waitForElement(() => getByText("Cooper's Hawk"));

    getByText("Name");
    getByText("Size");
    getByText("Gender");
  });

  test("the table can be sorted by the name column", async () => {
    const { getByText, getAllByTestId } = subject();

    await waitForElement(() => getByText("Cooper's Hawk"));

    getAllByTestId("HawkListing__nameCol").forEach((nameCol, i) => {
      expect(nameCol.textContent).toEqual(hawks[i].name);
    });

    fireEvent.click(getByText("Name"));
    fireEvent.click(getByText("Name"));
    fireEvent.click(getByText("Name"));

    await wait(() =>
      expect(getAllHawks).toHaveBeenNthCalledWith(4, {
        filter: "",
        sortField: "name",
        sortDir: "desc"
      })
    );
  });

  test("the table can be filtered", async () => {
    const { getByPlaceholderText, getByText } = subject();

    await waitForElement(() => getByText("Cooper's Hawk"));

    const input = getByPlaceholderText("Filter by name, color, etc");
    const filterButton = getByText("Filter");

    fireEvent.change(input, { target: { value: "Cooper" } });
    fireEvent.click(filterButton);

    await wait(() =>
      expect(getAllHawks).toHaveBeenNthCalledWith(2, {
        filter: "Cooper",
        sortField: "",
        sortDir: "asc"
      })
    );
  });

  test("displays empty state when filtering without any results", async () => {
    const { getByPlaceholderText, getByText, queryAllByText } = subject();

    await waitForElement(() => getByText("Cooper's Hawk"));

    (getAllHawks as jest.Mock).mockResolvedValue([]);

    const input = getByPlaceholderText("Filter by name, color, etc");
    const filterButton = getByText("Filter");

    fireEvent.change(input, {
      target: { value: "Something that won't return results" }
    });
    fireEvent.click(filterButton);

    await wait(() =>
      getByText("We couldn't find any hawks that match the filter input")
    );
    expect(queryAllByText("Add a hawk")).toHaveLength(0);
  });

  test("each table row has a view button", async () => {
    const { getAllByText, getByText } = subject();

    await waitForElement(() => getByText("Cooper's Hawk"));

    expect(getAllByText("View")).toHaveLength(3);
  });

  test("there is an empty state when no hawks exist", async () => {
    (getAllHawks as jest.Mock).mockResolvedValue([]);

    const { getByText } = subject();

    await waitForElement(() =>
      getByText("There aren't currently any hawks to display")
    );
    getByText("Add a hawk");
  });

  test("the hawk editor can be opened", async () => {
    const { getByText } = subject();

    await waitForElement(() => getByText("Cooper's Hawk"));

    fireEvent.click(getByText("Add hawk"));

    getByText("Add a new hawk");
  });

  test("a hawk can be saved", async () => {
    const { getByText } = subject();

    await waitForElement(() => getByText("Cooper's Hawk"));

    fireEvent.click(getByText("Add hawk"));

    await wait(() => getByText("Add a new hawk"));

    fireEvent.click(getByText("Save"));

    await wait(() => expect(saveHawk).toHaveBeenCalled());
    expect(getAllHawks).toHaveBeenCalled();
  });

  test("a hawk can be updated", async () => {
    const { getByText, getAllByText, getByDisplayValue } = subject();

    await waitForElement(() => getByText("Cooper's Hawk"));

    fireEvent.click(getAllByText("View")[0]);

    await wait(() => getByText("Edit hawk"));

    fireEvent.change(getByDisplayValue("Cooper's Hawk"), {
      target: { value: "Qooper's Hawk" }
    });
    fireEvent.click(getByText("Save"));

    await wait(() => expect(updateHawk).toHaveBeenCalled());
    expect(getAllHawks).toHaveBeenCalled();
  });

  test("a hawk can be deleted", async () => {
    const { getByText, getAllByText, getByDisplayValue } = subject();

    await waitForElement(() => getByText("Cooper's Hawk"));

    fireEvent.click(getAllByText("View")[0]);

    await wait(() => getByText("Edit hawk"));

    fireEvent.click(getByText("Delete"));

    await wait(() => expect(deleteHawk).toHaveBeenCalled());
    expect(getAllHawks).toHaveBeenCalled();
  });

  test("opens the hawk editor with a specific hawk when its view button is clicked", async () => {
    const { getByText, getAllByText, getByDisplayValue } = subject();

    await waitForElement(() => getByText("Cooper's Hawk"));

    fireEvent.click(getAllByText("View")[0]);

    await waitForElement(() => getByText("Edit hawk"));

    getByDisplayValue("Cooper's Hawk");
  });

  const subject = () => {
    return render(<HawkListing />);
  };
});
