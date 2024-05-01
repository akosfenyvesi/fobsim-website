import { List, ListItem, ListItemText } from "@mui/material";

interface Props {
  listItems: string[];
}

function OrderedList({ listItems }: Props) {
  return (
    <List component="ol" sx={{ listStyle: "decimal", pl: 4 }}>
      {listItems.map((algorithm, index) => (
        <ListItem key={index} component="li" sx={{ display: "list-item" }}>
          <ListItemText primary={algorithm} />
        </ListItem>
      ))}
    </List>
  );
}

export default OrderedList;
