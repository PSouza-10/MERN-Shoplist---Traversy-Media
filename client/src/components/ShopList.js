import React, { Component } from 'react'
import {Container,ListGroup,ListGroupItem, Button} from 'reactstrap'
import {CSSTransition,TransitionGroup} from 'react-transition-group'
import {connect} from 'react-redux'
import {getItem,delItem} from '../actions/itemActions'
import PropTypes from 'prop-types'

class ShopList extends Component {
  
    componentDidMount(){
        this.props.getItem()
    }

    onDelete = (_id) => { 
        this.props.delItem(_id)
    }
    render(){

        const {items} = this.props.item

        return(
            <Container>
              
                <ListGroup>
                    <TransitionGroup>
                        {items.map( ( {_id,name} ) => (
                            <CSSTransition
                                classNames="fade"
                                key={_id} 
                                timeout={500}
                            >
                                <ListGroupItem
                                >
                                    <Button
                                        color="danger"
                                        className="remove-btn"
                                        style={{marginRight: '5rem'}}
                                        size="sm"
                                        onClick={this.onDelete.bind(this,_id)}
                                    >&times;</Button>
                                    {name}

                                </ListGroupItem>

                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}

ShopList.propTypes = {
    getItem : PropTypes.func.isRequired,
    delItem : PropTypes.func.isRequired,
    item : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  item : state.item
});

export default connect(mapStateToProps,{getItem,delItem})(ShopList)