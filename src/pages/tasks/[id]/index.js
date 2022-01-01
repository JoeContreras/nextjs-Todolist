import React, { useEffect, useState } from "react";
import Error from "next/error";
import { Button, Confirm, Grid } from "semantic-ui-react";
import { useRouter } from "next/router";

const TaskDetail = ({ task, error }) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { query, push } = useRouter();

  const deleteTask = async () => {
    const { id } = query;
    try {
      await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setConfirm(false);
      await deleteTask();
      await push("/");
    } catch (e) {
      console.error(e);
    }
  };

  if (error && error.statusCode)
    return <Error statusCode={error.statusCode} title={error.title} />;

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="1"
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          <div>
            <Button
              color="red"
              onClick={() => setConfirm(!confirm)}
              loading={isDeleting}
            >
              Delete Task
            </Button>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Confirm
        header="Please Confirm"
        content="Are you sure you want to delete this task?"
        open={confirm}
        onConfirm={handleDelete}
        onCancel={() => setConfirm(!confirm)}
      />
    </Grid>
  );
};

export default TaskDetail;

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`http://localhost:3000/api/tasks/${id}`);

  if (res.status === 200) {
    const task = await res.json();
    return {
      props: { task },
    };
  }
  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "Invalid Id",
      },
    },
  };
}
