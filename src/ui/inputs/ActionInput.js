import React, { Component } from "react";
import * as css from "./ActionButtons";
import SelectInput from "./SelectInput";

export default class ActionInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //const { ...rest } = this.props;

    return (
      <div>
        <css.ActionGroup>
          <css.ActionButtonGroup>
            <css.ActionButton>∧</css.ActionButton>
            <css.ActionButton>∨</css.ActionButton>
          </css.ActionButtonGroup>

          <css.ActionMain>
            <css.ActionProperty>
              <css.ActionLabelDiv>
                <css.ActionLabel>{"Action"}</css.ActionLabel>
              </css.ActionLabelDiv>
              <css.ActionSelection>
                <SelectInput options={[]} value={[]} classNamePrefix={"select"} />
              </css.ActionSelection>
            </css.ActionProperty>

            <css.ActionProperty>
              <css.ActionLabelDiv>
                <css.ActionLabel>{"Target"}</css.ActionLabel>
              </css.ActionLabelDiv>
              <css.ActionSelection>
                <SelectInput options={[]} value={[]} classNamePrefix={"select"} />
              </css.ActionSelection>
            </css.ActionProperty>
          </css.ActionMain>
          <css.DeleteButtonMain>
            <css.DeleteButton>x</css.DeleteButton>
          </css.DeleteButtonMain>
        </css.ActionGroup>
      </div>
    );
  }
}
