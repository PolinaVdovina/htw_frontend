import { ConnectedComponent } from "react-redux";

export interface BodyElementCompProps {
    data: any,
    token?: any
}

export type BodyElementComp = ((props: BodyElementCompProps) => JSX.Element) | ConnectedComponent<any, any>

