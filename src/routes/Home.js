import React from "react";
import {gql} from 'apollo-boost';
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components"
import Movie from "../components/Movie"

const GET_MOVIES = gql`
    {
        movies{
            id
            medium_cover_image
        }
    }
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Title = styled.h1`
    font-size: 35px;
`
const SubTitle = styled.h3`
    font-size: 35px;
`

const Loading = styled.div`
    font-size: 18px;
    opacity: 0.5;
    font-weight: 500;
    margin-top: 10px;
`

export default () => {
    const {loading, data} = useQuery(GET_MOVIES);
    return(
        <Container>
            <Header>
                <Title>Apollo Movie</Title>
                <SubTitle>I Love GraphQL</SubTitle>
            </Header>
            {loading && <Loading>Loading...</Loading>}
            {!loading && 
                data.movies && 
                data.movies.map(m => <Movie key={m.id} id={m.id} />)}
        </Container>
    )
}