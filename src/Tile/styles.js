import styled from "styled-components"

export const TileWrapper = styled.div`
    height: 50px;
    width: 50px;
    background-color: ${props => props.tileColor};    
    margin: 5px 5px 5px 5px;
    display: inline-block;

    // The float property removes the element from the normal flow of the page
    // This means that any other text or inline elements close to it will wrap around it
    // In this case, it's used to prevent the element from changing position when something
    // is rendered inside it
    float: left;
`;