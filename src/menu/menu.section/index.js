import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";

export default function MenuSection({ item, index }) {
  const grid = 8;
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,

    // change background colour if dragging
    background: isDragging ? "#eff5ff" : "",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  return (
    <Draggable draggableId={item.title} index={index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <p>{item.title}</p>
        </Container>
      )}
    </Draggable>
  );
}

const Container = styled.div``;
