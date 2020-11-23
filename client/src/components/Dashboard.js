import React, { Component } from 'react'
import Header from './Header'
import InstanceDetailsCard from './InstanceDetailsCard'
import InstanceTable from './InstanceTable'
import Container from '@material-ui/core/Container';
import { connect } from "react-redux";
import {getInstances,toogleType,stopInstances,startInstances} from "../action";

export class Dashboard extends Component {
    constructor(){
        super();
        this.state={
            instances:[]
        }
    }
    componentDidMount(){
        this.props.getInstance();
    }
    render() {
        return (
            <>
                <Header />
                <Container maxWidth="lg">
                <InstanceDetailsCard instances={this.props.instances} type={this.props.type} toogleType={this.props.toogleType}/>
                <InstanceTable startInstances={this.props.startInstances} stopInstances={this.props.stopInstances} instances={this.props.instances} type={this.props.type}/>
                </Container>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        instances: state.instancedetails.instances,
        type: state.type
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getInstance: () => dispatch(getInstances()),
        toogleType: () =>dispatch(toogleType()),
        startInstances: (id) =>dispatch(startInstances(id)),
        stopInstances: (id) =>dispatch(stopInstances(id))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);