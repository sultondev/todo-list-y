import React, { Component } from "react";
////components
import AppHeader from "../app-header/";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";

////styles
import "./app.css";
import "../styles/font-awesome/css/all.css";
import "../styles/bootstrap/bootstrap.css";

export default class App extends Component {
    maxId = 1;

    state = {
        todoData: [
            this.createTodoItem("Drink Coffee"),
            this.createTodoItem("Make Awesome App"),
            this.createTodoItem("Have a lunch"),
        ],
        term: "",
        filter: "active",
        // label: {
        //     value: '',
        //     updating: false
        // }
    };

    ////Delete list Item
    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idIndex = todoData.findIndex((el) => el.id === id);
            const newArray = [
                ...todoData.slice(0, idIndex),
                ...todoData.slice(idIndex + 1),
            ];
            this.maxId--;
            return {
                todoData: newArray,
            };
        });
    };
    //////Add list Item
    addItem = (text) => {
        const newItem = this.createTodoItem(text);

        this.setState(({ todoData }) => {
            const newArr = [...todoData, newItem];

            return {
                todoData: newArr,
            };
        });
    };
    ////Create Todo List Item
    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++,
        };
    }
    ////Change todoData datas
    toggleProperty(arr, id, propName) {
        const idIndex = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idIndex];
        const newItem = { ...oldItem, [propName]: !oldItem[propName] };

        return [...arr.slice(0, idIndex), newItem, ...arr.slice(idIndex + 1)];
    }
    ////Indecator of list Item Done
    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, "done"),
            };
        });
    };
    ////Indecator of list Item Important
    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, "important"),
            };
        });
    };
    ////SearchChanging
    onSearchChange = (term) => {
        this.setState({ term });
    };
    ////Searching
    onSearch(items, term) {
        if (term.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.label.toLowerCase().includes(term.toLowerCase());
        });
    }
    ////Submit Form
    onSubmit = (e) => {
        e.preventDefault();
    };
    ////Filter
    onFilter(items, filter) {
        switch (filter) {
            case "all":
                return items;
            case "active":
                return items.filter((item) => !item.done);
            case "done":
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }
    ////Filter Change
    onFilterChange = (filter) => {
        this.setState({ filter });
    };

    render() {
        const { todoData, term, filter } = this.state;
        const visibleItems = this.onFilter(
            this.onSearch(todoData, term),
            filter
        );
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;
        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <form className="top-panel d-flex" onSubmit={this.onSubmit}>
                    <SearchPanel onSearchChange={this.onSearchChange} />
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange={this.onFilterChange}
                    />
                </form>
                <TodoList
                    todos={visibleItems}
                    onDeletedItem={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <ItemAddForm onAddItem={this.addItem} />
            </div>
        );
    }
}
