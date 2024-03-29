import React, { Component } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,        //Bootstrap Classes
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

class AppNavbar extends Component{
    
    state={
            isOpen : false
        }


    

    toggle = () => {
        this.setState(
            {isOpen : !this.state.isOpen}
        )
    }

   

    render(){
        return(
            <div>
                <Navbar
                    color="dark"
                    dark expand="sm"
                    className="mb-5"    
                >
                    <Container>
                        <NavbarBrand
                            href="#"
                        >
                            ShoppingList
                        </NavbarBrand>

                        <NavbarToggler
                            onClick = {this.toggle}
                            
                        />

                        

                        <Collapse isOpen = {this.state.isOpen} navbar > 
                        {/* navbar indicates that this is meant to be a list,try removing it */}
                            <Nav navbar>

                                <NavItem>
                                    <NavLink href="https://github.com/PSouza-10" >
                                        Github
                                    </NavLink>
                                </NavItem>

                            </Nav>
                        </Collapse>
                        
                    </Container>
                </Navbar>
            </div>
        )
    }
}

export default AppNavbar;