import { fireEvent, render, RenderResult } from "@testing-library/react";
import HawkEditor, { HawkEditorProps } from "./HawkEditor";
import * as React from "react";
import { Hawk } from "./api";

describe("HawkEditor", () => {
  const onCancel = jest.fn();
  const onDelete = jest.fn();
  const onSave = jest.fn();

  test("can be closed", () => {
    const { getByText } = subject();

    fireEvent.click(getByText("Cancel"));

    expect(onCancel).toHaveBeenCalled();
  });

  test("can be saved", async () => {
    const editor = subject();
    const { getByText, queryByDisplayValue } = editor;

    populateHawk(editor);

    fireEvent.click(getByText("Save"));

    expect(onSave).toHaveBeenCalledWith({
      id: 0,
      name: "Sweet hawk",
      size: "SMALL",
      gender: "FEMALE",
      lengthBegin: "50",
      lengthEnd: "100",
      wingspanBegin: "50",
      wingspanEnd: "100",
      weightBegin: "50",
      weightEnd: "100",
      pictureUrl: "https://google.com",
      colorDescription: "Prolly brown.",
      behaviorDescription: "They're super dope birbs.",
      habitatDescription: "They live in pretty qewl places."
    });

    expect(queryByDisplayValue("Sweet hawk")).toEqual(null);
  });

  test("a specific hawk can be loaded into the editor", () => {
    const selectedHawk: Hawk = {
      id: 1003,
      name: "An existing hawk",
      size: "LARGE",
      gender: "FEMALE",
      lengthBegin: "5",
      lengthEnd: "1",
      wingspanBegin: "3",
      wingspanEnd: "4",
      weightBegin: "9",
      weightEnd: "10",
      pictureUrl: "https://google.com",
      colorDescription: "Brownish.",
      behaviorDescription: "Acts cool.",
      habitatDescription: "Birbville."
    };
    const { getByDisplayValue, getByTestId, getByText } = subject({
      selectedHawk
    });

    getByText("Edit hawk");

    const { id, size, gender, ...hawkProperties } = selectedHawk;

    expect(
      getByTestId("HawkEditor__sizeSelect").innerHTML.includes("Large")
    ).toBeTruthy();

    expect(
      getByTestId("HawkEditor__genderSelect").innerHTML.includes("Female")
    ).toBeTruthy();

    Object.keys(hawkProperties).forEach(key => {
      getByDisplayValue(selectedHawk[key]);
    });
  });

  test("a specific hawk can be deleted", () => {
    const selectedHawk: Hawk = {
      id: 1003,
      name: "An existing hawk",
      size: "LARGE",
      gender: "FEMALE",
      lengthBegin: "5",
      lengthEnd: "1",
      wingspanBegin: "3",
      wingspanEnd: "4",
      weightBegin: "9",
      weightEnd: "10",
      pictureUrl: "https://google.com",
      colorDescription: "Brownish.",
      behaviorDescription: "Acts cool.",
      habitatDescription: "Birbville."
    };
    const { getByText } = subject({
      selectedHawk
    });

    fireEvent.click(getByText("Delete"));

    expect(onDelete).toHaveBeenCalledWith(selectedHawk.id);
  });

  test("delete is not an option for new hawks", () => {
    const { queryByText } = subject();

    expect(queryByText("Delete")).toEqual(null);
  });

  const populateHawk = (editor: RenderResult) => {
    const { getByPlaceholderText, getByTestId, getAllByText } = editor;

    fireEvent.change(getByPlaceholderText("What do you call it?"), {
      target: { value: "Sweet hawk" }
    });

    fireEvent.click(getByTestId("HawkEditor__sizeSelect"));
    fireEvent.click(getAllByText("Small")[1]);

    fireEvent.click(getByTestId("HawkEditor__genderSelect"));
    fireEvent.click(getAllByText("Female")[1]);

    fireEvent.change(getByTestId("HawkEditor__lengthFrom"), {
      target: { value: "50" }
    });

    fireEvent.change(getByTestId("HawkEditor__lengthTo"), {
      target: { value: "100" }
    });

    fireEvent.change(getByTestId("HawkEditor__wingspanFrom"), {
      target: { value: "50" }
    });

    fireEvent.change(getByTestId("HawkEditor__wingspanTo"), {
      target: { value: "100" }
    });

    fireEvent.change(getByTestId("HawkEditor__weightFrom"), {
      target: { value: "50" }
    });

    fireEvent.change(getByTestId("HawkEditor__weightTo"), {
      target: { value: "100" }
    });

    fireEvent.change(getByPlaceholderText("Where can we find it on the web?"), {
      target: { value: "https://google.com" }
    });

    fireEvent.change(getByPlaceholderText("Let me guess: brown?"), {
      target: { value: "Prolly brown." }
    });

    fireEvent.change(
      getByPlaceholderText("What does it like to do in its free time?"),
      {
        target: { value: "They're super dope birbs." }
      }
    );

    fireEvent.change(getByPlaceholderText("Favorite chill spots?"), {
      target: { value: "They live in pretty qewl places." }
    });
  };

  const subject = (props?: Partial<HawkEditorProps>) => {
    const defaultProps = {
      selectedHawk: null,
      showEditor: true,
      onCancel,
      onDelete,
      onSave
    };

    return render(<HawkEditor {...defaultProps} {...props} />);
  };
});
