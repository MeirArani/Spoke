import styled from "styled-components";
import { Button } from "./Button";

export const ActionGrouping = styled.div`
  display: flex;
  min-height: 24px;
  flex-direction: column;
  margin-right: 20px;
`;

export const ActionGroup = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 8px;
  margin: 0px 8px;
  border-top: 1px solid rgb(93, 100, 108);
`;

// Buttons

export const ActionButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 70px;
  -moz-box-pack: center;
  justify-content: center;
  padding: 5px;
`;

export const ActionButton = styled(Button)`
  display: flex;
  border: medium;
  border-radius: 4px;
  background: rgb(0, 110, 255);
  color: rgb(255, 255, 255);
  white-space: nowrap;
  min-height: 24px;
  font-size: 12px;
  font-family: "Lato", sans-serif;
  text-align: center;
  cursor: pointer;
  -moz-box-align: center;
  align-items: center;
  -moz-box-pack: center;
  justify-content: center;
  text-decoration: none;
  padding: 1px 6px;
  margin: 5px 0px;

  &:hover {
    color: rgb(255, 255, 255);
    background-color: rgb(5, 84, 188);
  }

  &:disabled {
    background: rgb(34, 34, 34);
    color: grey;
  }
`;

// Action Select

export const ActionMain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ActionProperty = styled.div`
  display: flex;
  flex-direction: row;
  -moz-box-align: center;
  align-items: center;
  padding: 2px 0px;
`;

export const ActionLabelDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 70px;
  -moz-box-align: center;
  align-items: center;
  -moz-box-pack: center;
  justify-content: center;
`;

export const ActionLabel = styled.label`
  font-weight: bold;
  color: rgb(255, 255, 255);
  padding-right: 8px;
`;

export const ActionSelection = styled.div`
  flex-direction: row;
  flex: 2 1 0%;
  -moz-box-align: center;
  align-items: center;
  display: flex;
`;

// Delete Button

export const DeleteButtonMain = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DeleteButton = styled(Button)`
  display: flex;
  border: medium;
  border-radius: 4px;
  background: rgb(204, 48, 48);
  color: rgb(255, 255, 255);
  white-space: nowrap;
  font-family: "Lato", sans-serif;
  text-align: center;
  cursor: pointer;
  -moz-box-align: center;
  align-items: center;
  -moz-box-pack: center;
  justify-content: center;
  text-decoration: none;
  padding: 3px;
  min-width: 25px;
  min-height: 25px;
  font-size: 15px;

  &:hover {
    color: rgb(255, 255, 255);
    background-color: rgb(5, 84, 188);
  }
`;
