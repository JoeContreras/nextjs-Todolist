import { Button, Container, Menu } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";

export const Navbar = () => {
  const router = useRouter();
  return (
    <Menu inverted attached>
      <Container>
        <Menu.Item>
          <Link href="/">
            <img src="/favicon.ico" alt="menu" />
          </Link>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Button
              size="mini"
              primary
              onClick={() => router.push("/tasks/new")}
            >
              New Task
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};
