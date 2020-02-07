import { render, fireEvent } from "@testing-library/react";
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
      name: "Sweet hawk",
      size: "SMALL",
      gender: "FEMALE",
      lengthFrom: "50",
      lengthTo: "100",
      wingspanFrom: "50",
      wingspanTo: "100",
      weightFrom: "50",
      weightTo: "100",
      url: "https://google.com",
      color: "Prolly brown.",
      behavior: "They're super dope birbs.",
      habitat: "They live in pretty qewl places."
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
