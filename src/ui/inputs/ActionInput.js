import React, { Component } from "react";
import { ExitButton, EventButton } from "./Button";
import SelectInput from "./SelectInput";

export default class ActionInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //const { ...rest } = this.props;

    return (
      <div
        style={{
          display: "flex",
          "flex-direction": "row",
          padding: "10px 8px",
          margin: "0px 8px",
          "border-top": "1px solid rgb(93, 100, 108)"
        }}
      >
        <div>
          <EventButton>∧</EventButton>
          <EventButton>∨</EventButton>
        </div>
        <div>
          <div>
            <div>{"Action"}</div>
            <div>
              <SelectInput options={[]} value={[]} classNamePrefix={"select"} />
            </div>
          </div>
          <div>
            <div>{"Target"}</div>
            <div>
              <SelectInput options={[]} value={[]} classNamePrefix={"select"} />
            </div>
          </div>
        </div>

        <div>
          <ExitButton>x</ExitButton>
        </div>
      </div>
    );
  }
}
