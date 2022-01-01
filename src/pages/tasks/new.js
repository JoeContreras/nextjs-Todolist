import React, { useEffect, useState } from "react";
import { Button, Form, Grid } from "semantic-ui-react";
import { useRouter } from "next/router";

const TaskFormPage = () => {
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState({});
  const { query, push } = useRouter();

  const validate = () => {
    const errors = {};
    if (!newTask.title) errors.title = "Title is required";
    if (!newTask.description) errors.description = "Description is required";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = validate();

    if (Object.keys(newErrors).length) return setErrors(newErrors);

    try {
      if (query.id) {
        await updateTask();
      } else {
        await createTask();
      }
      await push("/");
    } catch (e) {
      console.error(e);
    }
  };

  const createTask = async () => {
    try {
      await fetch("https://nextjs-todolist-five.vercel.app/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const updateTask = async () => {
    try {
      await fetch(
        `https://nextjs-todolist-five.vercel.app/api/tasks/${query.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        }
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (e) =>
    setNewTask({ ...newTask, [e.target.name]: e.target.value });

  const getTask = async () => {
    try {
      const result = await fetch(
        "https://nextjs-todolist-five.vercel.app/api/tasks/" + query.id
      );
      const data = await result.json();
      setNewTask({ title: data.title, description: data.description });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (query.id) {
      getTask();
    }
  }, []);

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="3"
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>{query.id ? "Edit Task" : "Create Task"}</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              label="Title"
              placeholder="Title"
              name="title"
              onChange={handleChange}
              value={newTask.title}
              error={
                errors.title
                  ? { content: errors.title, pointing: "below" }
                  : null
              }
            />
            <Form.TextArea
              label="Description"
              placeholder="Description"
              name="description"
              value={newTask.description}
              onChange={handleChange}
              error={
                errors.description
                  ? { content: errors.description, pointing: "below" }
                  : null
              }
            />
            <Button primary>{query.id ? "Edit" : "Save"}</Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default TaskFormPage;
