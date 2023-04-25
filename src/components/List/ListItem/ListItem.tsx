import { useState } from "react";

export const ListItem = (props: {
  id: number;
  text: string;
  updateUser: (id: number, text: string) => void;
}) => {
  const { id, text, updateUser } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(text);

  return (
    <>
      {isEditing ? (
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateUser(id, value);
              setIsEditing(false);
            }
          }}
        />
      ) : (
        <li
          onClick={() => {
            setIsEditing(true);
          }}
        >
          {text}
        </li>
      )}
    </>
  );
};
