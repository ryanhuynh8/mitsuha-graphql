import React, {Component} from 'react';
import styled, {injectGlobal} from 'styled-components';
// import { action } from '@storybook/addon-actions';
import Column from './Column';
import {grid, colors, borderRadius} from './constants';
import reorder, {reorderQuoteMap} from './reorder';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';

// const publishOnDragStart = action('onDragStart');
// const publishOnDragEnd = action('onDragEnd');

const ParentContainer = styled.div`
  height: ${({height}) => height};
  overflow-x: hidden;
  overflow-y: auto;
`;

const Container = styled.div`
  min-height: 100vh;
  /* like display:flex but will allow bleeding over the window width */
  min-width: 100vw;
  display: inline-flex;
`;


export default class Board extends Component {
    state = {
        columns: this.props.initial,
        ordered: Object.keys(this.props.initial),
        autoFocusQuoteId: null,
    };

    boardRef = null;

    componentDidMount() {
        injectGlobal`
      body {
        background: ${colors.blue.deep};
      }
    `;
    }

    onDragStart = (initial) => {
        // publishOnDragStart(initial);

        this.setState({
            autoFocusQuoteId: null,
        });
    };

    onDragEnd = (result) => {
        // publishOnDragEnd(result);

        console.log(result);
        // dropped nowhere
        if (!result.destination) {
            return;
        }

        const source = result.source;
        const destination = result.destination;

        // reordering column
        if (result.type === 'COLUMN') {
            const ordered = reorder(
                this.state.ordered,
                source.index,
                destination.index
            );

            this.setState({
                ordered,
            });

            return;
        }

        const data = reorderQuoteMap({
            quoteMap: this.state.columns,
            source,
            destination,
        });

        this.setState({
            columns: data.quoteMap,
            autoFocusQuoteId: data.autoFocusQuoteId,
        });
    };

    render() {
        const columns = this.state.columns;
        const ordered = this.state.ordered;
        const {containerHeight} = this.props;

        const board = (
            <Droppable
                droppableId="board"
                type="COLUMN"
                direction="horizontal"
                ignoreContainerClipping={Boolean(containerHeight)}
            >
                {(provided) => (
                    <Container innerRef={provided.innerRef}>
                        {ordered.map((key, index) => (
                            <Column
                                key={key}
                                index={index}
                                title={key}
                                quotes={columns[key]}
                                autoFocusQuoteId={this.state.autoFocusQuoteId}
                            />
                        ))}
                    </Container>
                )}
            </Droppable>
        );

        return (
            <DragDropContext
                onDragStart={this.onDragStart}
                onDragEnd={this.onDragEnd}
            >
                {this.props.containerHeight ? (
                    <ParentContainer height={containerHeight}>{board}</ParentContainer>
                ) : (
                    board
                )}
            </DragDropContext>
        );
    }
}