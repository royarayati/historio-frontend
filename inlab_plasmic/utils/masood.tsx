
import { ReactNode } from 'react';
import { CodeComponentMeta, DataProvider } from '@plasmicapp/react-web/lib/host';

interface PropsType {
    className?: string,
    children?: ReactNode,
    color: string,
}

const sample_data = 
{
    masood_data_one: "blue",
    masood_data_two: "green",
}

export function MasoodComponent(props: PropsType){
    return (
        <div className={props.className}>
            <h2>Hey! Today color is { props.color }</h2>
            <DataProvider name="masood_data" data={sample_data}>
                {props.children}
            </DataProvider>
        </div>
    )
}

export const MasoodMeta: CodeComponentMeta<PropsType> = {
  name: "Masood",
  props: {
    color: {
      type: 'choice',
      options: ['red', 'blue', 'green', 'yellow'],
      defaultValue: 'blue',
    },
    children: 'slot',
  },
  providesData: true,
  importPath: "../utils/masood",
}
