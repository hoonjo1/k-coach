import styled from "styled-components/native";
import { colors } from "../colors";
import { actuatedNormalize } from "../fontSize";

export const TextInput = styled.TextInput`
  /* background-color: rgba(0, 0, 0, 0.25); */
  /* font-family: "Gyunggi-title-Light"; */
  padding: 15px 7px;
  border-radius: 4px;
  color: ${colors.scoreNotBad};
  font-size: ${actuatedNormalize(14)};
  margin-bottom: ${(props) => (props.lastOne ? "30" : 8)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.nGrey};
`;
