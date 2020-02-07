import HawkListing, { HawkListingProps } from "./HawkListing";
import * as React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import { getAllHawks, Hawk, saveHawk } from "./api";
import { act } from "react-dom/test-utils";

jest.mock("./api", () => ({
  saveHawk: jest.fn().mockResolvedValue({})
}));

describe("HawkListing", () => {
  let hawks: Hawk[] = [];

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
  });

  test("displays a table of hawks", () => {
    const { getAllByText } = subject();

    hawks.forEach(hawk => {
      getAllByText(hawk.name);
      getAllByText(hawk.size);
      getAllByText(hawk.gender);
    });
  });

  test("the table has column headings", () => {
    const { getByText } = subject();

    getByText("Name");
    getByText("Size");
    getByText("Gender");
  });

  test("the table can be sorted by the name column", async () => {
    const { getByText, getAllByTestId } = subject();

    let allNameCols = getAllByTestId("HawkListing__nameCol");

    allNameCols.forEach((nameCol, i) => {
      expect(nameCol.textContent).toEqual(hawks[i].name);
    });

    fireEvent.click(getByText("Name"));
    fireEvent.click(getByText("Name"));

    allNameCols = getAllByTestId("HawkListing__nameCol");

    allNameCols.forEach((nameCol, i) => {
      expect(nameCol.textContent).toEqual(hawks[hawks.length - i - 1].name);
    });
  });

  test("each table row has a view button", () => {
    const { getAllByText } = subject();

    expect(getAllByText("View")).toHaveLength(3);
  });

  test("the table can be filtered by name", () => {
    const { getAllByTestId, getByPlaceholderText, getByText } = subject();

    const input = getByPlaceholderText("Filter by name");
    const filterButton = getByText("Filter");

    fireEvent.change(input, { target: { value: "Cooper" } });
    fireEvent.click(filterButton);

    const allNameCols = getAllByTestId("HawkListing__nameCol");

    expect(allNameCols).toHaveLength(1);
  });

  test("there is an empty state when no hawks exist", () => {
    hawks = [];

    const { getByText } = subject();

    getByText("There aren't currently any hawks to display");
    getByText("Add a hawk");
  });

  test("the hawk editor can be opened", () => {
    const { getByText } = subject();

    fireEvent.click(getByText("Add hawk"));

    getByText("Add a new hawk");
  });

  test("a hawk can be saved", async () => {
    const { getByText } = subject();

    await act(async () => {
      fireEvent.click(getByText("Add hawk"));

      await waitForElement(() => getByText("Add a new hawk"));

      fireEvent.click(getByText("Save"));
    });

    expect(saveHawk).toHaveBeenCalled();
  });

  const subject = (props?: HawkListingProps) => {
    const defaultProps: HawkListingProps = {
      hawks
    };

    return render(<HawkListing {...defaultProps} {...props} />);
  };
});
