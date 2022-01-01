import React from "react";
import { Button, Card, Container, Grid } from "semantic-ui-react";
import { useRouter } from "next/router";

export default function HomePage({ tasks }) {
  const router = useRouter();
  if (tasks.length === 0) {
    return (
      <Grid
        centered
        verticalAlign="middle"
        columns="1"
        style={{ height: "80vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1>There are no tasks yet</h1>
            <img
              width="400px"
              src="https://i.pinimg.com/originals/48/fb/90/48fb90bcf2a1f779ee66deee8a12c898.png"
              alt="No tasks yet"
            />
            <div>
              <Button primary onClick={() => router.push("/tasks/new")}>
                Create a task
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return (
    <Container style={{ marginTop: "2rem" }}>
      <Card.Group itemsPerRow={4}>
        {tasks.map((task) => (
          <Card key={task._id}>
            <Card.Content>
              <Card.Header>{task.title}</Card.Header>
              <p>{task.description}</p>
            </Card.Content>
            <Card.Content extra>
              <Button primary onClick={() => router.push(`tasks/${task._id}`)}>
                View
              </Button>
              <Button
                secondary
                onClick={() => router.push(`tasks/${task._id}/edit`)}
              >
                Edit
              </Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/tasks");
  const tasks = await res.json();

  return {
    props: {
      tasks,
    },
  };
}
