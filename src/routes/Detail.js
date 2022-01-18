import React from 'react'
import { useParams } from "react-router-dom"
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components'

const GET_MOVIE = gql`
    query getMovie($id: Int!){
        movie(id: $id){
            title
            medium_cover_image
            language
            rating
            description_intro
            isLiked @client
        }
        suggestions(id: $id){
            id
            medium_cover_image
        }
    }
`

const Container = styled.div`
    height: 100vh;
    background-image: linear-gradient(-45deg, #d754ab, #fd723a);
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: white;
`
const Column = styled.div`
    margin-left: 10px;
    width: 50%;
`
const Title = styled.h1`
    font-size: 65px;
    margin-bottom: 15px;
`
const SubTitle = styled.h4`
    font-size: 35px;
    margin-bottom: 10px;
`
const Description = styled.p`
    font-size: 28px;
`
const Poster = styled.div`
    width: 25%;
    background-color: transparent;
    height: 60%;
    background-image: url(${props => props.bg});
    background-size: cover;
    background-position: center center;
`

export default () => {
    const {id} = useParams();
    const { loading, error, data } = useQuery(GET_MOVIE, {
        variables: { id: +id },
    });
    return(
        <Container>
            <Column>
                <Title>{loading ? "Loading..." : `${data.movie.title} ${data.movie.isLiked ? "❤" : "🖤"}`}</Title>
                        <SubTitle>
                            {data?.movie?.language} · {data?.movie?.rating}
                        </SubTitle>
                        <Description>{data?.movie?.description_intro}</Description>    
            </Column>
            {/* <Poster bg={data && data.movie ? data.movie.medium_cover_image : ""}></Poster> */}
            <Poster bg={data?.movie?.medium_cover_image}></Poster>  {/* Optional Chaining */}
        </Container>
    )
}