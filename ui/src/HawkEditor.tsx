import {
  Button,
  Form,
  Header,
  Input,
  Label,
  Select,
  TextArea,
  Transition
} from "semantic-ui-react";
import * as React from "react";
import "./HawkEditor.css";

const hawkSizeSelectOptions = [
  { key: "SMALL", value: "SMALL", text: "Small" },
  { key: "MEDIUM", value: "MEDIUM", text: "Medium" },
  { key: "LARGE", value: "LARGE", text: "Large" }
];

const hawkGenderSelectOptions = [
  { key: "FEMALE", value: "FEMALE", text: "Female" },
  { key: "MALE", value: "MALE", text: "Male" }
];

const HawkEditor: React.FC<{
  showEditor: boolean;
  onCancel: () => void;
  onSave: () => void;
}> = ({ showEditor, onCancel, onSave }) => (
  <Transition visible={showEditor} animation="scale" duration={500}>
    <div className="HawkEditor">
      <div className="HawkEditor__body">
        <Header as="h2">Add a new hawk</Header>
        <div className="HawkEditor__gridContainer">
          <Header textAlign="right" className="HawkEditor__header" as="h4">
            Name
          </Header>
          <Input fluid placeholder="What do you call it?" />
          <Header textAlign="right" className="HawkEditor__header" as="h4">
            Size
          </Header>
          <Select
            fluid
            data-testid="HawkEditor__sizeSelect"
            placeholder="Select size"
            options={hawkSizeSelectOptions}
          />
          <Header textAlign="right" className="HawkEditor__header" as="h4">
            Gender
          </Header>
          <Select
            fluid
            data-testid="HawkEditor__genderSelect"
            placeholder="Select gender"
            options={hawkGenderSelectOptions}
          />
        </div>
        <div className="HawkEditor__specsContainer">
          <Header textAlign="right" className="HawkEditor__header" as="h4">
            Length
          </Header>
          <Input fluid type="number" labelPosition="right">
            <Label basic>From</Label>
            <input data-testid="HawkEditor__lengthFrom" />
            <Label>cm</Label>
          </Input>
          <Input fluid type="number" labelPosition="right">
            <Label basic>To</Label>
            <input data-testid="HawkEditor__lengthTo" />
            <Label>cm</Label>
          </Input>
          <Header textAlign="right" className="HawkEditor__header" as="h4">
            Wingspan
          </Header>
          <Input fluid type="number" labelPosition="right">
            <Label basic>From</Label>
            <input data-testid="HawkEditor__wingspanFrom" />
            <Label>cm</Label>
          </Input>
          <Input fluid type="number" labelPosition="right">
            <Label basic>To</Label>
            <input data-testid="HawkEditor__wingspanTo" />
            <Label>cm</Label>
          </Input>
          <Header textAlign="right" className="HawkEditor__header" as="h4">
            Weight
          </Header>
          <Input fluid type="number" labelPosition="right">
            <Label basic>From</Label>
            <input data-testid="HawkEditor__weightFrom" />
            <Label>grams</Label>
          </Input>
          <Input fluid type="number" labelPosition="right">
            <Label basic>To</Label>
            <input data-testid="HawkEditor__weightTo" />
            <Label>grams</Label>
          </Input>
        </div>
        <Form>
          <div className="HawkEditor__gridContainer">
            <Header textAlign="right" className="HawkEditor__header" as="h4">
              URL
            </Header>
            <Input fluid placeholder="Where can we find it on the web?" />
            <Header textAlign="right" className="HawkEditor__header" as="h4">
              Color description
            </Header>
            <TextArea placeholder="Let me guess: brown?" />
            <Header textAlign="right" className="HawkEditor__header" as="h4">
              Behavior description
            </Header>
            <TextArea placeholder="What does it like to do in its free time?" />
            <Header textAlign="right" className="HawkEditor__header" as="h4">
              Habitat description
            </Header>
            <TextArea placeholder="Favorite chill spots?" />
          </div>
        </Form>
      </div>
      <div className="HawkEditor__footer">
        <Button onClick={onCancel}>Cancel</Button>
        <Button primary onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  </Transition>
);

export default HawkEditor;
