import {
  Button,
  DropdownProps,
  Form,
  Header,
  Input,
  Label,
  Select,
  TextArea,
  Transition
} from "semantic-ui-react";
import * as React from "react";
import { useState } from "react";
import "./HawkEditor.css";
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
  id: 0,
  name: "",
  gender: "",
  size: "",
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
};

const HawkEditor: React.FC<{
  showEditor: boolean;
  onCancel: () => void;
  onSave: (hawk: Hawk) => void;
}> = ({ showEditor, onCancel, onSave }) => {
  const [hawk, setHawk] = useState<Hawk>(initialHawkState);

  const onCancelLocal = () => {
    setHawk(initialHawkState);
    onCancel();
  };

  const onSaveLocal = () => {
    setHawk(initialHawkState);
    onSave(hawk);
  };

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
              value={hawk.lengthBegin}
              onChange={(e, { value }) =>
                setHawk({ ...hawk, lengthBegin: value })
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
              value={hawk.lengthEnd}
              onChange={(e, { value }) =>
                setHawk({ ...hawk, lengthEnd: value })
              }
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
              value={hawk.wingspanBegin}
              onChange={(e, { value }) =>
                setHawk({ ...hawk, wingspanBegin: value })
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
              value={hawk.wingspanEnd}
              onChange={(e, { value }) =>
                setHawk({ ...hawk, wingspanEnd: value })
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
              value={hawk.weightBegin}
              onChange={(e, { value }) =>
                setHawk({ ...hawk, weightBegin: value })
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
              value={hawk.weightEnd}
              onChange={(e, { value }) =>
                setHawk({ ...hawk, weightEnd: value })
              }
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
                value={hawk.pictureUrl}
                onChange={(e, { value }) =>
                  setHawk({ ...hawk, pictureUrl: value })
                }
              />
              <Header textAlign="right" className="HawkEditor__header" as="h4">
                Color description
              </Header>
              <TextArea
                placeholder="Let me guess: brown?"
                value={hawk.colorDescription}
                onChange={(e, { value }) =>
                  setHawk({ ...hawk, colorDescription: value as string })
                }
              />
              <Header textAlign="right" className="HawkEditor__header" as="h4">
                Behavior description
              </Header>
              <TextArea
                placeholder="What does it like to do in its free time?"
                value={hawk.behaviorDescription}
                onChange={(e, { value }) =>
                  setHawk({ ...hawk, behaviorDescription: value as string })
                }
              />
              <Header textAlign="right" className="HawkEditor__header" as="h4">
                Habitat description
              </Header>
              <TextArea
                placeholder="Favorite chill spots?"
                value={hawk.habitatDescription}
                onChange={(e, { value }) =>
                  setHawk({ ...hawk, habitatDescription: value as string })
                }
              />
            </div>
          </Form>
        </div>
        <div className="HawkEditor__footer">
          <Button onClick={onCancelLocal}>Cancel</Button>
          <Button primary onClick={onSaveLocal}>
            Save
          </Button>
        </div>
      </div>
    </Transition>
  );
};

export default HawkEditor;
