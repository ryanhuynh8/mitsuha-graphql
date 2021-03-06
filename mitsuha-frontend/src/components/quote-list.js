import React, {Component} from 'react';
import styled from 'styled-components';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import QuoteItem from './quote-item';
import {grid, colors} from './constants';
import Title from './title';

const Wrapper = styled.div`
  background-color: ${({isDraggingOver}) => (isDraggingOver ? colors.blue.lighter : colors.blue.light)};
  display: flex;
  flex-direction: column;
  opacity: ${({isDropDisabled}) => (isDropDisabled ? 0.5 : 'inherit')};
  padding: ${grid}px;
  padding-bottom: 0;
  transition: background-color 0.1s ease, opacity 0.1s ease;
  user-select: none;
  width: 250px;
`;

const DropZone = styled.div`
  /* stop the list collapsing when empty */
  min-height: 250px;
  /* not relying on the items for a margin-bottom
  as it will collapse when the list is empty */
  margin-bottom: ${grid}px;
`;

const ScrollContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 300px;
`;

const Container = styled.div``;

class InnerQuoteList extends Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.quotes !== this.props.quotes) {
            return true;
        }

        return false;
    }

    render() {
        return (
            <div>
                {this.props.quotes.map((quote, index) => (
                    <Draggable key={quote.id} draggableId={quote.id} index={index}>
                        {(dragProvided, dragSnapshot) => (
                            <div>
                                <QuoteItem
                                    key={quote.id}
                                    quote={quote}
                                    isDragging={dragSnapshot.isDragging}
                                    provided={dragProvided}
                                    autoFocus={this.props.autoFocusQuoteId === quote.id}
                                />
                                {dragProvided.placeholder}
                            </div>
                        )}
                    </Draggable>
                ))}
            </div>
        );
    }
}

class InnerList extends Component {
    render() {
        const {quotes, dropProvided, autoFocusQuoteId} = this.props;
        const title = this.props.title ? (
            <Title>{this.props.title}</Title>
        ) : null;

        return (
            <Container>
                {title}
                <DropZone innerRef={dropProvided.innerRef}>
                    <InnerQuoteList
                        quotes={quotes}
                        autoFocusQuoteId={autoFocusQuoteId}
                    />
                    {dropProvided.placeholder}
                </DropZone>
            </Container>
        );
    }
}

export default class QuoteList extends Component {
    render() {
        const {
            ignoreContainerClipping,
            internalScroll,
            isDropDisabled,
            listId,
            listType,
            style,
            quotes,
            autoFocusQuoteId,
            title,
        } = this.props;

        return (
            <Droppable
                droppableId={listId}
                type={listType}
                ignoreContainerClipping={ignoreContainerClipping}
                isDropDisabled={isDropDisabled}
            >
                {(dropProvided, dropSnapshot) => (
                    <Wrapper
                        style={style}
                        isDraggingOver={dropSnapshot.isDraggingOver}
                        isDropDisabled={isDropDisabled}
                    >
                        {internalScroll ? (
                            <ScrollContainer>
                                <InnerList
                                    quotes={quotes}
                                    title={title}
                                    dropProvided={dropProvided}
                                    autoFocusQuoteId={autoFocusQuoteId}
                                />
                            </ScrollContainer>
                        ) : (
                            <InnerList
                                quotes={quotes}
                                title={title}
                                dropProvided={dropProvided}
                                autoFocusQuoteId={autoFocusQuoteId}
                            />
                        )}
                    </Wrapper>
                )}
            </Droppable>
        );
    }
}