import HawkListing from "./HawkListing";
import * as React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  wait
} from "@testing-library/react";
import { getAllHawks, Hawk, saveHawk } from "./api";

jest.mock("./api");

describe("HawkListing", () => {
  let hawks: Hawk[];

  beforeEach(() => {
    hawks = [
      {
        id: 1,
        name: "Cooper's Hawk",
        size: "small",
        gender: "male",
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
        size: "medium",
        gender: "male",
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
        size: "large",
        gender: "male",
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
      getAllByText(hawk.size);
      getAllByText(hawk.gender);
    });
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

    await wait(() =>
      getAllByTestId("HawkListing__nameCol").forEach((nameCol, i) => {
        expect(nameCol.textContent).toEqual(hawks[hawks.length - i - 1].name);
      })
    );
  });

  test("each table row has a view button", async () => {
    const { getAllByText, getByText } = subject();

    await waitForElement(() => getByText("Cooper's Hawk"));

    expect(getAllByText("View")).toHaveLength(3);
  });

  test("the table can be filtered by name", async () => {
    const { getAllByTestId, getByPlaceholderText, getByText } = subject();

    await waitForElement(() => getByText("Cooper's Hawk"));

    const input = getByPlaceholderText("Filter by name");
    const filterButton = getByText("Filter");

    fireEvent.change(input, { target: { value: "Cooper" } });
    fireEvent.click(filterButton);

    await wait(() =>
      expect(getAllByTestId("HawkListing__nameCol")).toHaveLength(1)
    );
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
    const { getByText, container } = subject();

    await waitForElement(() => getByText("Cooper's Hawk"));

    fireEvent.click(getByText("Add hawk"));

    await wait(() => getByText("Add a new hawk"));

    fireEvent.click(getByText("Save"));

    await wait(() => expect(saveHawk).toHaveBeenCalled());
    expect(getAllHawks).toHaveBeenCalled();
  });

  const subject = () => {
    return render(<HawkListing />);
  };
});
