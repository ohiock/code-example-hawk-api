import { fireEvent, render } from "@testing-library/react";
import HawkEditor from "./HawkEditor";
import * as React from "react";

describe("HawkEditor", () => {
  const onCancel = jest.fn();
  const onSave = jest.fn();

  test("can be closed", () => {
    const { getByText } = subject();

    fireEvent.click(getByText("Cancel"));

    expect(onCancel).toHaveBeenCalled();
  });

  test("can be saved", () => {
    const {
      getByPlaceholderText,
      getByTestId,
      getByText,
      getAllByText
    } = subject();

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
  });

  const subject = () => {
    const defaultProps = {
      showEditor: true,
      onCancel,
      onSave
    };

    return render(<HawkEditor {...defaultProps} />);
  };
});
