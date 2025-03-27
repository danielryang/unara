import React, {useEffect, useRef, useState} from "react";
import APIService from "./APIService.js";

const Tasks = ({taskDisplay, tasks, setTasks}) => {
    const [editingTitle, setEditingTitle] = useState(false)
    const [newTitle, setNewTitle] = useState(taskDisplay.title)
    const [editingDescription, setEditingDescription] = useState(false)
    const [newDescription, setNewDescription] = useState(taskDisplay.description);

    const titleInputRef = useRef(null);
    const descriptionInputRef = useRef(null);

    useEffect(() => {
        setNewTitle(taskDisplay.title)
        setNewDescription(taskDisplay.description)
    }, [taskDisplay]);


    return (
        <div>
            <h1>Task Details:</h1>
            <div className={"flex justify-between w-full"}>
                <button className={""}
            onClick={() => {
                setEditingTitle(true)
                setTimeout(() => titleInputRef.current?.focus(), 0); // Focus input when clicking title
            }}> {editingTitle ? (<div className={"flex"}><p>Task Name: </p><input ref={titleInputRef} onKeyDown={(event) => {if(event.key === "Enter"){setEditingTitle(false); taskDisplay.title = newTitle; const updatedTasks = tasks.map(task =>
                    task.id === taskDisplay.id ? { ...task, title: newTitle } : task
                );
                    // Update the state with the new tasks array
                    setTasks(updatedTasks); APIService.editTask(taskDisplay.id, "title", newTitle)}}} value={newTitle} onChange={(event) => setNewTitle(event.target.value) } ></input></div>) : (<div>Task Name: {taskDisplay.title}</div>)}</button></div>

            <div className={"flex justify-between w-full"}>
                <button className={""}
                        onClick={() => {
                            setEditingDescription(true)
                            setTimeout(() => descriptionInputRef.current?.focus(), 0);
                        }}> {editingDescription ? (<div className={"flex"}><p>Task Description: </p><input ref={descriptionInputRef} onKeyDown={(event) => {if(event.key === "Enter"){setEditingDescription(false); taskDisplay.description = newDescription;
                            const updatedTasks = tasks.map(task =>
                            task.id === taskDisplay.id ? { ...task, description: newDescription } : task
                );
                    // Update the state with the new tasks array
                    setTasks(updatedTasks); APIService.editTask(taskDisplay.id, "description", newDescription)}}} value={newDescription} onChange={(event) => setNewDescription(event.target.value) } ></input></div>) : (<div>Task Description: {taskDisplay.description}</div>)}</button></div>
            {/*make sure that the task name is handled differently when the editing title is present*/}
        </div>
    )
}
export default Tasks