import styled from 'styled-components/native';
import { View, Text, Image } from 'react-native';
import { Card, Title } from 'react-native-paper';

export const PostCard = styled(Card)`
    margin: ${(props) => props.theme.space[4]};
    margin-bottom: ${(props) => props.theme.space[3]};
    border-radius: ${(props) => props.theme.space[1]};
`

export const UserDetails = styled(View)`
    flex-direction: row;
    padding-horizontal: 15px;
`

export const PostDetails = styled(Card.Content)`
    padding-horizontal: 15px;
    padding-bottom: ${(props) => props.theme.space[3]};
    padding-top: ${(props) => props.theme.space[1]};
    display: flex;
`

export const PostCardCover = styled(Card.Cover)`
    padding: ${(props) => props.theme.space[3]};
    background-color: white;
`