import styled from 'styled-components/native';
import { View, Text } from 'react-native';
import { Card } from 'react-native-paper';

export const PostCard = styled(Card)`
    margin: ${(props) => props.theme.space[2]} ${(props) => props.theme.space[4]};
    margin-bottom: ${(props) => props.theme.space[1]};
    border-radius: ${(props) => props.theme.space[1]};
`

export const UserDetails = styled(View)`
    flex-direction: row;
    padding-horizontal: 15px;
`

export const UserDetailsText = styled(Text)`
    font-size: 15px;
`

export const PostDetails = styled(Card.Content)`
    padding-horizontal: 15px;
    padding-bottom: ${(props) => props.theme.space[3]};
    padding-top: ${(props) => props.theme.space[1]};
    display: flex;
`

export const BottomContainer = styled(View)`
    flex-direction: row;
    border-top-color: #e6e6e6;
    border-top-width: 1px;
    justify-content: space-evenly;
    padding-top: 8px;
    padding-horizontal: 10px;
`

export const Months = [
    'Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', "Dec"
]