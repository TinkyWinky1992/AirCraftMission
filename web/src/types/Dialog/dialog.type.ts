import { Dispatch, SetStateAction } from "react";

export type DialogState = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>;

}