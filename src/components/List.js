import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import styled from "styled-components";

const ListItemsContainer = styled.div`
margin-bottom: 6px;`

const ListItemContainer = styled.div`
background-color: white;
border-radius: 8px;
height: 30px;
display: flex;
align-items: center;
justify-content: center;
margin-bottom: 10px;
padding: 5px 0;
`

const Ol = styled.ol`
  display: flex;
  list-style-type: none;
  padding: 20px;
  margin: 0;
`;

const Li = styled.li`
  width: 240px;
  color: #594138;
`;

const Button = styled.button`
  border: none;
  background: none;
`;

const List = ({ items, editItem, removeItem }) => {
  return (
    <ListItemsContainer>
      {items.map((item, index) => {
        const { id, title } = item;
        return (
          <ListItemContainer key={id}>
          <Ol >
            <Li>
              {index + 1}. {title}
            </Li>
            <Button
              style={{ color: "#557C55" }}
              onClick={() => editItem(id, title)}
            >
              <FaEdit />
            </Button>

            <Button style={{ color: "#C9485B" }} onClick={() => removeItem(id)}>
              <FaTrash />
            </Button>
          </Ol>
          </ListItemContainer>
        );
      })}
    </ListItemsContainer>
  );
};
export default List;
