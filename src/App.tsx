import { useState, useEffect } from "react";
import { List } from "./components/List/List";
import axios from "axios";

interface IUser {
  id: number;
  name: string;
}

function App() {
  const [items, setItems] = useState<IUser[]>();
  const [isPermitted, setIsPermitted] = useState(true);
  const [value, setValue] = useState("");

  const updateUser = (id: number, text: string) => {
    setItems((prevItems) => {
      return prevItems?.map((item) => {
        if (item.id === id) {
          return {
            id,
            name: text,
          };
        }
        return { ...item };
      });
    });
  };

  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setItems(res.data as IUser[]);
      } catch (e) {}
    };

    getTodos();
  }, []);

  useEffect(() => {
    const filterUser = async (filter: string) => {
      if (isPermitted) {
        setIsPermitted(false);
        setTimeout(() => {
          setIsPermitted(true);
        }, 500);
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/comments?email=${filter}`
        );
        setItems(res.data as IUser[]);
      }
    };

    filterUser(value);
  }, [value, isPermitted]);

  return (
    <div className="App">
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <List items={items} updateUser={updateUser} />
    </div>
  );
}

export default App;
