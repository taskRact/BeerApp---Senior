import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { ReactNode } from 'react';

export interface ListWithIconProps {
  items: {
    icon: JSX.Element,
    title: string,
    children: ReactNode
  }[]
}

const ListWithIcon = ({ items }: ListWithIconProps) => (
  <div>
    {items.map(({ icon, title, children }) => (
      <Grid container key={title} marginBottom={1}>
        <Grid marginRight={2}>{icon}</Grid>
        <Grid xs={2}>{title}</Grid>
        <Grid>{children}</Grid>
      </Grid>
    ))}
  </div>
);

export default ListWithIcon;
