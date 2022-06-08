import styled from "styled-components/native";

const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.text.primary};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const home = (theme) => `
    color: black;
    margin-top: ${theme.space[6]};
    margin-bottom:  ${theme.space[1]};
    font-size: ${theme.fontSizes.h3};
    font-family: ${theme.fonts.heading};
    text-align: center;
`

const title = (theme) => `
    color: black;
    font-size: ${theme.fontSizes.body};
    font-weight: bold;
    flex: 1;
    text-align-vertical: center;
    text-align: center;
`

const buttonText = (theme) => `
    color: white;
    font-size: ${theme.fontSizes.body};
    font-weight: bold;
    flex: 1;
    text-align-vertical: center;
    text-align: center;
`

const header = (theme) => `
    color: black;
    margin-top: ${theme.space[6]};
    margin-bottom:  ${theme.space[1]};
    font-size: ${theme.fontSizes.h4};
    font-family: ${theme.fonts.heading};
    text-align: center;
`

const body = (theme) => `
    font-size: ${theme.fontSizes.body};
`;

const hint = (theme) => `
    font-size: ${theme.fontSizes.body};
`;

const error = (theme) => `
    color: ${theme.colors.text.error};
`;

const caption = (theme) => `
    font-size: ${theme.fontSizes.caption};
    font-weight: ${theme.fontWeights.bold};
`;

const label = (theme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.medium};
`;

const variants = {
    home,
    title,
    buttonText,
    header,
    body,
    label,
    caption,
    error,
    hint,
};

export const Text = styled.Text`
    ${({ theme }) => defaultTextStyles(theme)}
    ${({ variant, theme }) => variants[variant](theme)}
`;

Text.defaultProps = {
    variant: "body",
};