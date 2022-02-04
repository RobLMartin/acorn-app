import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useMenu } from "../../app/contexts/menu.context";
import MenuSection from "../menu.section";

export default function MenuDroppable() {
  const { menu, updateMenu } = useMenu();

  const onDragEnd = (result) => {
    // if dropped outside the list
    if (!result.destination) {
      return;
    }

    // update item key;
    const newItems = updateItems(result.destination, result.source);

    updateMenu({ ...menu, sectionOrder: newItems });
  };

  const updateItems = (destination, source) => {
    const menuCopy = [...menu.sectionOrder];
    const removedItem = menuCopy.splice(source.index, 1);
    menuCopy.splice(destination.index, 0, removedItem[0]);
    return menuCopy;
  };

  const getItemStyle = () => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,

    // change background colour if dragging
    background: "#eff5ff",
  });

  const grid = 8;
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="menu">
        {(provided, snapshot) => (
          <Container
            {...provided.droppableProps}
            ref={provided.innerRef}
            snapshot={snapshot}
            style={getItemStyle()}
          >
            {menu.sectionOrder.map((item, index) => (
              <MenuSection
                key={menu.sectionDetails[item].title}
                item={menu.sectionDetails[item]}
                index={index}
              />
            ))}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}

const Container = styled.div``;
