import { withLabel } from "@src/shared/lib/hocs/withLabel/withLabel";
import UsersSelector from "./ui/UsersSelector";

const UsersSelectorWithLabel = withLabel(UsersSelector)

export {UsersSelector, UsersSelectorWithLabel}