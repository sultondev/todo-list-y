import React, { Component } from "react";

export default class ItemAddForm extends Component {
    state = {
        label: "",
    };

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value,
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.label.length === 0) {
            return;
        }
        this.props.onAddItem(this.state.label);
        this.setState({ label: "" });
    };
    render() {
        return (
            <form
                className="form-floating mb-3 item-indecator d-flex"
                onSubmit={this.onSubmit}
            >
                <input
                    type="text"
                    className="form-control item-btn-add"
                    id="floatingInput"
                    placeholder="New To Do"
                    onChange={this.onLabelChange}
                    value={this.state.label}
                />
                <button
                    className="btn btn-primary"
                    type="submit"
                    value="Add Item"
                >
                    Add Item
                </button>
            </form>
        );
    }
}
