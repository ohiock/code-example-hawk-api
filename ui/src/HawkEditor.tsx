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
import { Reducer, useReducer, useState } from "react";
import { Hawk } from "./api";

const hawkSizeSelectOptions = [
  { key: "SMALL", value: "SMALL", text: "Small" },
  { key: "MEDIUM", value: "MEDIUM", text: "Medium" },
  { key: "LARGE", value: "LARGE", text: "Large" }
];

const hawkGenderSelectOptions = [
  { key: "FEMALE", value: "FEMALE", text: "Female" },
  { key: "MALE", value: "MALE", text: "Male" }
];

const initialHawkState: Hawk = {
  name: "",
  size: "",
  gender: "",
  lengthFrom: "0",
  lengthTo: "0",
  wingspanFrom: "0",
  wingspanTo: "0",
  weightFrom: "0",
  weightTo: "0",
  url: "",
  color: "",
  behavior: "",
  habitat: ""
};

const HawkEditor: React.FC<{
  showEditor: boolean;
  onCancel: () => void;
  onSave: (hawk: Hawk) => void;
}> = ({ showEditor, onCancel, onSave }) => {
  const [hawk, setHawk] = useState<Hawk>(initialHawkState);

  return (
    <Transition visible={showEditor} animation="scale" duration={500}>
      <div className="HawkEditor">
        <div className="HawkEditor__body">
          <Header as="h2">Add a new hawk</Header>
          <div className="HawkEditor__gridContainer">
            <Header textAlign="right" className="HawkEditor__header" as="h4">
              Name
            </Header>
            <Input
              fluid
              placeholder="What do you call it?"
              value={hawk.name}
              onChange={e => setHawk({ ...hawk, name: e.target.value })}
            />
            <Header textAlign="right" className="HawkEditor__header" as="h4">
              Size
            </Header>
            <Select
              fluid
              data-testid="HawkEditor__sizeSelect"
              placeholder="Select size"
              options={hawkSizeSelectOptions}
              value={hawk.size}
              onChange={(e, { value }) =>
                setHawk({ ...hawk, size: value as string })
              }
            />
            <Header textAlign="right" className="HawkEditor__header" as="h4">
              Gender
            </Header>
            <Select
              fluid
              data-testid="HawkEditor__genderSelect"
              placeholder="Select gender"
              options={hawkGenderSelectOptions}
              value={hawk.gender}
              onChange={(e, { value }) =>
                setHawk({ ...hawk, gender: value as string })
              }
            />
          </div>
          <div className="HawkEditor__specsContainer">
            <Header textAlign="right" className="HawkEditor__header" as="h4">
              Length
            </Header>
            <Input
              fluid
              type="number"
              labelPosition="right"
              value={hawk.lengthFrom}
              onChange={(e, { value }) =>
                setHawk({ ...hawk, lengthFrom: value })
              }
            >
              <Label basic>From</Label>
              <input data-testid="HawkEditor__lengthFrom" />
              <Label>cm</Label>
            </Input>
            <Input
              fluid
              type="number"
              labelPosition="right"
              value={hawk.lengthTo}
              onChange={(e, { value }) => setHawk({ ...hawk, lengthTo: value })}
            >
              <Label basic>To</Label>
              <input data-testid="HawkEditor__lengthTo" />
              <Label>cm</Label>
            </Input>
            <Header textAlign="right" className="HawkEditor__header" as="h4">
              Wingspan
            </Header>
            <Input
              fluid
              type="number"
              labelPosition="right"
              value={hawk.wingspanFrom}
              onChange={(e, { value }) =>
                setHawk({ ...hawk, wingspanFrom: value })
              }
            >
              <Label basic>From</Label>
              <input data-testid="HawkEditor__wingspanFrom" />
              <Label>cm</Label>
            </Input>
            <Input
              fluid
              type="number"
              labelPosition="right"
              value={hawk.wingspanTo}
              onChange={(e, { value }) =>
                setHawk({ ...hawk, wingspanTo: value })
              }
            >
              <Label basic>To</Label>
              <input data-testid="HawkEditor__wingspanTo" />
              <Label>cm</Label>
            </Input>
            <Header textAlign="right" className="HawkEditor__header" as="h4">
              Weight
            </Header>
            <Input
              fluid
              type="number"
              labelPosition="right"
              value={hawk.weightFrom}
              onChange={(e, { value }) =>
                setHawk({ ...hawk, weightFrom: value })
              }
            >
              <Label basic>From</Label>
              <input data-testid="HawkEditor__weightFrom" />
              <Label>grams</Label>
            </Input>
            <Input
              fluid
              type="number"
              labelPosition="right"
              value={hawk.weightTo}
              onChange={(e, { value }) => setHawk({ ...hawk, weightTo: value })}
            >
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
              <Input
                fluid
                placeholder="Where can we find it on the web?"
                value={hawk.url}
                onChange={(e, { value }) => setHawk({ ...hawk, url: value })}
              />
              <Header textAlign="right" className="HawkEditor__header" as="h4">
                Color description
              </Header>
              <TextArea
                placeholder="Let me guess: brown?"
                value={hawk.color}
                onChange={(e, { value }) =>
                  setHawk({ ...hawk, color: value as string })
                }
              />
              <Header textAlign="right" className="HawkEditor__header" as="h4">
                Behavior description
              </Header>
              <TextArea
                placeholder="What does it like to do in its free time?"
                value={hawk.behavior}
                onChange={(e, { value }) =>
                  setHawk({ ...hawk, behavior: value as string })
                }
              />
              <Header textAlign="right" className="HawkEditor__header" as="h4">
                Habitat description
              </Header>
              <TextArea
                placeholder="Favorite chill spots?"
                value={hawk.habitat}
                onChange={(e, { value }) =>
                  setHawk({ ...hawk, habitat: value as string })
                }
              />
            </div>
          </Form>
        </div>
        <div className="HawkEditor__footer">
          <Button onClick={onCancel}>Cancel</Button>
          <Button primary onClick={() => onSave(hawk)}>
            Save
          </Button>
        </div>
      </div>
    </Transition>
  );
};

export default HawkEditor;
