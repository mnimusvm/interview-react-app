import "./style.css";
import { ListItem } from "./ListItem/ListItem";

interface IListProps {
  items?: {
    id: number;
    name: string;
  }[];
  updateUser: (id: number, text: string) => void;
}

export const List = (props: IListProps) => {
  const { items, updateUser } = props;

  return (
    <>
      {items && items.length ? (
        <ul className="list">
          {items.map((item) => {
            const { id, name } = item;
            return (
              <ListItem id={id} text={name} key={id} updateUser={updateUser} />
            );
          })}
        </ul>
      ) : (
        <span>Здесь пусто</span>
      )}
    </>
  );
};
